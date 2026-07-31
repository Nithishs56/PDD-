/**
 * Driver OTP Page — DriverOTPScreen.js Page Object
 */
const BasePage = require('./BasePage');

class DriverOTPPage extends BasePage {
  get otpDigits() { return $$('//android.widget.TextView[string-length(@text)=1]'); } // TODO: confirm selector
  get otpLabel() { return $('//*[@text="Show this OTP to students for boarding"]'); }
  get refreshOTPButton() { return $('//*[@text="Refresh OTP"]'); }
  get endTripButton() { return $('//*[@text="End Trip"]'); }
  get countdownText() { return $('//*[contains(@text,"Refreshes in")]'); }
  get tripActiveBanner() { return $('//*[contains(@text,"Trip Active")]'); }
  get boardedCount() { return $('//*[@text="Students Boarded"]'); }
  get recentBoardings() { return $('//*[@text="Recent Boardings"]'); }
  get noBoardingsText() { return $('//*[contains(@text,"No boardings yet")]'); }
  get gpsWarningBanner() { return $('//*[contains(@text,"⚠")]'); }
  get mapView() { return $('//android.view.ViewGroup[contains(@content-desc,"map")]'); } // TODO: confirm selector

  async isOTPScreenDisplayed() {
    return this.isTextDisplayed('Trip Active', 10000);
  }

  async getOTPDigits() {
    try {
      const digits = await this.otpDigits;
      const texts = [];
      for (const d of digits) {
        texts.push(await d.getText());
      }
      return texts.join('');
    } catch { return ''; }
  }

  async tapRefreshOTP() {
    const el = await this.refreshOTPButton;
    await el.click();
  }

  async tapEndTrip() {
    const el = await this.endTripButton;
    await el.click();
  }

  async confirmEndTrip() {
    await this.tapEndTrip();
    await this.pause(500);
    await this.tapByText('End Trip'); // Alert confirmation
  }

  async cancelEndTrip() {
    await this.tapEndTrip();
    await this.pause(500);
    await this.tapByText('Cancel');
  }

  async getCountdownText() {
    const el = await this.countdownText;
    return el.getText();
  }

  async isBannerDisplayed() {
    return this.isTextDisplayed('Trip Active', 5000);
  }

  async isGPSWarningVisible() {
    try {
      const el = await this.gpsWarningBanner;
      return await el.isDisplayed();
    } catch { return false; }
  }

  async getBoardedStudentCount() {
    try {
      const el = await this.boardedCount;
      const parent = await el.$('..');
      const countEl = await parent.$('//android.widget.TextView[1]');
      return parseInt(await countEl.getText()) || 0;
    } catch { return 0; }
  }
}

module.exports = new DriverOTPPage();
