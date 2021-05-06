module.exports = ({env}) => ({
  timeout: 1000000,
  settings: {
    algolia: {
      enabled: true,
      applicationId: env('ALGOLIA_APP_ID', '03LZGMIZK9'),
      apiKey: env('ALGOLIA_API_SECRET', '39e47fd37c58a61230ac91a9608afc9b'),
      debug: true,
      prefix: 'dev',
    },
  }
})
