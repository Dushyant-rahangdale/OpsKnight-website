---
order: 2
title: Bitbucket
description: Receive Bitbucket Pipeline failure alerts in OpsKnight.
---

# Bitbucket Integration

Monitor Bitbucket Pipelines and receive alerts for build failures.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Bitbucket** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/bitbucket?integrationId=[ID]`

## Configuration in Bitbucket

1. Go to Repository **Settings -> Webhooks**.
2. Click **Add webhook**.
3. URL: Paste the OpsKnight Webhook URL.
4. Triggers: Select **Build status created** and **Build status updated**.
5. Save.
