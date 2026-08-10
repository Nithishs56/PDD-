/**
 * seleniumTestMetadata.js — Generates structured metadata for each Selenium test case
 * Used by generateSeleniumReport.js to populate the Excel columns:
 *   Test ID | Module | Test Case Name | Description | Steps | Expected Result
 *
 * Mirrors the pattern from appium-tests/utils/testMetadata.js
 */

const TEST_TITLES = require('../seleniumTestTitles');

const MODULES = [
  { id: 'login',           label: 'Login / Logout Flow',             count: 30 },
  { id: 'admin-dashboard', label: 'Admin Dashboard',                 count: 30 },
  { id: 'driver-mgmt',     label: 'Driver Management',               count: 25 },
  { id: 'student-mgmt',    label: 'Student Management',              count: 25 },
  { id: 'trip-mgmt',       label: 'Trip Management',                 count: 30 },
  { id: 'live-tracking',   label: 'Live Map / GPS Tracking',         count: 30 },
  { id: 'reports',         label: 'Reports & Analytics',             count: 25 },
  { id: 'notifications',   label: 'Notification Centre',             count: 25 },
  { id: 'settings',        label: 'System Settings',                 count: 20 },
  { id: 'rbac',            label: 'Role-Based Access Control',       count: 25 },
  { id: 'responsive',      label: 'Responsive Design (Mobile Web)',  count: 20 },
  { id: 'cross-browser',   label: 'Cross-Browser Compatibility',     count: 15 },
]; // total = 30+30+25+25+30+30+25+25+20+25+20+15 = 300


/**
 * Derive a short test-case name from the full title.
 * e.g. "Verify login page renders FleetSync logo heading email and password fields on load"
 *   → "Login page renders FleetSync logo heading email and pas..."
 */
function shortName(fullTitle) {
  let t = fullTitle
    .replace(/^Verify\s+/i, '')
    .replace(/^Check\s+/i, '')
    .replace(/^Validate\s+/i, '');

  if (t.length > 60) t = t.substring(0, 57) + '...';
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Build a description from the full title
 */
function buildDescription(fullTitle) {
  return fullTitle;
}

/**
 * Build numbered steps from the title context (web-specific)
 */
function buildSteps(fullTitle, moduleId, idx) {
  const lower = fullTitle.toLowerCase();

  // Login / Auth related
  if (lower.includes('login') && lower.includes('valid') && lower.includes('admin')) {
    return '1. Open browser. 2. Navigate to login URL. 3. Enter admin email. 4. Enter password. 5. Click Login. 6. Verify redirect to admin dashboard';
  }
  if (lower.includes('login') && lower.includes('valid') && lower.includes('driver')) {
    return '1. Open browser. 2. Navigate to login URL. 3. Enter driver email. 4. Enter password. 5. Click Login. 6. Verify redirect to driver portal';
  }
  if (lower.includes('login') && lower.includes('valid') && lower.includes('student')) {
    return '1. Open browser. 2. Navigate to login URL. 3. Enter student email. 4. Enter password. 5. Click Login. 6. Verify redirect to student portal';
  }
  if (lower.includes('login') && (lower.includes('error') || lower.includes('incorrect') || lower.includes('wrong'))) {
    return '1. Open browser. 2. Navigate to login URL. 3. Enter wrong credentials. 4. Click Login. 5. Verify error banner displayed';
  }
  if (lower.includes('empty') && (lower.includes('email') || lower.includes('password') || lower.includes('field'))) {
    return '1. Open browser. 2. Navigate to login URL. 3. Leave field blank. 4. Click Login. 5. Verify validation error';
  }
  if (lower.includes('logout')) {
    return '1. Login with valid credentials. 2. Click user menu. 3. Click Logout. 4. Verify redirect to login page';
  }
  if (lower.includes('sql injection') || lower.includes('xss')) {
    return '1. Open login page. 2. Enter malicious payload in input. 3. Submit form. 4. Verify payload is sanitized';
  }
  if (lower.includes('password') && lower.includes('toggle')) {
    return '1. Open login page. 2. Enter password. 3. Click eye icon. 4. Verify text visibility toggles';
  }
  if (lower.includes('csrf')) {
    return '1. Open login page. 2. Inspect form HTML. 3. Verify hidden CSRF token field exists';
  }

  // Dashboard related
  if (lower.includes('kpi') || lower.includes('stat card')) {
    return '1. Login as admin. 2. Navigate to dashboard. 3. Wait for data load. 4. Verify KPI cards display correct values';
  }
  if (lower.includes('sidebar') && lower.includes('navigat')) {
    return '1. Login as admin. 2. Click sidebar menu item. 3. Verify correct page loads';
  }

  // Driver management
  if (lower.includes('add driver') || lower.includes('create driver')) {
    return '1. Login as admin. 2. Navigate to Drivers page. 3. Click Add Driver. 4. Fill form fields. 5. Click Submit. 6. Verify driver appears in list';
  }
  if (lower.includes('edit') && lower.includes('driver')) {
    return '1. Login as admin. 2. Navigate to Drivers page. 3. Click Edit on driver row. 4. Modify fields. 5. Click Save. 6. Verify changes reflected';
  }
  if (lower.includes('delete') && lower.includes('driver')) {
    return '1. Login as admin. 2. Navigate to Drivers page. 3. Click Delete on driver row. 4. Confirm deletion. 5. Verify driver removed from list';
  }

  // Student management
  if (lower.includes('add student') || lower.includes('create student')) {
    return '1. Login as admin. 2. Navigate to Students page. 3. Click Add Student. 4. Fill form fields. 5. Click Submit. 6. Verify student appears in list';
  }
  if (lower.includes('edit') && lower.includes('student')) {
    return '1. Login as admin. 2. Navigate to Students page. 3. Click Edit on student row. 4. Modify fields. 5. Click Save. 6. Verify changes reflected';
  }
  if (lower.includes('delete') && lower.includes('student')) {
    return '1. Login as admin. 2. Navigate to Students page. 3. Click Delete on student row. 4. Confirm deletion. 5. Verify student removed from list';
  }

  // Trip management
  if (lower.includes('trip') && (lower.includes('start') || lower.includes('create'))) {
    return '1. Login as admin. 2. Navigate to Trip Management. 3. Click Start Trip. 4. Select route and driver. 5. Verify trip appears as Active';
  }
  if (lower.includes('trip') && lower.includes('end')) {
    return '1. Login as admin. 2. Navigate to Trip Management. 3. Find active trip. 4. Click End Trip. 5. Confirm. 6. Verify trip marked Completed';
  }
  if (lower.includes('trip') && lower.includes('detail')) {
    return '1. Login as admin. 2. Navigate to Trip Management. 3. Click View Details on trip. 4. Verify modal shows boarding manifest and map';
  }

  // Map / Tracking
  if (lower.includes('map') && (lower.includes('load') || lower.includes('render'))) {
    return '1. Login as admin. 2. Navigate to Live Tracking. 3. Wait for map to load. 4. Verify Google Maps renders with markers';
  }
  if (lower.includes('bus marker') || lower.includes('marker position')) {
    return '1. Login as admin. 2. Navigate to Live Tracking. 3. Observe bus markers. 4. Verify position updates in real-time';
  }
  if (lower.includes('gps') || lower.includes('signal')) {
    return '1. Login as admin. 2. Navigate to Live Tracking. 3. Check GPS indicator. 4. Verify status reflects data freshness';
  }

  // Reports
  if (lower.includes('chart') || lower.includes('trend') || lower.includes('analytics')) {
    return '1. Login as admin. 2. Navigate to Reports. 3. Select date range. 4. Verify chart renders with data points';
  }
  if (lower.includes('export') && (lower.includes('pdf') || lower.includes('excel') || lower.includes('csv'))) {
    return '1. Login as admin. 2. Navigate to target page. 3. Click Export button. 4. Verify file downloads with correct format';
  }

  // Notification
  if (lower.includes('notification') && lower.includes('click')) {
    return '1. Login as admin. 2. Click notification bell. 3. Click notification item. 4. Verify navigation to detail page';
  }
  if (lower.includes('notification') && (lower.includes('load') || lower.includes('display'))) {
    return '1. Login as admin. 2. Click notification bell. 3. Verify notifications load with title and timestamp';
  }
  if (lower.includes('mark') && lower.includes('read')) {
    return '1. Login as admin. 2. Open notifications. 3. Click Mark All Read. 4. Verify all highlights removed';
  }

  // Settings
  if (lower.includes('settings') && lower.includes('save')) {
    return '1. Login as admin. 2. Navigate to Settings. 3. Modify field value. 4. Click Save Changes. 5. Verify success notification';
  }
  if (lower.includes('password') && lower.includes('change')) {
    return '1. Login as admin. 2. Navigate to Settings. 3. Enter old password. 4. Enter new password. 5. Confirm. 6. Click Save';
  }
  if (lower.includes('delete account')) {
    return '1. Login as admin. 2. Navigate to Settings. 3. Click Delete Account. 4. Verify irreversible warning dialog';
  }

  // RBAC
  if (lower.includes('role') && (lower.includes('cannot') || lower.includes('unauthorized') || lower.includes('denied'))) {
    return '1. Login with restricted role. 2. Navigate to restricted URL directly. 3. Verify access denied or redirect';
  }
  if (lower.includes('jwt') || lower.includes('token')) {
    return '1. Login with valid credentials. 2. Inspect response headers/cookies. 3. Verify JWT token structure';
  }
  if (lower.includes('lockout') || lower.includes('failed login')) {
    return '1. Navigate to login page. 2. Enter wrong credentials 5 times. 3. Verify account lockout message';
  }

  // Responsive
  if (lower.includes('mobile') && lower.includes('viewport')) {
    return '1. Open browser. 2. Set viewport to mobile size. 3. Navigate to page. 4. Verify layout adapts correctly';
  }
  if (lower.includes('tablet')) {
    return '1. Open browser. 2. Set viewport to 768x1024. 3. Navigate to page. 4. Verify layout adapts correctly';
  }
  if (lower.includes('hamburger') || lower.includes('sidebar') && lower.includes('collapse')) {
    return '1. Open browser at mobile viewport. 2. Verify sidebar collapses to hamburger. 3. Click hamburger. 4. Verify menu opens';
  }

  // Cross-browser
  if (lower.includes('chrome') || lower.includes('firefox') || lower.includes('edge') || lower.includes('safari')) {
    return '1. Launch target browser. 2. Navigate to page URL. 3. Verify page renders without visual errors. 4. Check console for JS errors';
  }

  // Search / Filter
  if (lower.includes('search') || lower.includes('filter')) {
    return '1. Login as admin. 2. Navigate to target page. 3. Enter search term. 4. Verify results filter in real-time';
  }

  // Pagination
  if (lower.includes('pagination') || lower.includes('next') || lower.includes('previous')) {
    return '1. Login as admin. 2. Navigate to target list page. 3. Click Next page. 4. Verify new data loads';
  }

  // Sort
  if (lower.includes('sort')) {
    return '1. Login as admin. 2. Navigate to target list page. 3. Click column header. 4. Verify rows reorder correctly';
  }

  // Empty state
  if (lower.includes('empty state') || lower.includes('no ') && lower.includes('found')) {
    return '1. Login as admin. 2. Navigate to target page. 3. Verify empty state message and illustration displayed';
  }

  // Performance
  if (lower.includes('load') && (lower.includes('second') || lower.includes('within') || lower.includes('under'))) {
    return '1. Open browser. 2. Navigate to target page. 3. Measure load time. 4. Verify under threshold';
  }

  // Default
  return '1. Open browser. 2. Navigate to target page. 3. Perform test action. 4. Verify expected behavior';
}

/**
 * Build expected result from the title (web-specific)
 */
function buildExpectedResult(fullTitle, moduleId) {
  const lower = fullTitle.toLowerCase();

  if (lower.includes('renders') || lower.includes('display') || lower.includes('shows') || lower.includes('visible'))
    return 'Element displays correctly on page';
  if (lower.includes('redirect') || lower.includes('navigat'))
    return 'Browser redirects to the correct page';
  if (lower.includes('error') || lower.includes('validation') || lower.includes('reject') || lower.includes('denied'))
    return 'Shows appropriate error/validation message';
  if (lower.includes('logout') || lower.includes('sign out') || lower.includes('clears session'))
    return 'Clears session and redirects to login page';
  if (lower.includes('persist') || lower.includes('retain') || lower.includes('remember'))
    return 'State/data is persisted correctly across sessions';
  if (lower.includes('toggle') || lower.includes('switch'))
    return 'UI state toggles as expected';
  if (lower.includes('sanitiz') || lower.includes('handled') || lower.includes('without crash'))
    return 'Input is sanitized without breaking functionality';
  if (lower.includes('load') && (lower.includes('second') || lower.includes('within') || lower.includes('under')))
    return 'Page loads within acceptable time threshold';
  if (lower.includes('export') || lower.includes('download'))
    return 'File downloads with correct format and content';
  if (lower.includes('save') || lower.includes('submit') || lower.includes('creation') || lower.includes('created'))
    return 'Data is saved/created successfully with confirmation';
  if (lower.includes('delete') || lower.includes('remov'))
    return 'Record is deleted and removed from the list';
  if (lower.includes('filter') || lower.includes('search'))
    return 'Results filter/search correctly in real-time';
  if (lower.includes('sort'))
    return 'Data reorders correctly by selected column';
  if (lower.includes('pagination') || lower.includes('next page'))
    return 'Pagination loads correct data set';
  if (lower.includes('update') || lower.includes('refresh') || lower.includes('real-time'))
    return 'Content updates in real-time without page refresh';
  if (lower.includes('responsive') || lower.includes('viewport') || lower.includes('mobile') || lower.includes('adapt'))
    return 'Layout adapts correctly to target viewport size';
  if (lower.includes('chart') || lower.includes('graph') || lower.includes('bar'))
    return 'Chart renders with correct data visualization';
  if (lower.includes('permission') || lower.includes('role') || lower.includes('access'))
    return 'Access control enforced correctly based on role';
  if (lower.includes('token') || lower.includes('jwt') || lower.includes('session'))
    return 'Authentication token/session is handled correctly';
  if (lower.includes('mark') && lower.includes('read'))
    return 'All notifications marked as read with indicators cleared';
  if (lower.includes('modal') || lower.includes('dialog'))
    return 'Modal/dialog opens with correct content and is dismissable';
  if (lower.includes('css') || lower.includes('style') || lower.includes('color'))
    return 'Styles render consistently across target environments';
  if (lower.includes('empty'))
    return 'Empty state message displays with appropriate illustration';

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
        tcId: `WEB_TC_${idx.toString().padStart(3, '0')}`,
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
