# QUEERSPOT YOU — Expo Launch

Public launch-only repository for the QUEERSPOT YOU iOS application.

The production web application and backend remain in the private main repository. This repository contains only the minimum public Expo client required for a reproducible iOS launch.

## Validation

```bash
npm install
npm run preflight:ios
```

Production backend access uses the public Supabase publishable key and remains protected by database grants and RLS.
