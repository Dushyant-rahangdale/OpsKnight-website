---
order: 7
title: Honeycomb
description: Integrate Honeycomb triggers with OpsKnight.
---

# Honeycomb Integration

Receive trigger notifications from Honeycomb.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Honeycomb** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/honeycomb?integrationId=[ID]`

## Configuration in Honeycomb

1. Go to **Team Settings -> Integrations -> Webhooks**.
2. Add a new Webhook.
3. Name: OpsKnight.
4. URL: Paste the OpsKnight Webhook URL.
5. Add this webhook as a recipient to your Triggers.

## Trigger Logic

OpsKnight maps Honeycomb triggers to incidents.

- **Summary**: Derived from `alert_name` or `trigger_reason`.
- **Urgency**: Maps `alert_severity` if present, defaults to `warning`.
- **Details**: Includes the `result_url` link back to your Honeycomb query.
