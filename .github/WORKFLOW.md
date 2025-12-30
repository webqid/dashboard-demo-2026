# Branch & Workflow Strategy

## Branches

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `development` | Active development | - |
| `staging` | Pre-production testing | Staging environment |
| `main` | Production releases | Production + GitHub Release |

## Workflow

```
development → (PR) → staging → (PR) → main
     ↓                  ↓              ↓
   CI only          Deploy to      Deploy to
                    Staging        Production
```

### 1. Development
- Create feature branches from `development`
- Open PR to `development`
- CI runs (lint, typecheck, build)
- Merge after review

### 2. Promote to Staging
- Open PR from `development` → `staging`
- CI runs on PR
- Merge to trigger staging deployment

### 3. Promote to Production
- Open PR from `staging` → `main`
- CI runs on PR
- Merge to trigger production deployment
- GitHub Release created automatically

## Branch Protection (Recommended)

### `main` branch
- ✅ Require PR before merging
- ✅ Require 1 approval
- ✅ Require status checks: `Build & Lint`
- ❌ Allow force pushes

### `staging` branch
- ✅ Require PR before merging
- ✅ Require status checks: `Build & Lint`

### `development` branch
- ✅ Require status checks: `Build & Lint`

## Version Bumping

Before promoting to staging, bump the version:

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

Then commit and push the version change.
