---
order: 1
title: GitHub
description: Receive GitHub Actions failure alerts in OpsKnight.
---

# GitHub Integration

Monitor GitHub Actions workflows and receive alerts for failures.

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **GitHub** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/github?integrationId=[ID]`
4. (Optional) Copy the **Signing Secret** if you wish to enforce security.

> [!WARNING]
> **Strict Security Enforcement**: If you generate a Signing Secret in OpsKnight, you **MUST** configure the same secret in the GitHub webhook settings. OpsKnight will reject any requests without a valid signature if a secret exists.

## Configuration in GitHub

1. Go to your Repository **Settings -> Webhooks**.
2. Click **Add webhook**.
3. Payload URL: Paste the OpsKnight Webhook URL.
4. Content type: `application/json`.
5. Select **Let me select individual events**:
   - **Workflow runs** (Triggered when workflows fail)
   - **Check runs** (Triggered when checks fail)
   - **Deployments** (Triggered when deployments fail)
6. Click **Add webhook**.

## Supported Events

OpsKnight analyzes the payload to determine severity:

- **Workflow Run Failure**: Creates a **Critical** incident.
- **Check Run Failure**: Creates a **Critical** incident.
- **Deployment Failure**: Creates a **Critical** incident.
- **Pending/In-Progress**: Handled as **Acknowledgement** (prevents alert spam).

## Logic
The integration ignores "pending" or "in_progress" states by default but acknowledges existing incidents if a retry starts. It only triggers an incident on:
- `conclusion: failure`
- `conclusion: timed_out`
- `conclusion: cancelled`
