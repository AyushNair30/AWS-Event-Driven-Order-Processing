# Milestone 3 – API Gateway Integration

## Objective

Expose the CloudCart order creation system through a public HTTP API using Amazon API Gateway.

This milestone connects the external client to the existing event-driven backend:

Client → API Gateway → Lambda → SQS → Lambda → DynamoDB

---

## Architecture

```text
Client
   │
   │ HTTP POST /orders
   ▼
Amazon API Gateway
   │
   ▼
CloudCartCreateOrder Lambda
   │
   │ SendMessage
   ▼
Amazon SQS
CloudCartOrderQueue
   │
   │ Event Trigger
   ▼
CloudCartProcessOrder Lambda
   │
   │ PutItem
   ▼
Amazon DynamoDB
Orders