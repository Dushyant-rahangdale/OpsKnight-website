---
order: 4
title: Dynatrace
description: Integrate Dynatrace problems with OpsKnight.
---

# Dynatrace Integration

Receive problem notifications from Dynatrace.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Dynatrace** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/dynatrace?integrationId=[ID]`

## Configuration in Dynatrace

1. Go to **Settings -> Integration -> Problem Notifications**.
2. Select **Custom Integration**.
3. Name: OpsKnight.
4. Webhook URL: Paste the OpsKnight Webhook URL.
5. Save and Test.
