/**
 * Navigation Page — Tab bar and navigation helpers
 */
const BasePage = require('./BasePage');

class NavigationPage extends BasePage {
  // Driver tabs
  get driverHomeTab() { return $('//*[@text="Home"]'); }
  get driverStudentsTab() { return $('//*[@text="Students"]'); }
  get driverProfileTab() { return $('//*[@text="Profile"]'); }

  // Student tabs
  get studentHomeTab() { return $('//*[@text="Home"]'); }
  get studentTrackTab() { return $('//*[@text="Track"]'); }
  get studentHistoryTab() { return $('//*[@text="History"]'); }
  get studentProfileTab() { return $('//*[@text="Profile"]'); }

  // Admin tabs
  get adminHomeTab() { return $('//*[@text="Home"]'); }
  get adminFleetTab() { return $('//*[@text="Fleet"]'); }
  get adminRoutesTab() { return $('//*[@text="Routes"]'); }
  get adminStudentsTab() { return $('//*[@text="Students"]'); }
  get adminMoreTab() { return $('//*[@text="More"]'); }

  // Tab navigation
  async navigateToDriverHome() { await (await this.driverHomeTab).click(); }
  async navigateToDriverStudents() { await (await this.driverStudentsTab).click(); }
  async navigateToDriverProfile() { await (await this.driverProfileTab).click(); }

  async navigateToStudentHome() { await (await this.studentHomeTab).click(); }
  async navigateToStudentTrack() { await (await this.studentTrackTab).click(); }
  async navigateToStudentHistory() { await (await this.studentHistoryTab).click(); }
  async navigateToStudentProfile() { await (await this.studentProfileTab).click(); }

  async isTabBarVisible() {
    try {
      const el = await $('//*[@text="Home"]');
      return await el.isDisplayed();
    } catch { return false; }
  }

  async getActiveTabName() {
    const tabs = ['Home', 'Students', 'Profile', 'Track', 'History', 'Fleet', 'Routes', 'More'];
    for (const tab of tabs) {
      try {
        const el = await $(`//*[@text="${tab}"]`);
        if (await el.isDisplayed()) {
          // Check if it's the active/selected tab
          const parent = await el.$('..');
          const color = await parent.getCSSProperty('color');
          if (color && color.value && color.value.includes('124,143,247')) {
            return tab;
          }
        }
      } catch { /* skip */ }
    }
    return null;
  }
}

module.exports = new NavigationPage();
