/**
 * Driver Home Page — DriverHomeScreen.js Page Object
 */
const BasePage = require('./BasePage');

class DriverHomePage extends BasePage {
  get welcomeText() { return $('//*[contains(@text,"Welcome")]'); }
  get startTripButton() { return $('//*[@text="Start Trip"]'); }
  get notificationBell() { return $('//android.view.ViewGroup[contains(@content-desc,"notification")]'); } // TODO: confirm selector
  get assignmentCard() { return $('//*[contains(@text,"Today\'s Assignment")]'); }
  get absentSection() { return $('//*[@text="Absent Today"]'); }
  get upcomingStops() { return $('//*[@text="Upcoming Stops"]'); }
  get portalLabel() { return $('//*[@text="Driver Portal"]'); }
  get fleetSyncLogo() { return $('//*[@text="FleetSync"]'); }
  get allStudentsExpected() { return $('//*[contains(@text,"All students expected")]'); }
  get busInfo() { return $('//*[contains(@text,"🚌")]'); }
  get departureTime() { return $('//*[contains(@text,"Departure")]'); }
  get liveBadge() { return $('//*[@text="Live"]'); }
  get noRouteText() { return $('//*[@text="No route assigned today"]'); }
  get bellBadge() { return $('//android.view.ViewGroup[contains(@content-desc,"badge")]'); } // TODO: confirm selector

  async isDriverHomeDisplayed() {
    return this.isTextDisplayed('Driver Portal', 10000);
  }

  async getWelcomeMessage() {
    const el = await this.welcomeText;
    return el.getText();
  }

  async tapStartTrip() {
    const el = await this.startTripButton;
    await el.waitForDisplayed({ timeout: 10000 });
    await el.click();
  }

  async tapNotificationBell() {
    const el = await this.notificationBell;
    await el.click();
  }

  async isStartTripVisible() {
    try {
      const el = await this.startTripButton;
      return await el.isDisplayed();
    } catch { return false; }
  }

  async isAssignmentCardVisible() {
    return this.isTextDisplayed("Today's Assignment", 5000);
  }

  async isAbsentSectionVisible() {
    return this.isTextDisplayed('Absent Today', 5000);
  }

  async isUpcomingStopsVisible() {
    return this.isTextDisplayed('Upcoming Stops', 5000);
  }

  async hasNotificationBadge() {
    try {
      const el = await this.bellBadge;
      return await el.isDisplayed();
    } catch { return false; }
  }
}

module.exports = new DriverHomePage();
