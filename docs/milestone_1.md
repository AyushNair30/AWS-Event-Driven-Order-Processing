# Milestone 1 – Order Creation and SQS Integration

## Objective

Implement the producer side of the CloudCart event-driven order processing system.

The goal of this milestone is to receive an e-commerce order, validate it, generate order metadata, and asynchronously send the order to an Amazon SQS queue.

## Architecture

Client/Test Event
        ↓
CloudCartCreateOrder Lambda
        ↓
Amazon SQS
        ↓
CloudCartOrderQueue

## AWS Services Used

- AWS Lambda
- Amazon SQS
- AWS IAM
- Amazon CloudWatch Logs

## CloudCartCreateOrder Lambda

The Lambda function is responsible for:

1. Receiving an order.
2. Validating required fields.
3. Validating that at least one item exists.
4. Calculating the total order amount.
5. Generating a unique order ID.
6. Adding order metadata.
7. Sending the order to Amazon SQS.

## Order Processing

The Lambda calculates the order total using:

totalAmount = Σ(quantity × price)

For example:

2 × ₹799 = ₹1598
1 × ₹2499 = ₹2499

Total = ₹4097

## Why SQS?

Amazon SQS decouples order creation from order processing.

Instead of the order creation Lambda directly processing and storing the order, it places the order into a queue.

This provides:

- Loose coupling
- Asynchronous processing
- Better scalability
- Fault isolation
- Buffering during traffic spikes

## IAM

The Lambda execution role follows the Principle of Least Privilege.

The function has permission to:

- Write logs to CloudWatch
- Send messages to the CloudCartOrderQueue SQS queue

It does not receive unnecessary permissions.

## Environment Variables

The SQS Queue URL is stored in the Lambda environment variable:

QUEUE_URL

This keeps configuration separate from application code.

## Testing

A valid order successfully:

1. Passed validation.
2. Received a generated order ID.
3. Had its total calculated.
4. Was sent to SQS.

An invalid order correctly returned HTTP status code 400 when a required field was missing.

## Current Status

Milestone 1 completed.

Producer side of the CloudCart event-driven architecture is working successfully.