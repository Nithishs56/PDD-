/**
 * Profile Page — DriverProfileScreen.js / StudentProfileScreen.js Page Object
 */
const BasePage = require('./BasePage');

class ProfilePage extends BasePage {
  get logoutButton() { return $('//*[@text="Logout"]'); }
  get nameText() { return $('//android.view.ViewGroup[1]/android.widget.TextView[1]'); } // TODO: confirm selector
  get emailText() { return $('//android.view.ViewGroup[1]/android.widget.TextView[2]'); } // TODO: confirm selector
  get roleBadge() { return $('//*[@text="Driver" or @text="Student"]'); }
  get driverBadge() { return $('//*[@text="Driver"]'); }
  get studentBadge() { return $('//*[@text="Student"]'); }

  // Driver-specific
  get phoneRow() { return $('//*[@text="Phone"]'); }
  get assignedBusRow() { return $('//*[@text="Assigned Bus"]'); }
  get assignedRouteRow() { return $('//*[@text="Assigned Route"]'); }
  get licenseRow() { return $('//*[@text="License No."]'); }
  get institutionRow() { return $('//*[@text="Institution"]'); }

  // Student-specific
  get rollNumberRow() { return $('//*[@text="Roll Number"]'); }
  get collegeRow() { return $('//*[@text="College"]'); }
  get boardingStopRow() { return $('//*[@text="Boarding Stop"]'); }
  get parentPhoneRow() { return $('//*[@text="Parent Phone"]'); }

  async tapLogout() {
    const el = await this.logoutButton;
    await el.click();
  }

  async confirmLogout() {
    await this.tapLogout();
    await this.pause(500);
    // Alert dialog with "Logout" and "Cancel" buttons
    await this.tapByText('Logout');
  }

  async cancelLogout() {
    await this.tapLogout();
    await this.pause(500);
    await this.tapByText('Cancel');
  }

  async isProfileDisplayed() {
    try {
      const el = await this.logoutButton;
      return await el.isDisplayed();
    } catch { return false; }
  }

  async isDriverProfile() {
    return this.isTextDisplayed('Driver', 3000);
  }

  async isStudentProfile() {
    return this.isTextDisplayed('Student', 3000);
  }

  async getProfileName() {
    try {
      const el = await this.nameText;
      return await el.getText();
    } catch { return null; }
  }

  async getInfoRowValue(label) {
    try {
      const labelEl = await $(`//*[@text="${label}"]`);
      const parent = await labelEl.$('..');
      const valueEl = await parent.$('android.widget.TextView[2]');
      return await valueEl.getText();
    } catch { return null; }
  }
}

module.exports = new ProfilePage();
