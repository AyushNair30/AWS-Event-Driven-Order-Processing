import json
import uuid
import os
import boto3
from datetime import datetime, timezone


# Create an SQS client
sqs = boto3.client("sqs")

# Read the Queue URL from the environment variable
QUEUE_URL = os.environ["QUEUE_URL"]


def lambda_handler(event, context):

    # Extract order data
    if "body" in event:
        order = json.loads(event["body"])
    else:
        order = event

    # Validate required fields
    required_fields = [
        "customerId",
        "customerName",
        "customerEmail",
        "items",
        "shippingAddress",
        "paymentMethod"
    ]

    for field in required_fields:
        if field not in order:
            return {
                "statusCode": 400,
                "body": json.dumps({
                    "message": f"Missing required field: {field}"
                })
            }

    # Validate that items are provided
    if not isinstance(order["items"], list) or len(order["items"]) == 0:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "message": "Order must contain at least one item"
            })
        }

    # Calculate total order amount
    total_amount = 0

    for item in order["items"]:

        if "quantity" not in item or "price" not in item:
            return {
                "statusCode": 400,
                "body": json.dumps({
                    "message": "Each item must contain quantity and price"
                })
            }

        total_amount += item["quantity"] * item["price"]

    # Generate a unique order ID
    order_id = (
        "ORD-"
        + datetime.now(timezone.utc).strftime("%Y%m%d")
        + "-"
        + uuid.uuid4().hex[:6].upper()
    )

    # Add backend-generated metadata
    order["orderId"] = order_id
    order["totalAmount"] = total_amount
    order["currency"] = "INR"
    order["orderStatus"] = "QUEUED"
    order["createdAt"] = datetime.now(timezone.utc).isoformat()
    order["processedAt"] = None

    # Send the order to Amazon SQS
    response = sqs.send_message(
        QueueUrl=QUEUE_URL,
        MessageBody=json.dumps(order)
    )

    print(f"Order {order_id} sent to SQS successfully")
    print(f"Message ID: {response['MessageId']}")

    # Return a response
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Order created and queued successfully",
            "orderId": order_id,
            "status": "QUEUED"
        })
    }