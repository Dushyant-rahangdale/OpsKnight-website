---
order: 4
title: UptimeRobot
description: Integrate UptimeRobot alerts with OpsKnight.
---

# UptimeRobot Integration

Receive monitor alerts from UptimeRobot.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **UptimeRobot** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/uptimerobot?integrationId=[ID]`

## Configuration in UptimeRobot

1. Go to **My Settings -> Alert Contacts**.
2. Add **Web-Hook**.
3. Friendly Name: OpsKnight.
4. URL: Paste the OpsKnight Webhook URL.
5. Enable it for your monitors.

## Monitor Status Logic

OpsKnight translates UptimeRobot alert types:

| Alert Type | Meaning | OpsKnight Action |
| ---------- | ------- | ---------------- |
| `1`        | Down    | Trigger (Critical)|
| `2`        | Up      | Resolve          |

The integration automatically uses the `monitorID` for deduplication, ensuring that a single flapping monitor updates the same incident rather than creating duplicates.
