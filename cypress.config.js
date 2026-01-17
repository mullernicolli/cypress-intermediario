const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,  // função experimental para poder executar todos os testes de uma vez, ou todos de cada pasta de uma vez no modo interativo do cypress
  },
  fixturesFolder: false,
  video: false,
})