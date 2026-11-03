import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { randomPassword, uiUsername } from '../utils'

export const setPassword = sdk.Action.withoutInput(
  'set-password',

  async ({ effects }) => {
    const alreadySet = !!(await storeJson
      .read((s) => s.uiPassword)
      .const(effects))
    return {
      name: alreadySet
        ? i18n('Reset Web Interface Password')
        : i18n('Set Web Interface Password'),
      description: i18n(
        'Generate the password for the Scoredrop web interface. The username is always "admin". Running this again generates a new password.',
      ),
      warning: alreadySet
        ? i18n('Replaces the current web interface password.')
        : null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  async ({ effects }) => {
    const password = utils.getDefaultString(randomPassword)
    await storeJson.merge(effects, { uiPassword: password })

    return {
      version: '1',
      title: i18n('Web Interface Password Set'),
      message: i18n(
        'Use these credentials to sign in to the Scoredrop web interface. Save the password now — running this action again generates a new one.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: uiUsername,
            masked: false,
            copyable: true,
            qr: false,
            launchable: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
            launchable: false,
          },
        ],
      },
    }
  },
)
