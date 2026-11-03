export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Scoredrop!': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  // interfaces.ts
  'The main web interface': 4,
  // actions/setPassword.ts
  'Reset Web Interface Password': 5,
  'Set Web Interface Password': 6,
  'Generate the password for the Scoredrop web interface. The username is always "admin". Running this again generates a new password.': 7,
  'Replaces the current web interface password.': 8,
  'Web Interface Password Set': 9,
  'Use these credentials to sign in to the Scoredrop web interface. Save the password now — running this action again generates a new one.': 10,
  Username: 11,
  Password: 12,
  // init/watchPassword.ts
  'Set a password to protect the Scoredrop web interface': 13,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
