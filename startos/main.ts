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

  return sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer,
      // The image runs as uid 1000; StartOS mounts volumes root-owned.
      exec: { command: ['chown', '-R', '1000:1000', '/data'], user: 'root' },
      requires: [],
    })
    .addDaemon('main', {
      subcontainer,
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          // The slim image ships only C/POSIX locales; initdb fails under any other LANG.
          LANG: 'C.UTF-8',
          LC_ALL: 'C.UTF-8',
          HTTP_PORT: String(uiPort),
          // Empty, so the entrypoint seeds no example config for the first boot to import.
          SCOREDROP_CONFIG: '',
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
