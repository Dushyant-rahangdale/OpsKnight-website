---
order: 5
---

# Data Retention

Manage data storage and automatic cleanup policies.

## Overview

Retention policies help:

- Reduce storage costs
- Improve query performance
- Meet compliance requirements

## Configure Retention

1. Go to **Settings → System → Data Retention**
2. Set retention periods
3. Save changes

## Retention Settings

| Setting | Applies To | Default |
| ------- | ---------- | ------- |
| **Incident History** | Resolved incidents and postmortems | 2 years (730 days) |
| **Alert Logs** | Raw alerts from integrations | 1 year (365 days) |
| **System Logs** | Audit trails (`audit_logs`) and debug events | 90 days |
| **Metric Rollups** | Aggregated performance data (hourly/daily) | 1 year (365 days) |
| **High-Precision Metrics** | Raw, real-time metric data points | 90 days |

## How Cleanup Works

The cleanup job runs automatically (via internal system cron) during off-peak hours. It permanently deletes data older than the configured retention period.

## Manual Cleanup

You can trigger a manual cleanup job (or a dry run) via the Admin UI settings.

> **Note**: If the automated cleanup job fails to run for any reason (e.g., system downtime during scheduled hours), you can use this option in **Settings → System → Data Retention** to manually enforce retention policies immediately.

### Via API

To trigger cleanup programmatically:

```bash
# Force Cleanup (POST request, requires Admin session cookie or API Key if implemented)
# Currently, this is primarily an internal Admin UI action.
POST /api/settings/retention
Content-Type: application/json

{ "dryRun": false }
```

Before data is deleted, export if needed:

1. Go to **Analytics**
2. Filter by date range
3. Click **Export**
4. Download CSV/JSON

## Compliance Notes

- Audit logs have extended retention.
- Export data before deletion if required for audits.
- Use a longer retention policy for regulated workloads.

## Best Practices

- Set retention based on regulatory needs.
- Review retention quarterly.
- Export critical datasets before expiry.
- Monitor storage growth.
