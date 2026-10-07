# CloudCart – Event-Driven Order Processing System

CloudCart is a serverless, event-driven e-commerce order processing system built using AWS.

The project demonstrates how an e-commerce application can accept customer orders through an HTTP API, process them asynchronously using Amazon SQS, and persist the final order information in Amazon DynamoDB.

---

## Architecture

```text
                         Client
                           │
                           │ POST /orders
                           ▼
                  ┌──────────────────┐
                  │  Amazon API      │
                  │    Gateway       │
                  │    HTTP API      │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ CloudCartCreate  │
                  │     Order        │
                  │     Lambda       │
                  └────────┬─────────┘
                           │
                           │ SendMessage
                           ▼
                  ┌──────────────────┐
                  │      Amazon      │
                  │       SQS        │
                  │ CloudCartOrder   │
                  │      Queue       │
                  └────────┬─────────┘
                           │
                           │ Event Trigger
                           ▼
                  ┌──────────────────┐
                  │ CloudCartProcess │
                  │     Order        │
                  │     Lambda       │
                  └────────┬─────────┘
                           │
                           │ PutItem
                           ▼
                  ┌──────────────────┐
                  │    Amazon        │
                  │    DynamoDB      │
                  │      Orders      │
                  └──────────────────┘