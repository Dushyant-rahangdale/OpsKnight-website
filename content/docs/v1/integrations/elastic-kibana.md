---
order: 5
title: Elastic / Kibana
description: Integrate Elastic Watcher alerts with OpsKnight.
---

# Elastic / Kibana Integration

Receive alerts from Elasticsearch Watcher or Kibana Alerts.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Elastic** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/elastic?integrationId=[ID]`

## Configuration in Kibana

1. Create a **Connector**.
2. Select **Webhook**.
3. Name: OpsKnight.
4. Method: `POST`.
5. URL: Paste the OpsKnight Webhook URL.
6. Use this connector in your Rules/Actions.

## Alert Field Mapping

OpsKnight extracts fields in this priority order:

1. **Summary**: `rule.name` > `alert.reason` > `message`
2. **Urgency**: `alert.severity` (maps to Warning/Error/Critical)
3. **Status**: `alert.status` or `event.action` (maps to Trigger/Resolve)

Tip: Ensure your Connector payload maps these standard Elastic fields.
