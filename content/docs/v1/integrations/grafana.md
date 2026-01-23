---
order: 6
title: Grafana
description: Integrate Grafana alerts with OpsKnight.
---

# Grafana Integration

Receive alerts from Grafana (Legacy or Unified Alerting).

## Setup

1. In OpsKnight, go to **Service -> Integrations**.
2. Add a **Grafana** integration.
3. Copy the **Webhook URL**:
   `https://[YOUR_DOMAIN]/api/integrations/grafana?integrationId=[ID]`

> [!WARNING]
> **Strict Security Enforcement**: If you generate a Signing Secret in OpsKnight, you **MUST** configure the same secret in Grafana (if supported) or your sending source. OpsKnight will reject any requests without a valid signature if a secret exists.

## Configuration in Grafana

1. Go to **Alerting -> Contact points**.
2. Click **New contact point**.
3. Name: OpsKnight.
4. Integration: **Webhook**.
5. Url: Paste the OpsKnight Webhook URL.
6. Save and Test.

## Alerting Logic

OpsKnight supports both **Grafana 8+ Unified Alerting** and **Legacy/Prometheus** payloads.

| Grafana State | OpsKnight Action | Urgency |
| ------------- | ---------------- | ------- |
| `alerting`    | Trigger          | `critical` |
| `no_data`     | Trigger          | `warning`  |
| `ok`          | Resolve          | -       |
| `pending`     | Ignored          | -       |

Deduplication uses the `ruleId` (Unified) or `alertname` label (Prometheus).
