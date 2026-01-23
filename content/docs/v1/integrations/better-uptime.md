---
order: 1
title: Better Uptime
description: Integrate Better Uptime with OpsKnight.
---

# Better Uptime Integration

Receive down alerts from Better Uptime.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Better Uptime** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/better-uptime?integrationId=[ID]`

## Configuration in Better Uptime

1. Go to **Integrations -> Webhooks**.
2. Click **Create Webhook**.
3. Paste the OpsKnight Webhook URL.
4. Select events:
   - `incident_started` (Triggers Incident)
   - `incident_resolved` (Resolves Incident)
   - `incident_acknowledged` (Acknowledges Incident)
5. Save.

## Status Mapping

OpsKnight automatically maps Better Uptime severity to OpsKnight urgency (Critical/Error/Warning).
