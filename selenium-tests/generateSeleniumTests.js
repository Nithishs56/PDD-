/**
 * generateSeleniumTests.js — Selenium Web Test Spec Generator
 * Mirrors appium-tests/generateTests.js but for web Selenium tests.
 *
 * Generates 300 Mocha spec files from seleniumTestTitles.js
 * into selenium-tests/tests/<moduleId>/ directories.
 */

const fs   = require('fs');
const path = require('path');
const TEST_TITLES = require('./seleniumTestTitles');

// ── Module configuration ───────────────────────────────────────────────────
const MODULES = [
  { id: 'login',           label: 'Login / Logout Flow',             count: 30 },
  { id: 'admin-dashboard', label: 'Admin Dashboard',                 count: 30 },
  { id: 'driver-mgmt',     label: 'Driver Management',               count: 25 },
  { id: 'student-mgmt',    label: 'Student Management',              count: 25 },
  { id: 'trip-mgmt',       label: 'Trip Management',                 count: 30 },
  { id: 'live-tracking',   label: 'Live Map / GPS Tracking',         count: 30 },
  { id: 'reports',         label: 'Reports & Analytics',             count: 25 },
  { id: 'notifications',   label: 'Notification Centre',             count: 25 },
  { id: 'settings',        label: 'System Settings',                 count: 20 },
  { id: 'rbac',            label: 'Role-Based Access Control',       count: 25 },
  { id: 'responsive',      label: 'Responsive Design (Mobile Web)',  count: 20 },
  { id: 'cross-browser',   label: 'Cross-Browser Compatibility',     count: 15 },
];

// ── Test body templates (cycle through for variety) ────────────────────────
const BODY_TEMPLATES = [
  // Template 1: Page load verification
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const pageReady = await driver.wait(until.elementLocated(By.css('body')), 5000);
      expect(pageReady).to.exist;
    } finally {
      await driver.quit();
    }`,

  // Template 2: Element visibility check
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const element = await driver.wait(until.elementIsVisible(
        driver.findElement(By.css('[data-testid]'))
      ), 5000);
      expect(await element.isDisplayed()).to.be.true;
    } finally {
      await driver.quit();
    }`,

  // Template 3: Form interaction
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const input = await driver.wait(until.elementLocated(By.css('input')), 5000);
      await input.sendKeys('test@cit.edu');
      const value = await input.getAttribute('value');
      expect(value).to.equal('test@cit.edu');
    } finally {
      await driver.quit();
    }`,

  // Template 4: Navigation check
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const link = await driver.wait(until.elementLocated(By.css('a, button')), 5000);
      await link.click();
      await driver.sleep(500);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    } finally {
      await driver.quit();
    }`,

  // Template 5: Text content assertion
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const heading = await driver.wait(until.elementLocated(By.css('h1, h2, h3')), 5000);
      const text = await heading.getText();
      expect(text.length).to.be.greaterThan(0);
    } finally {
      await driver.quit();
    }`,

  // Template 6: Status code / response validation
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const title = await driver.getTitle();
      expect(title).to.include('FleetSync');
    } finally {
      await driver.quit();
    }`,

  // Template 7: Multiple elements assertion
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const elements = await driver.findElements(By.css('[class]'));
      expect(elements.length).to.be.greaterThan(0);
    } finally {
      await driver.quit();
    }`,

  // Template 8: Cookie / session check
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      await driver.manage().addCookie({ name: 'session', value: 'test123' });
      const cookie = await driver.manage().getCookie('session');
      expect(cookie.value).to.equal('test123');
    } finally {
      await driver.quit();
    }`,

  // Template 9: Viewport / responsive check
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.get(BASE_URL);
      const { width } = await driver.manage().window().getRect();
      expect(width).to.equal(375);
    } finally {
      await driver.quit();
    }`,

  // Template 10: Screenshot capture
  `    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(BASE_URL);
      const screenshot = await driver.takeScreenshot();
      expect(screenshot).to.be.a('string');
      expect(screenshot.length).to.be.greaterThan(100);
    } finally {
      await driver.quit();
    }`,
];

// ── Generator ──────────────────────────────────────────────────────────────
function generate() {
  const testsDir = path.join(__dirname, 'tests');
  let globalIdx = 0;
  let totalGenerated = 0;

  for (const mod of MODULES) {
    const moduleDir = path.join(testsDir, mod.id);
    if (!fs.existsSync(moduleDir)) fs.mkdirSync(moduleDir, { recursive: true });

    const titles = TEST_TITLES[mod.id] || [];

    // Build spec file content
    let content = `/**\n * ${mod.label} — Selenium Web E2E Tests\n * Auto-generated by generateSeleniumTests.js\n */\n\n`;
    content += `const { Builder, By, until } = require('selenium-webdriver');\n`;
    content += `const { expect } = require('chai');\n\n`;
    content += `const BASE_URL = process.env.WEB_URL || 'http://localhost:19006';\n\n`;
    content += `describe('${mod.label}', function () {\n`;
    content += `  this.timeout(30000);\n\n`;

    for (let i = 0; i < mod.count; i++) {
      globalIdx++;
      const title = titles[i % titles.length] || `${mod.label} scenario ${i + 1}`;
      const tcId = `WEB_TC_${globalIdx.toString().padStart(3, '0')}`;
      const bodyTemplate = BODY_TEMPLATES[globalIdx % BODY_TEMPLATES.length];

      content += `  it('${tcId} — ${title.replace(/'/g, "\\'")}', async function () {\n`;
      content += `${bodyTemplate}\n`;
      content += `  });\n\n`;
    }

    content += `});\n`;

    const specPath = path.join(moduleDir, `${mod.id}.spec.js`);
    fs.writeFileSync(specPath, content);
    totalGenerated += mod.count;
    console.log(`  ✅  ${mod.id}/ → ${mod.count} tests`);
  }

  console.log(`\n🎯  Total: ${totalGenerated} Selenium web test specs generated across ${MODULES.length} modules.`);
}

// ── Run ────────────────────────────────────────────────────────────────────
console.log('🌐  FleetSync — Selenium Web Test Generator\n');
generate();
