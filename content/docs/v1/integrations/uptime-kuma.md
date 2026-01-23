---
order: 3
title: Uptime Kuma
description: Integrate self-hosted Uptime Kuma with OpsKnight.
---

# Uptime Kuma Integration

Receive alerts from Uptime Kuma.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Uptime Kuma** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/uptime-kuma?integrationId=[ID]`

## Configuration in Uptime Kuma

1. Go to **Settings -> Notifications**.
2. Click **Setup Notification**.
3. Notification Type: **Webhook**.
4. Friendly Name: OpsKnight.
5. Post URL: Paste the OpsKnight Webhook URL.
6. Content Type: `application/json`.
7. Test and Save.

## Status Logic

OpsKnight translates status codes:

| Status Code | Meaning | Action |
| ----------- | ------- | ------ |
| `1`         | UP      | Resolve |
| `0` (or others) | DOWN | Trigger (Critical) |

This supports both numeric status codes and string values like "Up" or "Resolved".
