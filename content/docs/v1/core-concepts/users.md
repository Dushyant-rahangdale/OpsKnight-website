---
order: 7
---

# Users

Manage user access and permissions in OpsKnight.

## Roles

| Role      | Description        | Capabilities                    |
| --------- | ------------------ | ------------------------------- |
| Admin     | Full access        | All permissions                 |
| Responder | Incident handling  | Manage incidents and schedules  |
| User      | Read-only          | View dashboards and incidents   |

## User Statuses

| Status | Description |
| ------ | ----------- |
| INVITED | User has been invited but hasn't accepted yet |
| ACTIVE | User has accepted invite and can log in |
| DISABLED | User account is deactivated |

## Adding Users

### First Admin (Setup)

When OpsKnight starts with no users, navigate to `/setup` to create the first admin account. A secure password is generated for you — save it immediately.

### Invite Users (Recommended)

The primary way to add users:

1. Go to **Settings** → **Users**
2. Click **Invite User**
3. Enter email address
4. Select a role (User, Responder, or Admin)
5. Click **Send Invitation**

The user receives an email with a link to set their password. Invitations expire after 7 days.

### CLI (Recovery Only)

The CLI tool exists for recovery scenarios (e.g., if locked out of all admin accounts). See [CLI Tool](../api/cli.md) for details.

## Deactivate Users

1. Go to **Users**
2. Select the user
3. Click **Deactivate**

Deactivated users cannot log in, but their history remains.

## Best Practices

- Use least-privilege roles.
- Require responders to add phone numbers.
- Review access quarterly.
