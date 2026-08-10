import { auth, db, rtdb } from './firebase.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';
import { driverAccounts, studentAccounts, routes, routeStudents } from './dummyData.js';

const appEl = document.getElementById('app');
let currentUserState = null;

// Initialize app session
function initApp() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          currentUserState = { ...data, uid: user.uid };
          navigateRoleView(currentUserState);
          return;
        }
      } catch (err) {
        console.warn('Firestore fetch failed, using state if available:', err);
      }
    }
    
    if (!currentUserState) {
      renderLogin();
    }
  });
}

function navigateRoleView(user) {
  if (user.role === 'driver') {
    renderDriverView(user);
  } else if (user.role === 'student') {
    renderStudentView(user);
  } else {
    renderLogin('Admin accounts must use the Admin Console.');
  }
}

// ── 1. LOGIN VIEW ─────────────────────────────────────────────────────────────
function renderLogin(errorMessage = '') {
  appEl.innerHTML = `
    <div class="login-wrapper animate-fade">
      <div class="login-card">
        <div class="login-header">
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.75rem;">
            <div class="brand-icon">🚌</div>
            <span style="font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 700; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">FleetSync</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Student & Driver Web Portal</p>
        </div>

        <div class="notice-banner">
          <span>ℹ️</span>
          <div>
            <strong>Institution Credential Login</strong><br />
            Accounts are provisioned by your institution administrator. Use your assigned credentials to sign in.
          </div>
        </div>

        <div id="login-error" class="error-msg" style="display: ${errorMessage ? 'block' : 'none'};">
          ${errorMessage}
        </div>

        <form id="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" class="input-field" placeholder="e.g. rajan@cit.edu or ravi@cit.edu" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="input-field" placeholder="Enter your password" required />
          </div>

          <button type="submit" id="btn-submit" class="btn-primary">
            Sign In to Portal
          </button>
        </form>

        <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color); text-align: center;">
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">Quick Demo Sign In:</p>
          <div style="display: flex; gap: 0.75rem; justify-content: center;">
            <button type="button" id="demo-driver" style="background: rgba(124, 143, 247, 0.15); color: var(--accent); border: 1px solid rgba(124, 143, 247, 0.3); padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer; font-weight: 600;">
              Driver Portal Demo
            </button>
            <button type="button" id="demo-student" style="background: rgba(52, 211, 153, 0.15); color: var(--success); border: 1px solid rgba(52, 211, 153, 0.3); padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; cursor: pointer; font-weight: 600;">
              Student Portal Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const form = document.getElementById('login-form');
  const btnSubmit = document.getElementById('btn-submit');
  const errEl = document.getElementById('login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Authenticating...';
    errEl.style.display = 'none';

    try {
      // 1. Try Firebase Authentication
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
      
      if (userDoc.exists()) {
        currentUserState = { ...userDoc.data(), uid: userCred.user.uid };
        navigateRoleView(currentUserState);
        return;
      }
    } catch (authErr) {
      console.log('Firebase auth failed, checking fallback dataset...', authErr);
    }

    // 2. Fallback check for demo accounts
    const driverMatch = driverAccounts.find(d => d.email.toLowerCase() === email.toLowerCase());
    if (driverMatch && (password === driverMatch.password || password === 'driver123')) {
      currentUserState = driverMatch;
      renderDriverView(driverMatch);
      return;
    }

    const studentMatch = studentAccounts.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (studentMatch && (password === studentMatch.password || password === 'student123')) {
      currentUserState = studentMatch;
      renderStudentView(studentMatch);
      return;
    }

    // Invalid credentials
    errEl.innerText = 'Invalid email or password. Please check your credentials.';
    errEl.style.display = 'block';
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'Sign In to Portal';
  });

  // Demo Quick Login
  document.getElementById('demo-driver').addEventListener('click', () => {
    document.getElementById('email').value = 'rajan@cit.edu';
    document.getElementById('password').value = 'driver123';
    form.dispatchEvent(new Event('submit'));
  });

  document.getElementById('demo-student').addEventListener('click', () => {
    document.getElementById('email').value = 'ravi@cit.edu';
    document.getElementById('password').value = 'student123';
    form.dispatchEvent(new Event('submit'));
  });
}

// ── 2. DRIVER VIEW ────────────────────────────────────────────────────────────
function renderDriverView(user) {
  const assignedRoute = routes.find(r => r.name === (user.route || 'Route 1')) || routes[0];
  const studentsList = routeStudents[assignedRoute.name] || routeStudents['Route 1'];

  appEl.innerHTML = `
    <header class="navbar">
      <div class="nav-brand">
        <div class="brand-icon">🚌</div>
        FleetSync
      </div>
      <div class="user-badge">
        <div class="user-info">
          <div class="user-name">${user.name || 'Driver'}</div>
          <div class="user-role">Driver Portal</div>
        </div>
        <button id="btn-logout" class="btn-logout">Logout</button>
      </div>
    </header>

    <div class="dashboard-container animate-fade">
      <div class="dashboard-header">
        <h2>Driver Console</h2>
        <p>Manage your active trip, view assigned bus route, and monitor student boarding.</p>
      </div>

      <div class="grid-layout">
        <!-- Assigned Vehicle & Route Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🚍 Assigned Bus & Route</span>
            <span class="status-tag status-live">ACTIVE TRIP</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Driver Name</span>
              <span class="info-value">${user.name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Bus Number</span>
              <span class="info-value">${user.bus || assignedRoute.bus}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Route</span>
              <span class="info-value">${assignedRoute.name} — ${assignedRoute.label}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Institution</span>
              <span class="info-value">${user.institution || 'Chennai Institute of Technology'}</span>
            </div>
          </div>
        </div>

        <!-- Trip Status Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">📊 Trip Progress</span>
            <span style="font-size: 0.85rem; color: var(--accent); font-weight: 600;">Live OTP: 4892</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Departure Time</span>
              <span class="info-value">07:00 AM</span>
            </div>
            <div class="info-item">
              <span class="info-label">Boarded Students</span>
              <span class="info-value" style="color: var(--success);">
                ${studentsList.filter(s => s.status === 'boarded').length} / ${studentsList.length}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">GPS Location Status</span>
              <span class="info-value" style="color: var(--success); display: flex; align-items: center; gap: 0.4rem;">
                <span style="width: 8px; height: 8px; background: var(--success); border-radius: 50%;"></span> Transmitting
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Route Timeline & Student Manifest -->
      <div class="grid-layout" style="margin-top: 1.5rem;">
        <!-- Route Stops Timeline -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">📍 Route Timeline</span>
          </div>
          <div class="timeline">
            ${assignedRoute.stops.map((stop, idx) => `
              <div class="timeline-step ${idx <= 1 ? 'active' : ''}">
                <div class="step-title">${stop.name}</div>
                <div class="step-sub">${stop.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Student Boarding Manifest -->
        <div class="card" style="grid-column: span 2;">
          <div class="card-header">
            <span class="card-title">👥 Student Boarding Manifest</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${studentsList.length} Assigned Students</span>
          </div>
          <div style="overflow-x: auto;">
            <table class="student-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Boarding Stop</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${studentsList.map(student => `
                  <tr>
                    <td style="font-weight: 600;">${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.stop}</td>
                    <td>
                      <span class="badge badge-${student.status === 'boarded' ? 'boarded' : student.status === 'absent' ? 'absent' : 'pending'}">
                        ${student.status === 'boarded' ? '✓ Boarded' : student.status === 'absent' ? '✕ Absent' : '⏳ Pending'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <footer>
      FleetSync Student & Driver Portal &copy; ${new Date().getFullYear()} — Powered by Institution Fleet Management
    </footer>
  `;

  document.getElementById('btn-logout').addEventListener('click', handleLogout);
}

// ── 3. STUDENT VIEW ───────────────────────────────────────────────────────────
function renderStudentView(user) {
  const assignedRoute = routes.find(r => r.name === (user.route || 'Route 1')) || routes[0];

  appEl.innerHTML = `
    <header class="navbar">
      <div class="nav-brand">
        <div class="brand-icon">🚌</div>
        FleetSync
      </div>
      <div class="user-badge">
        <div class="user-info">
          <div class="user-name">${user.name || 'Student'}</div>
          <div class="user-role">Student Portal</div>
        </div>
        <button id="btn-logout" class="btn-logout">Logout</button>
      </div>
    </header>

    <div class="dashboard-container animate-fade">
      <div class="dashboard-header">
        <h2>Student Dashboard</h2>
        <p>Track your assigned institution bus, view schedule, and check boarding status.</p>
      </div>

      <div class="grid-layout">
        <!-- Student Info Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🎓 Student Profile</span>
            <span class="badge badge-boarded">ENROLLED</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Name</span>
              <span class="info-value">${user.name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Roll Number</span>
              <span class="info-value">${user.roll || 'CIT-2023-CS08'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Boarding Stop</span>
              <span class="info-value" style="color: var(--accent); font-weight: 700;">${user.stop || 'Tambaram'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Institution</span>
              <span class="info-value">${user.institution || 'Chennai Institute of Technology'}</span>
            </div>
          </div>
        </div>

        <!-- Bus & Live Tracking Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🚍 Today's Bus Info</span>
            <span class="status-tag status-live">LIVE TRACKING</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Assigned Route</span>
              <span class="info-value">${assignedRoute.name} — ${assignedRoute.label}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Bus Number</span>
              <span class="info-value">${assignedRoute.bus}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Driver</span>
              <span class="info-value">${assignedRoute.driver}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Estimated Pickup</span>
              <span class="info-value" style="color: var(--success); font-weight: 700;">07:15 AM (On Time)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Route Map / Timeline -->
      <div class="grid-layout" style="margin-top: 1.5rem;">
        <div class="card" style="grid-column: span 2;">
          <div class="card-header">
            <span class="card-title">📍 Route Map & Schedule</span>
            <span style="font-size: 0.85rem; color: var(--accent); font-weight: 600;">Your Stop: ${user.stop || 'Tambaram'}</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${assignedRoute.stops.map((stop, idx) => `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid ${stop.name === (user.stop || 'Tambaram') ? 'var(--accent)' : 'var(--border-color)'}; padding: 1rem; border-radius: var(--radius-md); position: relative;">
                ${stop.name === (user.stop || 'Tambaram') ? '<span style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent); color: white; font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 700;">YOUR STOP</span>' : ''}
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.2rem;">Stop ${idx + 1}</div>
                <div style="font-size: 1rem; font-weight: 700; color: var(--text-main);">${stop.name}</div>
                <div style="font-size: 0.85rem; color: var(--accent); margin-top: 0.4rem; font-weight: 600;">${stop.time}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <footer>
      FleetSync Student & Driver Portal &copy; ${new Date().getFullYear()} — Powered by Institution Fleet Management
    </footer>
  `;

  document.getElementById('btn-logout').addEventListener('click', handleLogout);
}

// ── LOGOUT ────────────────────────────────────────────────────────────────────
async function handleLogout() {
  try {
    await signOut(auth);
  } catch (err) {
    console.log('Signout error:', err);
  }
  currentUserState = null;
  renderLogin();
}

// Start application
initApp();
