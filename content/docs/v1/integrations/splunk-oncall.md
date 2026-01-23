---
order: 11
title: Splunk On-Call (VictorOps)
description: Migrate alerts from Splunk On-Call to OpsKnight.
---

# Splunk On-Call Integration

Receive outgoing webhooks from Splunk On-Call.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Splunk On-Call** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/splunk-oncall?integrationId=[ID]`

## Configuration in Splunk On-Call

1. Go to **Integrations -> Outgoing Webhooks**.
2. Add the OpsKnight Webhook URL.
