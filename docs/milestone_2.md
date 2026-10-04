# Milestone 2 – SQS Consumer and DynamoDB Processing

## Objective

Implement the consumer side of the CloudCart event-driven architecture.

The goal is to automatically receive orders from Amazon SQS, process them using a second Lambda function, update their status, and persist them in DynamoDB.

---

## Architecture

```text
CloudCartOrderQueue
        |
        | SQS Event Trigger
        v
CloudCartProcessOrder Lambda
        |
        | PutItem
        v
Orders DynamoDB Table