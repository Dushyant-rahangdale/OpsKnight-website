---
order: 1
title: AWS CloudWatch
description: Integrate AWS CloudWatch with OpsKnight to receive alarms.
---

# AWS CloudWatch Integration

Receive alarms from AWS CloudWatch in OpsKnight via SNS.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **AWS CloudWatch** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/cloudwatch?integrationId=[ID]`

## Configuration in AWS

1. Create an **SNS Topic**.
2. Create a **Subscription**:
   - Protocol: HTTPS
   - Endpoint: Paste the OpsKnight Webhook URL.
3. Confirm the subscription:
   - CloudWatch sends a subscription confirmation message.
   - OpsKnight **DOES NOT** auto-confirm blindly for security.
   - **Action Required**: Check your OpsKnight audit logs or the endpoint logs to find the `SubscribeURL`, then visit it once to confirm. (Or manual confirmation in AWS console if visible).
4. Configure your CloudWatch Alarms to send notifications to this SNS Topic.

## Alarm Logic

OpsKnight maps CloudWatch states to urgencies:

| CloudWatch State | Alarm Description Contains | OpsKnight Urgency |
| ---------------- | -------------------------- | ----------------- |
| `ALARM`          | "CRITICAL", "HIGH"         | `critical`        |
| `ALARM`          | "WARNING", "ERROR"         | `error`           |
| `ALARM`          | (Default)                  | `critical`        |
| `OK`             | (Any)                      | **Resolves Incident** |

The integration automatically deduplicates based on `Region` + `AlarmName`.
