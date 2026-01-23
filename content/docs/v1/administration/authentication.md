---
order: 1
---

# Authentication

Configure how users authenticate with OpsKnight and how identities map to roles.

## Authentication Methods

| Method   | Best For                 |
| -------- | ------------------------ |
| Local    | Small teams, development |
| SSO/OIDC | Enterprise, compliance   |

## Local Authentication

Local authentication uses email and password.

### First-Time Setup

When no users exist, access `/setup` to create the initial admin account:

1. Navigate to your OpsKnight URL
2. You'll be redirected to `/setup`
3. Enter your name and email
4. Save the generated password securely (shown only once)

### Adding Users

The recommended way to add users is through the **Invite** feature:

1. Go to **Settings** → **Users**
2. Click **Invite User**
3. Enter the user's email and select a role
4. The user receives an email with a 7-day invitation link
5. They set their own password upon accepting

> **Tip:** Use the CLI tool only as a recovery option if locked out. See [CLI Tool](../api/cli.md).

## SSO / OIDC Authentication

Single sign-on is recommended for production. Configure your identity provider in the Security section.

- [OIDC SSO Setup](../security/oidc-setup.md)

### Role Mapping

Map identity provider claims to OpsKnight roles in **Settings → Authentication → Role Mapping**.

Example mapping:

```
Provider Role    → OpsKnight Role
admin            → Admin
engineer         → Responder
viewer           → User
```

## Session Management

Manage your active sessions from the Security settings:

1. Go to **Settings → Security**
2. Scroll to **Active Sessions**
3. Click **Revoke All Sessions** to sign out from all devices

> **Note:** This will immediately invalidate all your sessions across all devices. You will need to sign in again.

## Security Notes

- Protect `NEXTAUTH_SECRET` and `ENCRYPTION_KEY`.
- Use HTTPS for production environments.
- Review user access regularly.
