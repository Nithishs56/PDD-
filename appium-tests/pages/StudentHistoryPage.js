const BasePage = require('./BasePage');

class StudentHistoryPage extends BasePage {
  get headerTitle() { return $('//*[@text="Trip History"]'); }
  get headerSub() { return $('//*[contains(@text,"trips recorded")]'); }
  get detailModal() { return $('//*[@text="Trip Details"]'); }
  get premarkedAbsences() { return $('//*[@text="Pre-Marked Absences"]'); }

  async isHistoryDisplayed() {
    return this.isTextDisplayed('Trip History', 10000);
  }

  async getTripCount() {
    try {
      const el = await this.headerSub;
      const text = await el.getText();
      const match = text.match(/(\d+)\s+trips/);
      return match ? parseInt(match[1]) : 0;
    } catch { return 0; }
  }

  async tapTripRow(index = 0) {
    const rows = await $$('//*[@text="Route 1"]');
    if (rows[index]) await rows[index].click();
  }

  async isDetailModalVisible() {
    return this.isTextDisplayed('Trip Details', 5000);
  }

  async isPremarkedAbsencesVisible() {
    return this.isTextDisplayed('Pre-Marked Absences', 5000);
  }

  async getTripHistory() {
    try {
      const rows = await $$('//*[contains(@text,"Route")]');
      return rows; // array of elements
    } catch { return []; }
  }
}

module.exports = new StudentHistoryPage();

