---
order: 8
title: New Relic
description: Integrate New Relic alerts with OpsKnight.
---

# New Relic Integration

Receive incident notifications from New Relic.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **New Relic** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/newrelic?integrationId=[ID]`

## Configuration in New Relic

1. Go to **Alerts & AI -> Destinations**.
2. Select **Webhook**.
3. Name: OpsKnight.
4. Endpoint Url: Paste the OpsKnight Webhook URL.
5. Use this destination in your Workflows.

## Supported Formats

OpsKnight automatically detects and handles:
- **New Relic Incidents** (Workflows)
- **Legacy Alerts**
- **APM Alerts**

## Severity Mapping

| New Relic Severity | OpsKnight Urgency |
| ------------------ | ----------------- |
| `critical`         | `critical`        |
| `warning`          | `warning`         |
| `info`             | `info`            |

Status `closed` or `resolved` in New Relic will automatically **resolve** the OpsKnight incident.
