# Updating the upstream version

Upstream for Scoredrop is the Docker image `martinbarilik/scoredrop` on Docker
Hub, pinned by tag. The image is self-contained (Rails app + embedded postgres +
gems + assets); there is no git submodule in this package.

## Determining the upstream version

The current pin lives in `startos/manifest/index.ts`:

```ts
images: {
  scoredrop: {
    source: { dockerTag: 'martinbarilik/scoredrop:2.0.0' },
    ...
  },
}
```

List available upstream tags with:

```sh
curl -s https://hub.docker.com/v2/repositories/martinbarilik/scoredrop/tags \
  | jq -r '.results[].name'
```

## Applying the bump

1. Update the `dockerTag` in `startos/manifest/index.ts` to the new tag.
2. Update `version` in `startos/versions/current.ts` to `<upstream>:0` (e.g.
   `2.0.0:0`). For packaging-only changes on an unchanged upstream, bump the
   downstream revision instead (`2.0.0:1`).

The image must exist for both `amd64` and `arm64` before bumping — see the
upstream README's buildx instructions for multi-arch publishing.

## Checks on every bump

The package leans on two upstream behaviors that a new image can change. Confirm both before releasing:

- The entrypoint still seeds no `config.yml` when `SCOREDROP_CONFIG` is empty: a fresh install must start with no subscriptions and no ntfy server.
- The app still has no login of its own. If upstream adds one, the StartOS proxy gate in `startos/interfaces.ts` becomes a second password and should be replaced by the app's own.
