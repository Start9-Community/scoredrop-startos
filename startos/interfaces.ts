import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort, uiUsername } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const password = await storeJson.read((s) => s.uiPassword).const(effects)

  const origin = await sdk.MultiHost.of(effects, 'ui').bindPort(uiPort, {
    protocol: 'http',
    preferredExternalPort: 80,
    // Scoredrop has no login of its own; the StartOS proxy is its only gate.
    addSsl: password
      ? {
          auth: {
            type: 'basic',
            credentials: [{ username: uiUsername, password }],
            realm: 'Scoredrop',
          },
        }
      : undefined,
  })

  const ui = sdk.createInterface(effects, {
    name: i18n('Web Interface'),
    id: 'ui',
    description: i18n('The main web interface'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  return [await origin.export([ui])]
})
