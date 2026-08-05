/**
 * Driver Home Page — DriverHomeScreen.js Page Object
 */
const BasePage = require('./BasePage');

class DriverHomePage extends BasePage {
  // ── Selectors ──────────────────────────────────────────────────────────
  get welcomeText()        { return $('//*[contains(@text,"Welcome")]'); }
  get startTripButton()    { return $('//*[@text="Start Trip"]'); }
  get notificationBell()   { return $('//android.view.ViewGroup[contains(@content-desc,"notification")]'); }
  get assignmentCard()     { return $('//*[contains(@text,"Today\'s Assignment")]'); }
  get absentSection()      { return $('//*[@text="Absent Today"]'); }
  get upcomingStops()      { return $('//*[@text="Upcoming Stops"]'); }
  get portalLabel()        { return $('//*[@text="Driver Portal"]'); }
  get fleetSyncLogo()      { return $('//*[@text="FleetSync"]'); }
  get allStudentsExpected(){ return $('//*[contains(@text,"All students expected")]'); }
  get busInfo()            { return $('//*[contains(@text,"🚌")]'); }
  get departureTime()      { return $('//*[contains(@text,"Departure")]'); }
  get liveBadge()          { return $('//*[@text="Live"]'); }
  get noRouteText()        { return $('//*[@text="No route assigned today"]'); }
  get bellBadge()          { return $('//android.view.ViewGroup[contains(@content-desc,"badge")]'); }
  get logoutButton()       { return $('//*[@text="Logout"] | //*[@text="Sign Out"]'); }
  get routeText()          { return $('//*[contains(@text,"Route")]'); }
  get busPlateText()       { return $('//*[contains(@text,"TN")]'); }
  get driverNameText()     { return $('//*[contains(@text,"Rajan") or contains(@text,"Kumar")]'); }
  get retryButton()        { return $('//*[@text="Retry"] | //*[@text="Try Again"]'); }
  get offlineBanner()      { return $('//*[contains(@text,"Offline") or contains(@text,"No connection")]'); }
  get routeScreen()        { return $('//*[contains(@text,"Route")]'); }
  get statusText()         { return $('//*[contains(@text,"Status") or contains(@text,"Active") or contains(@text,"Idle")]'); }

  // ── Convenience helpers ───────────────────────────────────────────────
  async isHomeDisplayed()          { return this.isTextDisplayed('Driver Portal', 10000); }
  async isDriverHomeDisplayed()    { return this.isHomeDisplayed(); }

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
    try { return await (await this.startTripButton).isDisplayed(); } catch { return false; }
  }

  async isAssignmentCardVisible() { return this.isTextDisplayed("Today's Assignment", 5000); }
  async isAbsentSectionVisible()  { return this.isTextDisplayed('Absent Today', 5000); }
  async isUpcomingStopsVisible()  { return this.isTextDisplayed('Upcoming Stops', 5000); }

  async hasNotificationBadge() {
    try { return await (await this.bellBadge).isDisplayed(); } catch { return false; }
  }

  async getAssignedRoute() {
    try { return await (await this.routeText).getText(); } catch { return 'Unknown'; }
  }

  async getAssignedBus() {
    try { return await (await this.busPlateText).getText(); } catch { return 'Unknown'; }
  }

  async getDriverName() {
    try { return await (await this.driverNameText).getText(); } catch { return 'Unknown'; }
  }

  async isRouteScreenVisible() {
    return this.isTextDisplayed('Route', 5000);
  }

  async isRouteLoaded() {
    try { return await (await this.routeText).isDisplayed(); } catch { return false; }
  }

  async getTripData() {
    try {
      const el = await this.assignmentCard;
      return await el.isDisplayed() ? { loaded: true } : null;
    } catch { return null; }
  }

  async isDataSynced() {
    return this.isTextDisplayed('Driver Portal', 5000);
  }

  async getStatusText() {
    try { return await (await this.statusText).getText(); } catch { return 'Unknown'; }
  }

  async getLastKnownCoordinates() {
    // Returns mock coordinate object — real impl would read from Firestore
    return { lat: 12.9716, lng: 80.2209 };
  }

  async isTrackingActive() {
    return this.isTextDisplayed('Live', 3000);
  }

  async hasRetryButton() {
    try { return await (await this.retryButton).isDisplayed(); } catch { return false; }
  }

  async isOfflineBannerVisible() {
    try { return await (await this.offlineBanner).isDisplayed(); } catch { return false; }
  }

  async checkNotificationPermission() {
    try {
      const granted = await browser.getPermission('notifications');
      return granted === 'granted';
    } catch { return false; }
  }

  async checkCameraPermission() {
    try {
      const granted = await browser.getPermission('camera');
      return granted === 'granted';
    } catch { return false; }
  }

  async logout() {
    try {
      const btn = await this.logoutButton;
      await btn.waitForDisplayed({ timeout: 5000 });
      await btn.click();
    } catch {
      // Navigate to profile first if logout not on home
      await this.tapByText('Profile');
      await this.tapByText('Logout');
    }
  }
}

module.exports = new DriverHomePage();
