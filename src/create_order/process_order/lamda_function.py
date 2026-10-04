import json
import boto3
from datetime import datetime, timezone


# Create a DynamoDB resource
dynamodb = boto3.resource("dynamodb")

# Access the Orders table
table = dynamodb.Table("Orders")


def lambda_handler(event, context):

    print("Received SQS event:")
    print(json.dumps(event))

    # Process each SQS message
    for record in event["Records"]:

        # Extract the order from the SQS message
        order = json.loads(record["body"])

        print(f"Processing order: {order['orderId']}")

        # Update order status
        order["orderStatus"] = "PROCESSED"

        # Add processing timestamp
        order["processedAt"] = datetime.now(timezone.utc).isoformat()

        # Store order in DynamoDB
        table.put_item(Item=order)

        print(f"Order {order['orderId']} stored successfully")

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Order processed successfully"
        })
    }