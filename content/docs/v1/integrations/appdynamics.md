---
order: 3
title: AppDynamics
description: Integrate AppDynamics with OpsKnight.
---

# AppDynamics Integration

Receive health rule violations from AppDynamics.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **AppDynamics** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/appdynamics?integrationId=[ID]`

## Configuration in AppDynamics

1. Go to **Alert & Respond -> HTTP Request Templates**.
2. Create a new Template named "OpsKnight".
3. Request URL: Paste the OpsKnight Webhook URL.
4. Method: `POST`.
5. Payload MIME Type: `application/json`.
6. Add this template to your **policies**.

## Event Logic

- **Summary**: Derived from `summary`, `eventMessage`, or `eventType`.
- **Urgency**: Maps `severity` or `eventSeverity` to OpsKnight urgency (automatically normalized).
- **Deduplication**: Uses `incidentId` or `eventId` to group updates.
