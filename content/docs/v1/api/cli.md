---
order: 3
---

# CLI Tool

The OpsSentinel CLI is used for user management and bootstrap automation.

## Usage

```bash
npm run opssentinel -- [options]
```

## Create a User

```bash
npm run opssentinel -- \
  --user "John Doe" \
  --email john@company.com \
  --password SecurePass123! \
  --role admin
```

## Options

| Option       | Description                        | Required |
| ------------ | ---------------------------------- | -------- |
| `--user`     | User's full name                   | ✅       |
| `--email`    | Email address                      | ✅       |
| `--password` | Password                           | ✅       |
| `--role`     | Role: `admin`, `responder`, `user` | ✅       |
| `--update`   | Update existing user               | -        |

## Update a User

```bash
npm run opssentinel -- \
  --user "John Doe" \
  --email john@company.com \
  --password NewPassword123! \
  --role responder \
  --update
```

## Docker Usage

```bash
docker exec -it opssentinel_app npm run opssentinel -- \
  --user "Admin" \
  --email admin@example.com \
  --password SecurePass123! \
  --role admin
```

## Kubernetes Usage

```bash
kubectl exec -it deploy/opssentinel -- npm run opssentinel -- \
  --user "Admin" \
  --email admin@example.com \
  --password SecurePass123! \
  --role admin
```

## Best Practices

- Use strong passwords.
- Store credentials securely.
- Prefer SSO for production.
