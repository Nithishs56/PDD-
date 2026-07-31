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

  async isStudentHomeDisplayed() {
    return this.isTextDisplayed('Student Portal', 10000);
  }

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
}

module.exports = new StudentHomePage();
