/**
 * Base Page — shared helpers for all Page Objects
 */
class BasePage {
  /**
   * Wait for an element to be displayed and return it
   * @param {string} selector - accessibility id or xpath
   * @param {number} timeout - wait timeout in ms
   */
  async waitForElement(selector, timeout = 10000) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  async waitForElementByText(text, timeout = 10000) {
    const selector = global.platform === 'web'
      ? `//*[contains(text(),"${text}")]`
      : `//android.widget.TextView[@text="${text}"]`;
    return this.waitForElement(selector, timeout);
  }

  async tapByText(text) {
    const el = await this.waitForElementByText(text);
    await el.click();
  }

  async isTextDisplayed(text, timeout = 5000) {
    try {
      const el = await this.waitForElementByText(text, timeout);
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }

  async getElementText(selector) {
    const el = await $(selector);
    return el.getText();
  }

  async scrollDown() {
    if (global.platform === 'web') {
      await browser.execute('window.scrollBy(0, 500)');
    } else {
      await browser.touchAction([
        { action: 'press', x: 200, y: 600 },
        { action: 'moveTo', x: 200, y: 200 },
        'release',
      ]);
    }
  }

  async scrollUp() {
    if (global.platform === 'web') {
      await browser.execute('window.scrollBy(0, -500)');
    } else {
      await browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'moveTo', x: 200, y: 600 },
        'release',
      ]);
    }
  }

  async pause(ms = 1000) {
    await browser.pause(ms);
  }

  async takeScreenshot(name) {
    const path = require('path');
    const screenshotPath = path.resolve(__dirname, `../reports/screenshots/${name}_${Date.now()}.png`);
    await browser.saveScreenshot(screenshotPath);
    return screenshotPath;
  }

  async goBack() {
    if (global.platform === 'web') {
      await browser.back();
    } else {
      await driver.back();
    }
  }

  async getAlertText() {
    try {
      return await driver.getAlertText();
    } catch {
      return null;
    }
  }

  async acceptAlert() {
    try {
      await driver.acceptAlert();
    } catch {
      // No alert present
    }
  }

  async dismissAlert() {
    try {
      await driver.dismissAlert();
    } catch {
      // No alert present
    }
  }
}

module.exports = BasePage;
