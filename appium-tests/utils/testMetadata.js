/**
 * testMetadata.js — Generates structured metadata for each test case
 * Used by generateExcelReport.js to populate the Excel columns:
 *   Test ID | Module | Test Case Name | Description | Steps | Expected Result
 */

const TEST_TITLES = require('../testTitles');

const MODULES = [
  { id: 'auth',            label: 'Auth',           count: 25 },
  { id: 'onboarding',      label: 'Onboarding',     count: 10 },
  { id: 'navigation',      label: 'Navigation',     count: 25 },
  { id: 'forms',           label: 'Forms',          count: 30 },
  { id: 'fleet',           label: 'Fleet',          count: 35 },
  { id: 'gps-tracking',    label: 'GPS',            count: 25 },
  { id: 'notifications',   label: 'Notifications',  count: 15 },
  { id: 'offline',         label: 'Offline',        count: 20 },
  { id: 'api-integration', label: 'API',            count: 25 },
  { id: 'data-sync',       label: 'Data Sync',      count: 15 },
  { id: 'permissions',     label: 'Permissions',    count: 15 },
  { id: 'cross-platform',  label: 'Cross-Platform', count: 20 },
  { id: 'performance',     label: 'Performance',    count: 10 },
  { id: 'accessibility',   label: 'Accessibility',  count: 10 },
  { id: 'security',        label: 'Security',       count: 10 },
  { id: 'edge-cases',      label: 'Edge Cases',     count: 10 },
];

/**
 * Derive a short test-case name from the full title.
 * e.g. "Verify successful login with valid driver credentials navigates to Driver Home"
 *   → "Driver Login - Valid"
 */
function shortName(fullTitle) {
  // Remove leading "Verify " / "Check " etc.
  let t = fullTitle
    .replace(/^Verify\s+/i, '')
    .replace(/^Check\s+/i, '')
    .replace(/^Validate\s+/i, '');

  // Truncate to first 60 chars and clean up
  if (t.length > 60) t = t.substring(0, 57) + '...';
  // Capitalize first letter
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Build a description from the full title
 */
function buildDescription(fullTitle) {
  return fullTitle;
}

/**
 * Build numbered steps from the title context
 */
function buildSteps(fullTitle, moduleId, idx) {
  const lower = fullTitle.toLowerCase();

  // Login-related
  if (lower.includes('login') && lower.includes('valid') && lower.includes('driver')) {
    return '1. Open app. 2. Enter driver email. 3. Enter password. 4. Click Login';
  }
  if (lower.includes('login') && lower.includes('valid') && lower.includes('student')) {
    return '1. Open app. 2. Enter student email. 3. Enter password. 4. Click Login';
  }
  if (lower.includes('login') && (lower.includes('invalid') || lower.includes('incorrect') || lower.includes('wrong'))) {
    return '1. Open app. 2. Enter wrong credentials. 3. Click Login';
  }
  if (lower.includes('empty') && (lower.includes('email') || lower.includes('password') || lower.includes('field'))) {
    return '1. Open app. 2. Leave field blank. 3. Click Login';
  }
  if (lower.includes('logout')) {
    return '1. Login with valid credentials. 2. Navigate to Profile. 3. Click Logout. 4. Confirm';
  }
  if (lower.includes('splash') || lower.includes('onboarding')) {
    return '1. Launch app. 2. Observe splash screen';
  }
  if (lower.includes('toggle') && lower.includes('password')) {
    return '1. Open login screen. 2. Enter password. 3. Click eye icon';
  }
  if (lower.includes('sql injection') || lower.includes('xss')) {
    return '1. Open login screen. 2. Enter malicious input. 3. Click Login';
  }
  if (lower.includes('otp') && lower.includes('student')) {
    return '1. Login as student. 2. Tap Board Bus. 3. Enter OTP. 4. Verify';
  }
  if (lower.includes('otp') && lower.includes('driver')) {
    return '1. Login as driver. 2. Start trip. 3. View OTP screen';
  }
  if (lower.includes('tab') || lower.includes('navigation') || lower.includes('navigate')) {
    return '1. Login successfully. 2. Tap target tab. 3. Verify screen displayed';
  }
  if (lower.includes('map') || lower.includes('track') || lower.includes('gps')) {
    return '1. Login. 2. Navigate to Track screen. 3. Observe map/GPS data';
  }
  if (lower.includes('notification')) {
    return '1. Login. 2. Check notification bell. 3. Verify notification content';
  }
  if (lower.includes('offline') || lower.includes('network')) {
    return '1. Disable network. 2. Perform action. 3. Verify graceful handling';
  }
  if (lower.includes('form') || lower.includes('input') || lower.includes('field')) {
    return '1. Navigate to form. 2. Enter test data. 3. Submit. 4. Verify result';
  }
  if (lower.includes('firestore') || lower.includes('firebase') || lower.includes('api')) {
    return '1. Login. 2. Trigger data load. 3. Verify data from backend';
  }
  if (lower.includes('permission')) {
    return '1. Launch app. 2. Trigger permission request. 3. Verify prompt/handling';
  }
  if (lower.includes('performance') || lower.includes('load') || lower.includes('speed')) {
    return '1. Launch app. 2. Perform action. 3. Measure response time';
  }
  if (lower.includes('accessibility') || lower.includes('screen reader')) {
    return '1. Enable accessibility. 2. Navigate to element. 3. Verify label/hint';
  }
  if (lower.includes('admin')) {
    return '1. Login as admin. 2. Navigate to target screen. 3. Verify content';
  }
  if (lower.includes('driver')) {
    return '1. Login as driver. 2. Navigate to target screen. 3. Verify content';
  }
  if (lower.includes('student')) {
    return '1. Login as student. 2. Navigate to target screen. 3. Verify content';
  }
  // Default
  return `1. Open app. 2. Perform test action. 3. Verify expected behavior`;
}

/**
 * Build expected result from the title
 */
function buildExpectedResult(fullTitle, moduleId) {
  const lower = fullTitle.toLowerCase();

  if (lower.includes('display') || lower.includes('shown') || lower.includes('visible') || lower.includes('renders'))
    return 'Element displays correctly on screen';
  if (lower.includes('navigates to') || lower.includes('navigate'))
    return 'Redirects to the correct screen';
  if (lower.includes('error') || lower.includes('reject') || lower.includes('block'))
    return 'Shows appropriate error/validation message';
  if (lower.includes('logout') || lower.includes('sign out'))
    return 'Clears session and returns to Login screen';
  if (lower.includes('persist') || lower.includes('restore'))
    return 'Session/state is preserved correctly';
  if (lower.includes('toggle') || lower.includes('switch'))
    return 'UI state toggles as expected';
  if (lower.includes('handled') || lower.includes('graceful') || lower.includes('without crash'))
    return 'App handles input gracefully without crash';
  if (lower.includes('load') || lower.includes('fetch') || lower.includes('sync'))
    return 'Data loads/syncs successfully from backend';
  if (lower.includes('update') || lower.includes('refresh'))
    return 'Content updates in real-time without page refresh';
  if (lower.includes('animation') || lower.includes('transition'))
    return 'Animation/transition plays smoothly';
  if (lower.includes('permission'))
    return 'Permission prompt/handling works correctly';
  if (lower.includes('performance') || lower.includes('within') || lower.includes('under'))
    return 'Operation completes within acceptable time threshold';
  if (lower.includes('accessible') || lower.includes('accessibility'))
    return 'Element is accessible to assistive technologies';
  if (lower.includes('write') || lower.includes('create') || lower.includes('save'))
    return 'Data is written/saved correctly to the backend';
  if (lower.includes('clear') || lower.includes('reset') || lower.includes('dismiss'))
    return 'State/content is cleared/reset correctly';
  // Default
  return 'Test passes with expected behavior verified';
}

/**
 * Generate all 300 test case metadata rows
 * Returns array of { tcId, module, testCaseName, description, steps, expectedResult }
 */
function generateAllMetadata() {
  const rows = [];
  let idx = 0;

  for (const mod of MODULES) {
    const titles = TEST_TITLES[mod.id] || [];
    for (let i = 0; i < mod.count; i++) {
      idx++;
      const fullTitle = titles[i % titles.length] || `${mod.label} scenario ${i + 1}`;
      rows.push({
        tcId: `TC-${idx.toString().padStart(3, '0')}`,
        module: mod.label,
        testCaseName: shortName(fullTitle),
        description: buildDescription(fullTitle),
        steps: buildSteps(fullTitle, mod.id, i),
        expectedResult: buildExpectedResult(fullTitle, mod.id),
      });
    }
  }

  return rows;
}

module.exports = { generateAllMetadata, MODULES };
