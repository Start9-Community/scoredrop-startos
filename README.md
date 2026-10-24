<p align="center">
  <img src="icon.svg" alt="Scoredrop Logo" width="21%">
</p>

# Scoredrop on StartOS

> Everything not listed in this document should behave the same as upstream Scoredrop.
> If a feature, setting, or behavior is not mentioned here, the upstream
> documentation is accurate and fully applicable.

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)

## Image and Container Runtime

- Image: `martinbarilik/scoredrop` from Docker Hub, pinned by `dockerTag` in
  `startos/manifest/index.ts`. See `UPDATING.md` for the bump procedure.
- Architectures: `x86_64`, `aarch64`.
- One subcontainer (`main`) running the image's own entrypoint
  (`sdk.useEntrypoint()`): `bin/docker-entrypoint` initializes the embedded
  postgres, runs migrations, then starts Rails via Thruster on port 80.

## Volume and Data Layout

Single volume `main` mounted at `/data`. It holds the embedded postgres data
dir (`/data/postgres`), the persisted `secret_key_base`, and an optional
one-time-import `config.yml` — all created by the image's entrypoint on first
boot.

## File Models

None. All configuration lives in the app's database (`settings`,
`subscriptions` tables), managed through the web UI.

## Dependencies

None.

## Network Access and Interfaces

One interface, `ui` (type `ui`), bound to port 80 as HTTP. Whether it is
reachable over LAN, Tor, or clearnet is the user's choice in StartOS.

## Installation and First-Run Flow

No config or setup step. Install → start → open the web interface and enter
ntfy server details in the app's settings page.

## Actions

None.

## Tasks

None.

## Health Checks

`Web Interface` — `checkPortListening` on port 80. A failure means the Rails
server is not accepting connections (still booting, or crashed).

## Backups and Restore

Backs up the `main` volume (the whole `/data` dir: postgres, secrets, config).
Restore replaces it wholesale.

## Limitations and Differences

- Single-instance only: the embedded postgres and in-process poller must not
  run twice concurrently.
- Notifications can trail real time by a minute or two (upstream API caching).

---

## Quick Reference for AI Consumers

```yaml
package_id: 'scoredrop'
image:
  scoredrop: 'dockerTag martinbarilik/scoredrop:0.1.0'
architectures: ['x86_64', 'aarch64']
subcontainers: ['main']
volumes:
  main: '/data'
file_models: []
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui:
    port: 80
    protocol: 'http'
    type: 'ui'
actions: []
tasks: []
health_checks:
  'Web Interface': 'checkPortListening on port 80'
```
