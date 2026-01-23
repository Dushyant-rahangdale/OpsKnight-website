---
order: 2
title: Azure Monitor
description: Integrate Azure Monitor with OpsKnight to receive alerts.
---

# Azure Monitor Integration

Receive alerts from Azure Monitor in OpsKnight.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Azure Monitor** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/azure?integrationId=[ID]`

## Configuration in Azure

1. Go to **Monitor -> Alerts -> Action Groups**.
2. Create or Edit an Action Group.
3. Add a **Webhook** action.
4. Paste the OpsKnight Webhook URL.
5. Enable the Common Alert Schema if available (optional, OpsKnight handles both).

## Alert Logic

OpsKnight maps Azure Severity to Urgency:

| Azure Severity | OpsKnight Urgency |
| -------------- | ----------------- |
| Sev0 / Critical| `critical`        |
| Sev1 / Error   | `error`           |
| Sev2 / Warning | `warning`         |
| Other          | `warning`         |

**State Handling**:
- Monitor Condition `Fired` / `Activated` -> **Trigger Incident**
- Monitor Condition `Resolved` -> **Resolve Incident**
