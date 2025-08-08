import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'crm-form',
    short_name: 'crmForm',
    description: 'creating crm form',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/next.svg',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}