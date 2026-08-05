/**
 * Splash Page — FleetSync splash/loading screen
 */
const BasePage = require('./BasePage');

class SplashPage extends BasePage {
  // Selectors — based on SplashScreen.js analysis
  get brandText() { return $('//*[@text="FleetSync"]'); } // TODO: confirm selector
  get tagline() { return $('//*[@text="Smart Travel for Smart Institutions"]'); } // TODO: confirm selector
  get loadingIndicator() { return $('//android.widget.ProgressBar'); } // TODO: confirm selector

  async isSplashDisplayed() {
    return this.isTextDisplayed('FleetSync', 5000);
  }

  async isTaglineDisplayed() {
    return this.isTextDisplayed('Smart Travel for Smart Institutions', 5000);
  }

  async waitForSplashToComplete(timeout = 5000) {
    // Splash auto-navigates to Login after 2 seconds
    await browser.pause(timeout);
  }

  async isLoadingIndicatorVisible() {
    try {
      const el = await this.loadingIndicator;
      return await el.isDisplayed();
    } catch {
      return false;
    }
  }
}

module.exports = new SplashPage();
