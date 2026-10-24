import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Scoredrop!'))

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'scoredrop' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    }),
    'main',
  )

  // The image runs as uid 1000 (rails user); StartOS mounts volumes root-owned.
  return sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer,
      exec: {
        command: ['chown', '-R', '1000:1000', '/data'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('main', {
      subcontainer,
      exec: {
        command: sdk.useEntrypoint(),
        // The slim image only ships C/POSIX locales; the runtime's LANG breaks initdb.
        // HTTP_PORT: container runs as uid 1000, cannot bind privileged port 80.
        env: {
          LANG: 'C.UTF-8',
          LC_ALL: 'C.UTF-8',
          HTTP_PORT: String(uiPort),
        },
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['chown'],
    })
})
