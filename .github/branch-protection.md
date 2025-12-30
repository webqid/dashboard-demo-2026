# Branch Protection Rules

Configure these rules in your GitHub repository settings for best practices.

## Main Branch (`main`)

**Settings → Branches → Add rule → Branch name pattern: `main`**

- ✅ Require a pull request before merging
  - ✅ Require approvals: 1 (or more for larger teams)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - Required checks:
    - `Lint`
    - `Type Check`
    - `Build`
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes (disabled)
- ❌ Allow deletions (disabled)

## Staging Branch (`staging`)

**Settings → Branches → Add rule → Branch name pattern: `staging`**

- ✅ Require a pull request before merging
  - ✅ Require approvals: 1
  - ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require status checks to pass before merging
  - Required checks:
    - `Lint`
    - `Type Check`
    - `Build`
- ✅ Require conversation resolution before merging
- ❌ Allow force pushes (disabled)
- ❌ Allow deletions (disabled)

## Development Branch (`development`)

**Settings → Branches → Add rule → Branch name pattern: `development`**

- ✅ Require a pull request before merging
  - ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
  - Required checks:
    - `Lint`
    - `Type Check`
    - `Build`
- ❌ Allow force pushes (disabled)
- ❌ Allow deletions (disabled)

---

## Environment Protection Rules

**Settings → Environments**

### Production Environment

- ✅ Required reviewers (add team members who can approve production deployments)
- ✅ Wait timer: 0-30 minutes (optional, for final review window)
- ✅ Deployment branches: Only `main`

### Staging Environment

- ✅ Deployment branches: Only `staging`

---

## Recommended Workflow

```
Feature Branch → Development → Staging → Main (Production)
     ↓              ↓            ↓           ↓
   CI runs       CI runs     CI runs    CI + Release
                              + Deploy   + Deploy
```

1. **Feature Development**: Create feature branches from `development`
2. **Code Review**: Open PR to `development`, require approval
3. **Staging Release**: Use "Promote to Staging" workflow to create release PR
4. **Staging Testing**: Test on staging environment
5. **Production Release**: Use "Promote to Production" workflow
6. **Automatic Release**: GitHub Release created automatically on merge to `main`
