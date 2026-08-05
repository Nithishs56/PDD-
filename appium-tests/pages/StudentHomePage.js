/**
 * Student Home Page — StudentHomeScreen.js Page Object
 */
const BasePage = require('./BasePage');

class StudentHomePage extends BasePage {
  get welcomeText() { return $('//*[contains(@text,"Good Morning")]'); }
  get boardBusButton() { return $('//*[@text="Board Bus"]'); }
  get markAbsentButton() { return $('//*[@text="Mark Absent Today"]'); }
  get busInfoCard() { return $('//*[@text="Today Bus Info"]'); }
  get notificationBell() { return $('//android.view.ViewGroup[contains(@content-desc,"notification")]'); } // TODO: confirm selector
  get portalLabel() { return $('//*[@text="Student Portal"]'); }
  get liveIndicator() { return $('//*[@text="Live"]'); }
  get offlineIndicator() { return $('//*[@text="Offline"]'); }
  get busApproachBanner() { return $('//*[contains(@text,"bus is 10 mins away")]'); }
  get boardedBanner() { return $('//*[contains(@text,"successfully boarded")]'); }
  get absentBanner() { return $('//*[contains(@text,"marked yourself absent")]'); }
  get undoAbsenceButton() { return $('//*[@text="Undo Absence"]'); }
  get confirmAbsentButton() { return $('//*[@text="Confirm Absent"]'); }
  get cancelAbsentButton() { return $('//*[@text="Cancel"]'); }
  get absentModalTitle() { return $('//*[@text="Are you sure?"]'); }
  get mapView() { return $('//android.view.ViewGroup[contains(@content-desc,"map")]'); } // TODO: confirm selector
  get waitingForDriver() { return $('//*[@text="Waiting for driver to start"]'); }

  async isStudentHomeDisplayed() { return this.isTextDisplayed('Student Portal', 10000); }
  async isHomeDisplayed()        { return this.isStudentHomeDisplayed(); }
  async isTrackTabVisible()      { return this.isTextDisplayed('Track', 5000); }

  async getWelcomeMessage() {
    const el = await this.welcomeText;
    return el.getText();
  }

  async tapBoardBus() {
    const el = await this.boardBusButton;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.click();
  }

  async tapMarkAbsent() {
    const el = await this.markAbsentButton;
    await el.click();
  }

  async confirmAbsent() {
    await this.tapMarkAbsent();
    await this.pause(500);
    const confirm = await this.confirmAbsentButton;
    await confirm.click();
  }

  async cancelAbsent() {
    await this.tapMarkAbsent();
    await this.pause(500);
    const cancel = await this.cancelAbsentButton;
    await cancel.click();
  }

  async tapUndoAbsence() {
    const el = await this.undoAbsenceButton;
    await el.click();
  }

  async tapNotificationBell() {
    const el = await this.notificationBell;
    await el.click();
  }

  async isBoardBusVisible() {
    try {
      const el = await this.boardBusButton;
      return await el.isDisplayed();
    } catch { return false; }
  }

  async isMarkAbsentVisible() {
    try {
      const el = await this.markAbsentButton;
      return await el.isDisplayed();
    } catch { return false; }
  }

  async isBoardedBannerVisible() {
    return this.isTextDisplayed('successfully boarded', 5000);
  }

  async isAbsentBannerVisible() {
    return this.isTextDisplayed('marked yourself absent', 5000);
  }

  async isLiveIndicatorVisible() {
    return this.isTextDisplayed('Live', 3000);
  }

  async isAbsentModalDisplayed() {
    return this.isTextDisplayed('Are you sure?', 3000);
  }

  async getAssignedBusNo() {
    try { return await (await $('//*[contains(@text,"TN")]')).getText(); } catch { return 'N/A'; }
  }

  async getAssignedStop() {
    try { return await (await $('//*[contains(@text,"Tambaram") or contains(@text,"Stop")]')).getText(); } catch { return 'Unknown'; }
  }

  async isMapVisible() {
    try { return await (await this.mapView).isDisplayed(); } catch { return false; }
  }

  async getBusETA() {
    try { return await (await $('//*[contains(@text,"min") or contains(@text,"ETA")]')).getText(); } catch { return 'N/A'; }
  }

  async getDistanceToBus() {
    try { return await (await $('//*[contains(@text,"km") or contains(@text,"m away")]')).getText(); } catch { return 'N/A'; }
  }

  async getNotificationCount() {
    try {
      const el = await $('//*[contains(@text,"notif") or contains(@text,"alert")]');
      return parseInt(await el.getText(), 10) || 0;
    } catch { return 0; }
  }

  async clearNotifications() {
    try { await this.tapByText('Clear All'); } catch { /* no-op */ }
  }

  async isBusDataLoaded() {
    return this.isTextDisplayed('Today Bus Info', 5000);
  }

  async isDataSynced() {
    return this.isTextDisplayed('Student Portal', 5000);
  }
}

module.exports = new StudentHomePage();
