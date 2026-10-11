# CloudCart — Event-Driven E-Commerce Order Processing System

CloudCart is a serverless, event-driven e-commerce application built using React, TypeScript, and AWS. It combines a responsive shopping interface with an asynchronous order-processing backend using AWS Lambda, Amazon API Gateway, Amazon SQS, and Amazon DynamoDB.

The project demonstrates how cloud-native applications can accept customer orders, process them asynchronously, and persist order information without requiring a continuously running application server.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Order Processing Workflow](#order-processing-workflow)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [API Reference](#api-reference)
- [Data Model](#data-model)
- [Security and Permissions](#security-and-permissions)
- [Testing and Verification](#testing-and-verification)
- [Screenshots](#screenshots)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)
- [Key Cloud Computing Concepts](#key-cloud-computing-concepts)
- [Author](#author)

## Overview

Traditional applications often process customer requests and database operations in a tightly coupled workflow. If a downstream operation is slow or temporarily unavailable, it can affect the customer-facing request.

CloudCart addresses this architectural challenge by introducing a message queue between order creation and order processing.

When a customer places an order, the API validates the request and sends the order to Amazon SQS. A separate AWS Lambda function consumes the message, updates the order status, and stores the order in DynamoDB.

This design separates order acceptance from order processing and demonstrates asynchronous communication in a serverless architecture.

## Features

### E-commerce frontend

- Responsive shopping interface.
- Product catalogue with product details.
- Product search, category filtering, and sorting.
- Shopping cart with quantity management.
- Cart persistence using browser local storage.
- Checkout form with customer and shipping information.
- Multiple demo payment-method options: UPI, card, and cash on delivery.
- Order confirmation displaying the generated order ID and initial status.

### AWS backend

- HTTP API endpoint for order submission.
- Lambda-based request validation and order creation.
- Automatic order ID generation.
- Server-side calculation of order totals from submitted item quantities and prices.
- Asynchronous order processing through Amazon SQS.
- Separate Lambda consumer for processing queued orders.
- Persistent order storage in Amazon DynamoDB.
- IAM permissions for service-to-service access.
- CloudWatch logging for troubleshooting and execution monitoring.

## Architecture

```text
┌──────────────────────────────┐
│       CloudCart Frontend     │
│     React + TypeScript       │
└──────────────┬───────────────┘
               │
               │ HTTP POST /orders
               ▼
┌──────────────────────────────┐
│     Amazon API Gateway       │
│           HTTP API           │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│   CloudCartCreateOrder       │
│        AWS Lambda            │
│                              │
│ Validate request             │
│ Calculate order total        │
│ Generate order ID            │
└──────────────┬───────────────┘
               │
               │ SendMessage
               ▼
┌──────────────────────────────┐
│     Amazon SQS Queue         │
│     CloudCartOrderQueue      │
└──────────────┬───────────────┘
               │
               │ Event source mapping
               ▼
┌──────────────────────────────┐
│   CloudCartProcessOrder      │
│        AWS Lambda            │
│                              │
│ Process queued message       │
│ Update order status          │
└──────────────┬───────────────┘
               │
               │ PutItem
               ▼
┌──────────────────────────────┐
│       Amazon DynamoDB        │
│         Orders Table         │
└──────────────────────────────┘
```

**AWS deployment region:** Asia Pacific (Mumbai), `ap-south-1`.

## Order Processing Workflow

1. A customer browses the product catalogue and proceeds to checkout.
2. The frontend submits customer details, items, shipping information, and payment method to `POST /orders`.
3. API Gateway forwards the request to `CloudCartCreateOrder`.
4. The Lambda function validates required fields, calculates the order total, generates an order ID, and adds timestamps and status metadata.
5. The order is serialized as JSON and sent to `CloudCartOrderQueue`.
6. The API returns a successful response with the order ID and `QUEUED` status.
7. Amazon SQS invokes `CloudCartProcessOrder` through its Lambda event source mapping.
8. The processing function changes the order status to `PROCESSED`, sets `processedAt`, and writes the complete order to DynamoDB.
9. The stored record can be inspected in the `Orders` table.

The order is processed asynchronously: successful order acceptance does not mean the database write has already completed.

## Technology Stack

| Category | Technology |
|---|---|
| Frontend | React, TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Frontend state | React Context and browser local storage |
| API | Amazon API Gateway HTTP API |
| Compute | AWS Lambda, Python 3.12 |
| Messaging | Amazon SQS Standard Queue |
| Database | Amazon DynamoDB |
| Access control | AWS IAM |
| Logs | Amazon CloudWatch |
| Development tools | VS Code, Node.js, npm, Git |
| Repository | GitHub |

## Project Structure

```text
AWS-Event-Driven-Order-Processing/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── types.ts
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
├── src/
│   ├── create_order/
│   │   └── lambda_function.py
│   └── process_order/
│       └── lambda_function.py
│
├── docs/
│   ├── milestone_1.md
│   ├── milestone_2.md
│   └── milestone_3.md
│
├── screenshots/
│   ├── milestone_1/
│   ├── milestone_2/
│   ├── milestone_3/
│   └── final/
│
├── .gitignore
├── LICENSE
└── README.md
```

*Note: `.env.example` is a template containing placeholder configuration. The actual `.env` file and installed dependencies should remain local and must not be committed.*

## Getting Started

### Prerequisites

Install the following tools:

- Node.js LTS and npm.
- Git.
- A web browser.
- An AWS account if you want to deploy or reproduce the backend.

The AWS backend must be deployed and configured separately. The frontend does not create AWS resources automatically.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/aws-event-driven-order-processing.git
cd aws-event-driven-order-processing
```

Replace `YOUR_GITHUB_USERNAME` with the GitHub account that owns the repository.

### 2. Configure the frontend

```bash
cd frontend
```

Create a `.env` file in the `frontend/` directory using the template described below.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

Keep the terminal running while using the application.

## Environment Configuration

Create `frontend/.env`:

```env
VITE_API_URL=https://YOUR_API_ID.execute-api.ap-south-1.amazonaws.com
```

Replace the placeholder with your own API Gateway base URL.

For this project, the currently configured base URL is:

```text
https://p5w7o3sjub.execute-api.ap-south-1.amazonaws.com
```

The frontend appends `/orders` to this base URL. Do not add `/orders` to `VITE_API_URL`.

A corresponding `frontend/.env.example` should contain the placeholder URL rather than a real environment-specific value.

**Important:** Vite exposes variables prefixed with `VITE_` to frontend browser code. These variables must never contain AWS access keys, secret keys, database credentials, or other private secrets.

Add `.env` to `.gitignore` and do not commit it.

## API Reference

### Create an order

**Endpoint**

```http
POST /orders
Content-Type: application/json
```

**Example request**

```json
{
  "customerId": "CUST-10452",
  "customerName": "Rahul Sharma",
  "customerEmail": "rahul.sharma@example.com",
  "items": [
    {
      "productId": "PROD-1001",
      "productName": "Wireless Mouse",
      "quantity": 2,
      "price": 799
    },
    {
      "productId": "PROD-2034",
      "productName": "Mechanical Keyboard",
      "quantity": 1,
      "price": 2499
    }
  ],
  "shippingAddress": {
    "city": "Chennai",
    "state": "Tamil Nadu",
    "country": "India",
    "postalCode": "600045"
  },
  "paymentMethod": "UPI"
}
```

**Example successful response**

```json
{
  "message": "Order created and queued successfully",
  "orderId": "ORD-20261011-4019B7",
  "status": "QUEUED"
}
```

The order ID above is an illustrative example of the response format.

The API returns an HTTP success status when the order has been accepted and queued. The consumer processes it asynchronously afterward.

## Data Model

The DynamoDB table is named `Orders`.

| Attribute | Description |
|---|---|
| `orderId` | Partition key; generated order identifier |
| `customerId` | Customer identifier |
| `customerName` | Customer name |
| `customerEmail` | Customer email address |
| `items` | List of ordered products, quantities, and prices |
| `totalAmount` | Calculated order total |
| `currency` | Currency code, currently INR |
| `shippingAddress` | Shipping address object |
| `paymentMethod` | Selected demo payment method |
| `orderStatus` | Order processing status |
| `createdAt` | Order creation timestamp |
| `processedAt` | Timestamp set during processing |

DynamoDB is schemaless beyond the configured key structure. The application writes the order attributes as a DynamoDB item.

The current application uses `QUEUED` for the initial API response and `PROCESSED` after the consumer successfully writes the record.

## Security and Permissions

The project uses IAM roles and policies to grant AWS services the permissions they need.

- The order-creation Lambda has permission to send messages to the configured SQS queue.
- The processing Lambda has permission to receive and delete queue messages, read queue attributes, and write items to the `Orders` table.
- API Gateway has permission to invoke the order-creation Lambda.
- The frontend communicates with the API through HTTPS.
- CORS should allow only the required frontend origins and HTTP methods.
- AWS credentials are not stored in frontend code.

The current implementation is a learning project. Production use would require stronger validation, authentication, monitoring, and additional safeguards.

## Testing and Verification

The following checks have been completed:

- [x] Frontend runs locally.
- [x] Product browsing, search, and filtering work.
- [x] Cart and checkout flows work.
- [x] Frontend submits an order through API Gateway.
- [x] API returns an order ID and `QUEUED` status.
- [x] The SQS-based processing workflow executes.
- [x] The order is persisted in DynamoDB with `PROCESSED` status.

For additional testing, submit invalid payloads and verify validation behavior. Check CloudWatch logs when diagnosing API or Lambda errors.

## Screenshots

Project screenshots are stored in the `screenshots/` directory.

- `milestone_1/` — DynamoDB, SQS, order-creation Lambda, and initial configuration.
- `milestone_2/` — SQS trigger, processing Lambda, IAM permissions, and database persistence.
- `milestone_3/` — API Gateway route and successful API response.
- `final/` — End-to-end verification of an order placed through the frontend and processed in DynamoDB.

Add screenshots of the final frontend and processed order when available.

## Limitations

- The product catalogue is currently static and defined in the frontend.
- The demo payment methods do not process actual payments.
- Customer authentication and account management are not implemented.
- The frontend does not currently retrieve live order status from a backend status endpoint.
- The processing Lambda writes the order as `PROCESSED`; this does not represent shipment or delivery.
- The current design does not implement a dead-letter queue, comprehensive idempotency, or production-grade retry handling.
- The API and AWS resources must be configured and deployed separately.

## Future Improvements

- Deploy the frontend to a public hosting platform such as Vercel.
- Add a backend endpoint to retrieve order status.
- Introduce Amazon Cognito for customer authentication.
- Store product information in DynamoDB.
- Add a dead-letter queue and improve failure handling.
- Implement idempotency to prevent duplicate order writes.
- Add CloudWatch dashboards and alarms.
- Introduce infrastructure as code using AWS SAM, AWS CDK, or Terraform.
- Add automated frontend and backend tests.
- Integrate a payment provider in a secure, production-ready implementation.

## Key Cloud Computing Concepts

This project demonstrates:

- **Serverless computing:** AWS Lambda executes code without managing application servers.
- **API-driven architecture:** API Gateway exposes an HTTP endpoint to the frontend.
- **Event-driven architecture:** SQS messages trigger downstream order processing.
- **Loose coupling:** Order submission and order processing are separated by a queue.
- **Asynchronous processing:** The customer-facing request can finish before database processing completes.
- **NoSQL persistence:** DynamoDB stores order records using a partition key.
- **Least-privilege access:** IAM policies grant specific actions on required resources.
- **Observability:** CloudWatch logs help diagnose execution and integration issues.
- **Scalability:** Managed serverless components can scale according to workload and configured limits.

## Author

**Ayush Nair**

GitHub: [AyushNair30](https://github.com/AyushNair30)

---

*CloudCart is an educational project developed to explore e-commerce workflows, serverless AWS services, and event-driven system design. It is not a production-ready payment or commerce platform.*
