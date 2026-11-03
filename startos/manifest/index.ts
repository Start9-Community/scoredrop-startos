import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'scoredrop',
  title: 'Scoredrop',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/scoredrop-startos',
  upstreamRepo: 'https://github.com/martinbarilik/scoredrop',
  marketingUrl: 'https://github.com/martinbarilik/scoredrop',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    scoredrop: {
      source: { dockerTag: 'martinbarilik/scoredrop:2.0.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
