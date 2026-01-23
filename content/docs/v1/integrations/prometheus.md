---
order: 2
---

# Prometheus/Alertmanager Integration

Send Prometheus alerts to OpsKnight via Alertmanager.

## Setup

### Step 1: Create Integration in OpsKnight

1. Go to your Service
2. Click **Integrations → Add Integration**
3. Copy the **Routing Key**

### Step 2: Configure Alertmanager

Add OpsKnight as a receiver in `alertmanager.yml` using your Integration ID:

```yaml
receivers:
  - name: 'opsknight'
    webhook_configs:
      - url: 'https://your-ops.com/api/integrations/prometheus?integrationId=YOUR_INTEGRATION_ID'
        send_resolved: true

route:
  receiver: 'opsknight'
  routes:
    - match:
        severity: critical
      receiver: 'opsknight'
```

OpsKnight automatically parses the standard Prometheus Alertmanager JSON payload. No custom templates are required.

## Severity Mapping

| Prometheus Label | OpsKnight |
| ---------------- | ----------- |
| `critical`       | `critical`  |
| `warning`        | `warning`   |
| `info`           | `info`      |

## Testing

1. Trigger a test alert:
   ```bash
   # Manually fire an alert
   curl -X POST http://alertmanager:9093/api/v1/alerts \
     -d '[{"labels":{"alertname":"TestAlert","severity":"warning"}}]'
   ```
2. Verify incident in OpsKnight
3. Resolve the alert
4. Verify incident resolves

## Troubleshooting

### Alerts not appearing

- Check Alertmanager logs
- Verify webhook URL is accessible
- Test with curl directly
