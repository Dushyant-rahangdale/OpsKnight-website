---
order: 5
title: Technical Architecture
description: Comprehensive System Architecture, Data Flow, and Component Design.
---

# Technical Architecture

OpsKnight is designed as a **cloud-native, event-driven platform** built on the Next.js App Router. It separates the **Control Plane** (User Interaction & API) from the **Worker Plane** (Reliability & Async Processing) to ensure high availability and zero-data-loss for critical alerts.

## High-Level System Architecture

The following diagram details the **System Logic Flow**, mapping exactly how data moves through the ingestion pipeline, the database, and the asynchronous reliability engine.

![OpsKnight Data Flow Architecture](/assets/images/opsknight-system-flow.png)

## Core Subsystems

### 1. Ingestion Pipeline (The "Funnel")
The entry point for all chaos.
*   **Normalization**: The `API` layer accepts generic webhooks or provider-specific payloads (Datadog, Prometheus). It normalizes them into a standard `GenericEvent` schema.
*   **Deduplication**: Before persisting, the engine checks for existing open incidents with the same `dedup_key` to prevent alert storms.
*   **Enrichment**: Metadata is added (Service ownership, tagging) before the incident is written to Postgres.

### 2. The Reliability Engine (Custom Job Queue)
We chose **PostgreSQL** over Redis for our job queue to guarantee **Transactional Reliability**.
*   **The Problem**: If a Redis worker crashes after popping a job but before finishing, the alert is lost.
*   **Our Solution**: Jobs are stored in the `BackgroundJob` table.
*   **Mechanism**: Workers use `SELECT ... FOR UPDATE SKIP LOCKED` to atomically claim jobs. If a worker crashes, the transaction rolls back, and the job remains available for another worker.
*   **Capabilities**:
    -   **Escalation Steps**: "Page Alice, wait 15m, then page Bob".
    -   **SLA Monitoring**: "Warning: 5 minutes until SLA Breach".
    -   **Notification Retries**: Exponential backoff (5s, 30s, 2m, 10m) for flaky upstream providers (Twilio/Slack).

### 3. The PWA (Client)
The frontend is a **Progressive Web App** built with Next.js App Router.
*   **Optimistic UI**: Use of `useOptimistic` hooks ensures the UI feels instant (e.g., when clicking "Acknowledge"), while the server processes the request in the background.
*   **Service Workers**: Handles `web-push` events to wake up the potential responder even if the browser tab is closed.
*   **Data Fetching**: Hybrid approach using Server Components for initial load and efficient client-side polling/revalidation for live updates.

### 4. Security & Compliance
*   **Authentication**: Managed via `NextAuth.js`, supporting generic OIDC and Email Magic Links.
*   **RBAC**: Role-Based Access Control checks are enforced at the API Handler level.
*   **Audit Trails**: Every state change is written to an immutable `IncidentEvent` ledger.

## Data Schema (Simplified)

![OpsKnight Database Schema](/assets/images/opsknight-er-diagram.png)
