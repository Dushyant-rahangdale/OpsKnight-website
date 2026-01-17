---
order: 3
---

# Helm Deployment

Use the Helm chart to install OpsSentinal on Kubernetes with repeatable, versioned releases.

## Prerequisites

- Kubernetes 1.24+
- Helm 3+
- Access to a container registry
- Ingress controller (recommended for production)

## Quick Start

```bash
git clone https://github.com/dushyant-rahangdale/opssentinal.git
cd opssentinal

helm install opssentinal ./helm/opssentinal \
  --namespace opssentinal \
  --create-namespace
```

## Configure Values

Create a `values.yaml` to override defaults:

```yaml
image:
  tag: "latest"

ingress:
  enabled: true
  host: opssentinal.example.com

env:
  NEXTAUTH_URL: "https://opssentinal.example.com"
  DATABASE_URL: "postgresql://user:pass@db:5432/opssentinal"
```

Apply updates with:

```bash
helm upgrade --install opssentinal ./helm/opssentinal \
  --namespace opssentinal \
  --create-namespace \
  --values values.yaml
```

## Common Overrides

### Resources

```yaml
resources:
  requests:
    cpu: "200m"
    memory: "512Mi"
  limits:
    cpu: "1"
    memory: "1Gi"
```

### Autoscaling

```yaml
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

### Ingress TLS

```yaml
ingress:
  enabled: true
  host: opssentinal.example.com
  tls:
    enabled: true
    secretName: opssentinal-tls
```

## Secrets Management

Store secrets in your `values.yaml` or use an external secret manager. Ensure `DATABASE_URL`, `NEXTAUTH_URL`, and `NEXTAUTH_SECRET` are set before first boot.

## Next Steps

- Review the Kubernetes guide for scaling, secrets, and ingress setup.
- Add SMTP, notification providers, and integrations via `values.yaml`.

See [Kubernetes Deployment](./kubernetes.md) for production hardening.
