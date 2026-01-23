---
order: 1
title: Events API
description: Trigger, acknowledge, and resolve incidents programmatically via the Events API
---

# Events API

The Events API is the primary interface for integrating external monitoring systems with OpsKnight. It allows you to trigger new incidents, acknowledge existing ones, and mark them as resolved — all programmatically.

---

## Overview

```
Monitoring Tool → Events API → OpsKnight → Notifications
                                         → Escalation
                                         → Incident Created
```

The Events API:
- Accepts events from any system that can make HTTP requests
- Automatically creates or updates incidents based on deduplication
- Routes incidents to the correct service and escalation policy
- Triggers notifications to on-call responders

---

## Endpoint

```
POST /api/events
```

**Base URL**: `https://your-opsknight.com/api/events`

---

## Authentication

### API Key Authentication

Include your API key in the Authorization header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Integration Routing Key

Alternatively, include the routing key in the request body. The routing key identifies which integration (and thus which service) should receive the event.

```json
{
  "routing_key": "YOUR_ROUTING_KEY",
  ...
}
```

### Creating an API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name your key (e.g., "Prometheus Integration")
4. Select scope: `events:write`
5. Copy and store the key securely

### Finding Your Routing Key

1. Go to **Services** → Select a service
2. Click **Integrations**
3. Select or create an integration
4. Copy the **Routing Key**

---

## Request Format

### Content Type

```http
Content-Type: application/json
```

### Request Body

```json
{
  "routing_key": "abc123def456",
  "event_action": "trigger",
  "dedup_key": "unique-alert-identifier",
  "payload": {
    "summary": "Brief description of the issue",
    "source": "monitoring-system",
    "severity": "critical",
    "timestamp": "2024-01-15T10:30:00Z",
    "custom_details": {
      "metric": "cpu_usage",
      "value": 95.5,
      "threshold": 90,
      "host": "web-server-01"
    }
  },
  "links": [
    {
      "href": "https://grafana.example.com/dashboard/123",
      "text": "View Dashboard"
    }
  ],
  "images": [
    {
      "src": "https://grafana.example.com/render/panel/123",
      "alt": "CPU Graph"
    }
  ]
}
```

---

## Fields Reference

### Top-Level Fields

| Field | Type | Required | Description |
| ----- | ---- | :------: | ----------- |
| `routing_key` | string | Yes* | Integration routing key |
| `service_id` | string | Yes* | Alternative: direct service ID |
| `event_action` | string | Yes | `trigger`, `acknowledge`, `resolve` |
| `dedup_key` | string | Yes | Unique identifier for deduplication |
| `payload` | object | Yes** | Event details (required for trigger) |
| `links` | array | No | Related links to display |
| `images` | array | No | Related images to display |

*Either `routing_key` or `service_id` is required
**Required for `trigger` action, optional for others

### Payload Fields

| Field | Type | Required | Description |
| ----- | ---- | :------: | ----------- |
| `summary` | string | Yes | Brief description (max 1024 chars) |
| `source` | string | Yes | Source system identifier |
| `severity` | string | Yes | `critical`, `error`, `warning`, `info` |
| `timestamp` | string | No | ISO 8601 timestamp (defaults to now) |
| `custom_details` | object | No | Arbitrary key-value pairs |
| `component` | string | No | Affected component name |
| `group` | string | No | Grouping identifier |
| `class` | string | No | Event class/category |

### Severity Mapping

| Severity | OpsKnight Urgency | Description |
| -------- | ----------------- | ----------- |
| `critical` | HIGH | Service is down or severely degraded |
| `error` | HIGH | Significant issue requiring attention |
| `warning` | MEDIUM | Potential issue, should investigate |
| `info` | LOW | Informational, low priority |

### Link Fields

| Field | Type | Required | Description |
| ----- | ---- | :------: | ----------- |
| `href` | string | Yes | URL to link to |
| `text` | string | No | Display text for the link |

### Image Fields

| Field | Type | Required | Description |
| ----- | ---- | :------: | ----------- |
| `src` | string | Yes | Image URL |
| `alt` | string | No | Alt text description |

---

## Event Actions

### trigger

Creates a new incident or updates an existing one.

**Behavior**:
- If no incident exists with the `dedup_key`: creates new incident
- If incident exists and is OPEN/ACKNOWLEDGED: updates the incident
- If incident exists and is RESOLVED: creates new incident

```json
{
  "routing_key": "abc123",
  "event_action": "trigger",
  "dedup_key": "server-cpu-high-web01",
  "payload": {
    "summary": "CPU usage above 90% on web-01",
    "source": "prometheus",
    "severity": "critical",
    "custom_details": {
      "cpu_percent": 95.5,
      "host": "web-01",
      "duration_minutes": 5
    }
  }
}
```

### acknowledge

Marks an existing incident as acknowledged.

**Behavior**:
- Stops escalation
- Updates incident status to ACKNOWLEDGED
- Logs acknowledgment event
- No effect if already resolved

```json
{
  "routing_key": "abc123",
  "event_action": "acknowledge",
  "dedup_key": "server-cpu-high-web01"
}
```

### resolve

Marks an incident as resolved.

**Behavior**:
- Closes the incident
- Updates status to RESOLVED
- Records resolution time for metrics
- Triggers resolution notifications

```json
{
  "routing_key": "abc123",
  "event_action": "resolve",
  "dedup_key": "server-cpu-high-web01"
}
```

---

## Response Format

### Success Response

```json
{
  "status": "success",
  "message": "Event processed successfully",
  "data": {
    "dedup_key": "server-cpu-high-web01",
    "incident_key": "inc_abc123xyz",
    "action": "trigger",
    "result": "created"
  }
}
```

### Response Fields

| Field | Description |
| ----- | ----------- |
| `status` | `success` or `error` |
| `message` | Human-readable message |
| `data.dedup_key` | The deduplication key used |
| `data.incident_key` | OpsKnight incident ID |
| `data.action` | Action that was performed |
| `data.result` | Outcome: `created`, `updated`, `acknowledged`, `resolved`, `deduplicated` |

### Error Response

```json
{
  "status": "error",
  "error": {
    "code": "INVALID_ROUTING_KEY",
    "message": "The routing key provided does not exist or is inactive",
    "details": {
      "routing_key": "invalid-key"
    }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
| ---- | ----------- | ----------- |
| `INVALID_ROUTING_KEY` | 400 | Routing key not found |
| `INVALID_SERVICE` | 400 | Service ID not found |
| `INVALID_PAYLOAD` | 400 | Missing or invalid payload |
| `INVALID_SEVERITY` | 400 | Invalid severity value |
| `MISSING_DEDUP_KEY` | 400 | Dedup key is required |
| `UNAUTHORIZED` | 401 | Invalid or missing API key |
| `FORBIDDEN` | 403 | API key lacks required scope |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Deduplication

Deduplication prevents duplicate incidents from flooding your system.

### How It Works

```
Event 1: dedup_key="cpu-high" → New incident created
Event 2: dedup_key="cpu-high" → Same incident updated
Event 3: dedup_key="cpu-high" → Same incident updated
Event 4: dedup_key="disk-full" → New incident created
```

### Dedup Key Best Practices

**Good dedup keys**:
```
server-cpu-high-web01           # host + metric + server
database-connection-error-prod  # service + issue + environment
api-latency-p99-exceeded        # service + specific metric
```

**Bad dedup keys**:
```
alert-123456                    # Random, not meaningful
cpu-high                        # Too generic
2024-01-15-alert               # Date-based, creates duplicates
```

### Deduplication Window

- Active incidents: Events with same dedup_key update existing incident
- Resolved incidents: New event with same dedup_key creates new incident
- No time limit: Deduplication works as long as incident is open

---

## Examples

### cURL Examples

**Trigger an Incident**:

```bash
curl -X POST https://your-opsknight.com/api/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "routing_key": "abc123def456",
    "event_action": "trigger",
    "dedup_key": "database-connection-timeout",
    "payload": {
      "summary": "Database connection timeout on primary",
      "source": "monitoring-agent",
      "severity": "critical",
      "custom_details": {
        "database": "postgres-primary",
        "timeout_ms": 30000,
        "affected_queries": 150
      }
    }
  }'
```

**Acknowledge an Incident**:

```bash
curl -X POST https://your-opsknight.com/api/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "routing_key": "abc123def456",
    "event_action": "acknowledge",
    "dedup_key": "database-connection-timeout"
  }'
```

**Resolve an Incident**:

```bash
curl -X POST https://your-opsknight.com/api/events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "routing_key": "abc123def456",
    "event_action": "resolve",
    "dedup_key": "database-connection-timeout"
  }'
```

### Python Example

```python
import requests
import json

OPSKNIGHT_URL = "https://your-opsknight.com"
API_KEY = "your-api-key"
ROUTING_KEY = "your-routing-key"

def send_event(action, dedup_key, payload=None):
    url = f"{OPSKNIGHT_URL}/api/events"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "routing_key": ROUTING_KEY,
        "event_action": action,
        "dedup_key": dedup_key
    }

    if payload:
        data["payload"] = payload

    response = requests.post(url, headers=headers, json=data)
    return response.json()

# Trigger an incident
result = send_event(
    action="trigger",
    dedup_key="api-error-rate-high",
    payload={
        "summary": "API error rate above 5%",
        "source": "prometheus",
        "severity": "error",
        "custom_details": {
            "error_rate": 7.5,
            "threshold": 5.0
        }
    }
)
print(result)

# Acknowledge
result = send_event("acknowledge", "api-error-rate-high")

# Resolve
result = send_event("resolve", "api-error-rate-high")
```

### Node.js Example

```javascript
const axios = require('axios');

const OPSKNIGHT_URL = 'https://your-opsknight.com';
const API_KEY = 'your-api-key';
const ROUTING_KEY = 'your-routing-key';

async function sendEvent(action, dedupKey, payload = null) {
  const response = await axios.post(
    `${OPSKNIGHT_URL}/api/events`,
    {
      routing_key: ROUTING_KEY,
      event_action: action,
      dedup_key: dedupKey,
      ...(payload && { payload })
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
}

// Trigger incident
sendEvent('trigger', 'memory-usage-critical', {
  summary: 'Memory usage above 95%',
  source: 'node-exporter',
  severity: 'critical',
  custom_details: {
    memory_percent: 97.5,
    host: 'app-server-01'
  }
}).then(console.log);
```

### Shell Script for Auto-Resolve

```bash
#!/bin/bash
# auto-resolve.sh - Send resolve event when condition clears

OPSKNIGHT_URL="https://your-opsknight.com"
API_KEY="your-api-key"
ROUTING_KEY="your-routing-key"
DEDUP_KEY="$1"

curl -s -X POST "$OPSKNIGHT_URL/api/events" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"routing_key\": \"$ROUTING_KEY\",
    \"event_action\": \"resolve\",
    \"dedup_key\": \"$DEDUP_KEY\"
  }"
```

---

## Rate Limiting

The Events API has rate limits to prevent abuse.

### Limits

| Tier | Limit | Window |
| ---- | ----- | ------ |
| **Per API Key** | 1000 requests | 1 minute |
| **Per Routing Key** | 100 requests | 1 minute |
| **Burst** | 50 requests | 1 second |

### Rate Limit Headers

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1705320000
```

### Handling Rate Limits

When rate limited, you'll receive:

```json
{
  "status": "error",
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please retry after 30 seconds.",
    "retry_after": 30
  }
}
```

**Best Practice**: Implement exponential backoff:

```python
import time

def send_with_retry(event, max_retries=3):
    for attempt in range(max_retries):
        response = send_event(event)
        if response.get('status') == 'success':
            return response
        if response.get('error', {}).get('code') == 'RATE_LIMITED':
            wait_time = response['error'].get('retry_after', 2 ** attempt)
            time.sleep(wait_time)
        else:
            raise Exception(response.get('error', {}).get('message'))
    raise Exception("Max retries exceeded")
```

---

## Webhook Integration

For monitoring tools that can't make custom HTTP requests, use webhooks.

### Webhook URL Format

```
https://your-opsknight.com/api/integrations/{type}?integrationId={id}
```

### Supported Webhook Types

| Type | Endpoint |
| ---- | -------- |
| Generic | `/api/integrations/webhook` |
| Datadog | `/api/integrations/datadog` |
| Prometheus | `/api/integrations/prometheus` |
| Grafana | `/api/integrations/grafana` |

See [Integrations](../integrations/README.md) for tool-specific guides.

---

## Testing

### Test Endpoint

Use this endpoint to validate your integration without creating real incidents:

```
POST /api/events/test
```

**Response**:
```json
{
  "status": "success",
  "message": "Event validated successfully",
  "data": {
    "would_create": true,
    "service": "Payment API",
    "escalation_policy": "Payment API Policy"
  }
}
```

### Manual Testing

1. Go to **Services** → Select a service
2. Click **Test Integration**
3. Send a test event
4. Verify incident appears

---

## Best Practices

### Event Design

- **Descriptive summaries**: Include what's wrong and where
- **Consistent dedup keys**: Use a pattern like `{service}-{metric}-{host}`
- **Rich custom_details**: Include metrics, thresholds, affected resources
- **Send resolves**: Always send resolve events when issues clear

### Integration Patterns

**Monitoring Integration**:
```
Prometheus/Grafana → Alertmanager → OpsKnight Events API
                                        ↓
                                   Incident Created
```

**CI/CD Integration**:
```
Deployment Failed → Events API (trigger) → Incident
Deployment Fixed → Events API (resolve) → Incident Resolved
```

### Error Handling

- Implement retries with backoff
- Log failed events for debugging
- Monitor API response codes
- Set up alerting on integration failures

---

## Troubleshooting

### Event Not Creating Incident

1. Verify routing key is correct
2. Check API key has `events:write` scope
3. Verify service exists and has escalation policy
4. Check for validation errors in response

### Deduplication Not Working

1. Verify dedup_key is exactly the same
2. Check incident isn't already resolved
3. Verify routing to same service

### Notifications Not Sending

1. Check escalation policy is configured
2. Verify notification channels are set up
3. Check user contact info is valid
4. Review escalation timeline

---

## Related Topics

- [Incidents API](./incidents.md) — Direct incident management
- [Integrations](../integrations/README.md) — Tool-specific setup
- [Webhooks](../integrations/webhooks.md) — Webhook configuration
- [Services](../core-concepts/services.md) — Service configuration

