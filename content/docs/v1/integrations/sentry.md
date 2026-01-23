---
order: 9
title: Sentry
description: Integrate Sentry issue alerts with OpsKnight.
---

# Sentry Integration

Receive error issue alerts from Sentry.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Sentry** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/sentry?integrationId=[ID]`

> [!WARNING]
> **Strict Security Enforcement**: If you generate a Signing Secret in OpsKnight, you **MUST** configure the same secret in Sentry. OpsKnight will reject any requests without a valid signature if a secret exists.

## Configuration in Sentry

1. Go to **Settings -> Integrations**.
2. Search for **Webhooks**.
3. Add a new Webhook or Configure existing.
4. Callback URL: Paste the OpsKnight Webhook URL.
5. Go to **Alerts** and create a rule to send notifications to this Webhook.

## Supported Formats
- **Issues**: Standard Sentry issue alerts (Created/Resolved/Ignored).
- **Events**: Legacy single-event webhooks.

## Status Mapping

| Sentry Action | OpsKnight Event |
| ------------- | --------------- |
| `created`     | Trigger (New Incident) |
| `resolved`    | Resolve Incident |
| `ignored`     | Acknowledge Incident |

**Severity**: `fatal` maps to **Critical**, `error` maps to **Error**.
