exports.config = {
  runner: 'local',
  port: 4723,
  specs: ['./appium-tests/tests/**/*.spec.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: process.env.PLATFORM || 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './android/app/build/outputs/apk/debug/app-debug.apk',
  }],
  logLevel: 'warn',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
    ['json', {
      outputDir: './appium-tests/reports',
      outputFileFormat: () => 'test-results.json',
    }],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
