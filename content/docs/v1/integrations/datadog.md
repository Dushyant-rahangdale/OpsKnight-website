---
order: 1
---

# Datadog Integration

Send Datadog alerts to OpsKnight.

## Setup

### Step 1: Create Integration in OpsKnight

1. Go to your Service
2. Click **Integrations → Add Integration**
3. Copy the **Routing Key**

### Step 2: Configure Datadog Webhook

1. In Datadog, go to **Integrations → Webhooks**
2. Click **+ New Webhook**
3. Configure:

| Field   | Value |
| ------- | --------------------------------- |
| Name    | OpsKnight |
| URL     | `https://your-ops.com/api/integrations/datadog?integrationId=YOUR_INTEGRATION_ID` |
| Payload | Use the default Datadog payload (JSON) |

OpsKnight automatically parses the standard Datadog webhook format. No custom payload template is required.

### Step 3: Add to Monitor

1. Open your Datadog Monitor
2. In **Notify your team**, add: `@webhook-OpsKnight`
3. Save

## Event Mapping

| Datadog     | OpsKnight |
| ----------- | ----------- |
| `Triggered` | `trigger`   |
| `Recovered` | `resolve`   |
| P1-P2       | `critical`  |
| P3          | `warning`   |
| P4-P5       | `info`      |

## Testing

1. Trigger a test alert in Datadog
2. Verify incident appears in OpsKnight
3. Recover the alert
4. Verify incident resolves

## Troubleshooting

### Alerts not appearing

- Verify webhook URL is correct
- Check routing key is valid
- Review Datadog webhook logs
