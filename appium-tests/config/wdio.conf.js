const path = require('path');
const androidCaps = require('./capabilities.android.json');
const iosCaps = require('./capabilities.ios.json');
const webCaps = require('./capabilities.web.json');

const platform = process.env.PLATFORM || 'android';

function getCapabilities() {
  switch (platform) {
    case 'ios': return iosCaps;
    case 'web': return webCaps;
    case 'android':
    default: return androidCaps;
  }
}

const specs = process.env.SPEC_PATTERN || './appium-tests/tests/**/*.spec.js';

exports.config = {
  runner: 'local',
  port: 4723,
  path: '/',

  specs: [specs],
  exclude: [],

  maxInstances: 1,
  capabilities: [getCapabilities()],

  logLevel: 'warn',
  bail: 0,

  baseUrl: platform === 'web' ? 'http://localhost:19006' : '',

  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: platform === 'web'
    ? []
    : [['appium', {
        args: { allowInsecure: ['chromedriver_autodownload'] },
        command: 'appium',
      }]],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    require: [],
  },

  reporters: [
    'spec',
    ['json', {
      outputDir: path.resolve(__dirname, '../reports'),
      outputFileFormat: () => 'test-results.json',
    }],
  ],

  // Hooks
  before: function () {
    // Add custom commands or global setup
    global.platform = platform;
  },

  afterTest: async function (test, context, { error, result, duration, passed }) {
    if (!passed) {
      try {
        const timestamp = Date.now();
        const screenshotPath = path.resolve(
          __dirname,
          `../reports/screenshots/${test.title.replace(/\s+/g, '_')}_${timestamp}.png`
        );
        await browser.saveScreenshot(screenshotPath);
      } catch (e) {
        console.log('Screenshot capture failed:', e.message);
      }
    }
  },

  onComplete: function () {
    console.log('\n✅ Test execution complete. Reports saved to appium-tests/reports/');
  },
};
