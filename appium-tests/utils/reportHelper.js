/**
 * Report Helper - formats Appium output for Excel generation
 */
const fs = require('fs');
const path = require('path');

function getLatestResults() {
  const reportsDir = path.resolve(__dirname, '../reports');
  const resultsPath = path.join(reportsDir, 'test-results.json');
  
  if (!fs.existsSync(resultsPath)) {
    console.error('No test results found at:', resultsPath);
    return null;
  }
  
  try {
    return JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  } catch (e) {
    console.error('Error parsing test results:', e);
    return null;
  }
}

function parseResults(wdioJson) {
  if (!wdioJson || !wdioJson.suites) return [];
  
  const formattedResults = [];
  
  wdioJson.suites.forEach(suite => {
    suite.tests.forEach(test => {
      formattedResults.push({
        title: test.name,
        suite: suite.name,
        status: test.state, // passed, failed, skipped
        duration: test.duration,
        error: test.error ? test.error.message : '',
        platform: global.platform || 'unknown'
      });
    });
  });
  
  return formattedResults;
}

module.exports = {
  getLatestResults,
  parseResults
};
