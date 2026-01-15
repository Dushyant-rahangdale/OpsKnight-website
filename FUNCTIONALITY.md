# OpsSentinal Functionality Overview

OpsSentinal is a comprehensive, open-source incident management and response platform designed to be a self-hosted alternative to PagerDuty or OpsGenie. It provides end-to-end handling of critical alerts, ensuring the right people are notified at the right time.

## 🚨 Incident Management
The core of the platform is tracking critical issues from trigger to resolution.
- **Lifecycle Tracking**: Full state management (`Open` -> `Acknowledged` -> `Resolved`).
- **Urgency & Priority**: Classify incidents by Urgency (High/Low) and Priority (P1-P5).
- **Merge & Deduplication**: Smart "Alert Storm" protection. Duplicate alerts are automatically merged into a single incident using `dedupKeys`, preventing notification spam.
- **Snoozing**: Temporarily silence incidents for a set duration (e.g., "Snooze for 4 hours").
- **Audit Trails**: Every action (assignment, status change, note) is logged permanently for compliance.

## 📅 On-Call Scheduling
A robust scheduling engine that handles complex team rotations.
- **Multi-Layer Rotations**: Supports primary, secondary, and tertiary backup layers.
- **Flexible Shifts**: Daily, weekly, or custom shift lengths.
- **Timezone Awareness**: Schedules respect the user's local timezone.
- **Overrides**: "I've got this." Users can create temporary overrides to cover shifts for others without altering the permanent schedule.
- **Calendar Visualization**: Easy-to-read calendar view of who is on call when.

## 📢 Escalation Policies
Ensure no alert goes unheard.
- **Recursive Logic**: Define a chain of command (e.g., "Notify On-Call -> Wait 5 mins -> Notify Manager -> Wait 10 mins -> Notify CTO").
- **Multi-Target Routing**: Steps can target:
    - **Specific Users**
    - **Whole Teams**
    - **On-Call Schedules** (automatically finds who is on duty)
- **Round Robin**: Distribute alerts evenly across team members.

## 🔌 Integrations & Ingestion
OpsSentinal acts as a central hub for all your monitoring tools.
- **Native Support**: Built-in parsers for:
    - AWS CloudWatch
    - Azure Monitor
    - Datadog
    - Prometheus / Grafana
    - New Relic
    - Sentry
    - GitHub
- **Email Integration**: Trigger incidents via email logic.
- **Universal Webhook**: A generic API to trigger alerts from any tool capable of sending a JSON POST.

## 💬 ChatOps (Slack)
Deep, bidirectional integration with Slack.
- **Interactive Notifications**: receiving an alert in Slack isn't just a text message. It includes buttons to **Acknowledge** or **Resolve** the incident directly from the chat.
- **Channel Sync**: Automatically keeps a Slack channel updated with the latest incident status.

## 📊 Analytics & SLAs
A "World-Class" metrics engine to track team performance.
- **MTTA / MTTR**: Automatically calculates *Mean Time to Acknowledge* and *Mean Time to Resolve*.
- **SLA Tracking**: Define Service Level Agreements (e.g., "Must ack within 15m") and get alerted before you breach them.
- **Breach Monitoring**: Background jobs actively monitor open incidents and warn of impending SLA violations.
- **Historical Reporting**: Long-term data retention and "Rollup" aggregation for fast reporting over months or years.

## 🔔 Multi-Channel Notifications
Reach responders where they are.
- **SMS / Voice**: Twilio, AWS SNS.
- **Push Notifications**: Mobile app support via Firebase/OneSignal.
- **Email**: SendGrid, AWS SES, Resend, SMTP.
- **WhatsApp**: Direct message delivery.

## 🛡️ Enterprise Ready
- **Self-Hosted First**: Built to run on your infrastructure (Docker/Kubernetes).
- **Postgres-Based Queue**: No complex Redis dependency; the job queue lives in your primary database.
- **Single Sign-On (SSO)**: OIDC support for enterprise identity providers.
- **RBAC**: Fine-grained permissions (User, Admin, Responder, Team Lead).
