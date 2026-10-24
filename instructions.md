# Scoredrop

## Documentation

- Scoredrop repository — upstream source and full feature docs:
  https://github.com/martinbarilik/scoredrop
- ntfy — the push service Scoredrop notifies through:
  https://ntfy.sh

## What you get on StartOS

Scoredrop watches football fixtures via the free sportscore.com widget API and
pushes match event notifications (goals, red cards, kickoffs, full-time
results) to your ntfy server.

This package runs Scoredrop as a single self-contained container: the Rails app
and an embedded PostgreSQL live in one image, with all data on the `main`
volume — so StartOS backups capture everything (settings, subscriptions, match
history).

## Getting set up

1. Open the **Web Interface** interface from Scoredrop's service page.
2. Enter your ntfy server URL and topic in the app's settings.
3. Subscribe to the teams/leagues you want to follow.

All configuration lives in the app's database — there are no config files or
actions in this package.

## Notes

- Run exactly one instance: the embedded postgres and in-process poller are
  single-process.
- Notifications can trail real time by a minute or two (upstream API caching).
- The service is football-only; other sports are locked off upstream.
