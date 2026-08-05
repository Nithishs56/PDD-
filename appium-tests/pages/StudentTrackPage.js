/**
 * Student Track Page — StudentTrackScreen.js Page Object
 */
const BasePage = require('./BasePage');

class StudentTrackPage extends BasePage {
  get liveTrackTitle() { return $('//*[@text="Live Track"]'); }
  get refreshButton() { return $('//*[@text="Refresh"]'); }
  get mapView() { return $('//android.view.ViewGroup[contains(@content-desc,"map")]'); } // TODO: confirm selector
  get noTripBanner() { return $('//*[contains(@text,"not started the trip yet")]'); }
  get checkBackHint() { return $('//*[contains(@text,"Check back at")]'); }
  get driverInfoRow() { return $('//*[@text="Driver"]'); }
  get busNumberRow() { return $('//*[@text="Bus Number"]'); }
  get lastUpdatedRow() { return $('//*[@text="Last Updated"]'); }
  get signalIndicator() { return $('//*[@text="Live" or @text="Delayed" or contains(@text,"Last seen")]'); }
  get speedText() { return $('//*[contains(@text,"km/h")]'); }

  async isTrackScreenDisplayed() {
    return this.isTextDisplayed('Live Track', 10000);
  }

  async tapRefresh() {
    const el = await this.refreshButton;
    await el.click();
  }

  async isMapVisible() {
    try {
      const el = await this.mapView;
      return await el.isDisplayed();
    } catch { return false; }
  }

  async isNoTripMessageVisible() {
    return this.isTextDisplayed('not started the trip yet', 5000);
  }

  async getSignalStatus() {
    try {
      const el = await this.signalIndicator;
      return await el.getText();
    } catch { return null; }
  }

  async isLiveSignalActive() {
    return this.isTextDisplayed('Live', 3000);
  }

  async getInfoValue(label) {
    try {
      const labelEl = await $(`//*[@text="${label}"]`);
      const parent = await labelEl.$('..');
      const valueEl = await parent.$('android.widget.TextView[2]');
      return await valueEl.getText();
    } catch { return null; }
  }
}

module.exports = new StudentTrackPage();
