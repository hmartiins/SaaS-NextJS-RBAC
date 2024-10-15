'use client'

import { datadogRum } from '@datadog/browser-rum'
import { env } from '@saas/env'

datadogRum.init({
  applicationId: env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
  clientToken: env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
  site: 'datadoghq.com',
  service: 'saas-nextjs-rbac',
  env: 'qa',
  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'allow',

  allowedTracingUrls: [
    (url) => url.startsWith('https://next-saas-api.hmartins.dev'),
  ],
})

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null
}
