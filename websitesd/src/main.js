import { auth, db, rtdb } from './firebase.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { 
  doc, getDoc, updateDoc, collection, query, where, 
  onSnapshot, serverTimestamp, addDoc, increment, arrayUnion 
} from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';
import { routes as fallbackRoutes, routeStudents as fallbackRouteStudents, driverAccounts, studentAccounts } from './dummyData.js';

const appEl = document.getElementById('app');
let currentUserState = null;
let activeUnsubscribers = [];

function cleanupSubscriptions() {
  activeUnsubscribers.forEach(unsub => {
    if (typeof unsub === 'function') unsub();
  });
  activeUnsubscribers = [];
}

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
        console.warn('Firestore user doc fetch error:', err);
      }
    }
    
    if (!currentUserState) {
      renderLogin();
    }
  });
}

function navigateRoleView(user) {
  cleanupSubscriptions();
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
  cleanupSubscriptions();
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
            Accounts are provisioned in Firestore by your institution admin. Sign in with your assigned email.
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

  const form = document.getElementById('login-form');
  const btnSubmit = document.getElementById('btn-submit');
  const errEl = document.getElementById('login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Authenticating with Firestore...';
    errEl.style.display = 'none';

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
      
      if (userDoc.exists()) {
        currentUserState = { ...userDoc.data(), uid: userCred.user.uid };
        navigateRoleView(currentUserState);
        return;
      }
    } catch (authErr) {
      console.log('Firebase auth fallback check:', authErr.message);
    }

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

    errEl.innerText = 'Invalid email or password. Please check your credentials.';
    errEl.style.display = 'block';
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'Sign In to Portal';
  });

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

// ── 2. DRIVER VIEW (REAL-TIME FIRESTORE & OTP SYNC) ───────────────────────────
function renderDriverView(user) {
  cleanupSubscriptions();
  const assignedRouteName = user.route || user.assignedRoute || 'Route 1';
  const assignedRoute = fallbackRoutes.find(r => r.name === assignedRouteName) || fallbackRoutes[0];
  const busNumber = user.bus || user.assignedBus || assignedRoute.bus || 'TN01AB1234';
  const instId = user.institutionId || 'cit';

  let activeTrip = null;
  let realTimeStudents = fallbackRouteStudents[assignedRouteName] || fallbackRouteStudents['Route 1'];
  let liveLocationData = null;

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
        <p>Live sync enabled — Share the trip OTP with students to confirm boarding.</p>
      </div>

      <div class="grid-layout">
        <!-- Assigned Vehicle & Route Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🚍 Assigned Bus & Route</span>
            <span id="driver-trip-badge" class="status-tag status-offline">CHECKING TRIP...</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Driver Name</span>
              <span class="info-value">${user.name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Bus Number</span>
              <span class="info-value">${busNumber}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Assigned Route</span>
              <span class="info-value">${assignedRouteName} — ${assignedRoute.label}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Institution</span>
              <span class="info-value">${user.institution || 'Chennai Institute of Technology'}</span>
            </div>
          </div>
        </div>

        <!-- Trip Status & OTP Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🔑 Boarding OTP</span>
            <span id="driver-otp-display" style="font-size: 1.1rem; color: var(--accent); font-weight: 800; letter-spacing: 2px; background: rgba(124,143,247,0.15); padding: 0.2rem 0.6rem; border-radius: 8px;">
              OTP: --
            </span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Departure Time</span>
              <span class="info-value">${assignedRoute.stops[0]?.time || '07:00 AM'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Boarded Count</span>
              <span id="driver-boarded-count" class="info-value" style="color: var(--success); font-weight: 700;">
                0 / ${realTimeStudents.length}
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">GPS Stream (RTDB)</span>
              <span id="driver-gps-status" class="info-value" style="color: var(--text-muted);">
                Checking...
              </span>
            </div>
          </div>

          <div style="margin-top: 1rem;">
            <button id="btn-toggle-trip" class="btn-primary" style="padding: 0.65rem 1rem; font-size: 0.9rem;">
              Start New Trip in Firestore
            </button>
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
            <span id="manifest-count" style="font-size: 0.85rem; color: var(--text-muted);">${realTimeStudents.length} Students</span>
          </div>
          <div style="overflow-x: auto;">
            <table class="student-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Boarding Stop</th>
                  <th>Live Status</th>
                </tr>
              </thead>
              <tbody id="student-manifest-rows">
                <!-- Rendered dynamically -->
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

  const tripBadgeEl = document.getElementById('driver-trip-badge');
  const otpDisplayEl = document.getElementById('driver-otp-display');
  const boardedCountEl = document.getElementById('driver-boarded-count');
  const gpsStatusEl = document.getElementById('driver-gps-status');
  const toggleTripBtn = document.getElementById('btn-toggle-trip');
  const manifestRowsEl = document.getElementById('student-manifest-rows');
  const manifestCountEl = document.getElementById('manifest-count');

  function updateManifestTable() {
    manifestCountEl.innerText = `${realTimeStudents.length} Students`;
    let boardedNum = 0;

    const boardedList = activeTrip?.boardedStudents || [];

    manifestRowsEl.innerHTML = realTimeStudents.map(student => {
      const sUid = student.uid;
      const sId = student.id;
      const sName = student.name;
      const sEmail = student.email;

      const isBoarded = (sUid && boardedList.includes(sUid)) || 
                        (sId && boardedList.includes(sId)) || 
                        (sName && boardedList.includes(sName)) || 
                        (sEmail && boardedList.includes(sEmail)) || 
                        student.isBoarded === true || 
                        student.status === 'boarded';

      const isAbsent = student.absentToday === true || student.status === 'absent';

      if (isBoarded) boardedNum++;

      let statusBadge = `<span class="badge badge-pending">⏳ Pending OTP</span>`;
      if (isBoarded) {
        statusBadge = `<span class="badge badge-boarded">✓ Boarded (OTP Confirmed)</span>`;
      } else if (isAbsent) {
        statusBadge = `<span class="badge badge-absent">✕ Absent Today</span>`;
      }

      return `
        <tr>
          <td style="font-weight: 600;">${student.name}</td>
          <td>${student.roll || student.rollNo || 'N/A'}</td>
          <td>${student.stop || 'N/A'}</td>
          <td>${statusBadge}</td>
        </tr>
      `;
    }).join('');

    boardedCountEl.innerText = `${boardedNum} / ${realTimeStudents.length}`;
  }

  updateManifestTable();

  // 1. Live Firestore Listener for Real Students on this route
  if (user.uid) {
    try {
      const q = query(
        collection(db, 'users'),
        where('route', '==', assignedRouteName),
        where('role', '==', 'student')
      );
      const unsubStudents = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          realTimeStudents = snapshot.docs.map(docSnap => ({
            uid: docSnap.id,
            ...docSnap.data()
          }));
          updateManifestTable();
        }
      }, err => console.log('Firestore student listener error:', err.message));
      activeUnsubscribers.push(unsubStudents);
    } catch (e) {
      console.warn('Could not bind Firestore student listener:', e);
    }

    // 2. Live Firestore Listener for Active Trip
    try {
      const qTrip = query(
        collection(db, 'trips'),
        where('routeId', '==', assignedRouteName),
        where('active', '==', true)
      );
      const unsubTrip = onSnapshot(qTrip, (snapshot) => {
        if (!snapshot.empty) {
          const tripDoc = snapshot.docs[0];
          activeTrip = { id: tripDoc.id, ...tripDoc.data() };
          tripBadgeEl.className = 'status-tag status-live';
          tripBadgeEl.innerText = 'TRIP ACTIVE';
          otpDisplayEl.innerText = `OTP: ${activeTrip.otp || '4892'}`;
          toggleTripBtn.innerText = 'End Active Trip';
          toggleTripBtn.style.background = 'rgba(248, 113, 113, 0.2)';
          toggleTripBtn.style.color = 'var(--danger)';
          toggleTripBtn.style.border = '1px solid var(--danger)';
        } else {
          activeTrip = null;
          tripBadgeEl.className = 'status-tag status-offline';
          tripBadgeEl.innerText = 'NO ACTIVE TRIP';
          otpDisplayEl.innerText = 'OTP: --';
          toggleTripBtn.innerText = 'Start New Trip in Firestore';
          toggleTripBtn.style.background = 'var(--accent-gradient)';
          toggleTripBtn.style.color = 'white';
          toggleTripBtn.style.border = 'none';
        }
        updateManifestTable();
      }, err => console.log('Firestore trip listener error:', err.message));
      activeUnsubscribers.push(unsubTrip);
    } catch (e) {
      console.warn('Could not bind Firestore trip listener:', e);
    }
  }

  // 3. Live Realtime Database GPS Location Listener
  try {
    const locRef = ref(rtdb, `liveLocation/${instId}/${assignedRouteName}`);
    const unsubRtdb = onValue(locRef, (snapshot) => {
      if (snapshot.exists()) {
        liveLocationData = snapshot.val();
        if (liveLocationData.isActive) {
          gpsStatusEl.style.color = 'var(--success)';
          gpsStatusEl.innerText = '🟢 Transmitting Live';
        } else {
          gpsStatusEl.style.color = 'var(--text-muted)';
          gpsStatusEl.innerText = '⚪ Standby';
        }
      } else {
        gpsStatusEl.style.color = 'var(--text-muted)';
        gpsStatusEl.innerText = '⚪ Offline';
      }
    });
    activeUnsubscribers.push(() => off(locRef, 'value', unsubRtdb));
  } catch (e) {
    console.warn('Could not bind RTDB location listener:', e);
  }

  // Start / End Trip button listener
  toggleTripBtn.addEventListener('click', async () => {
    try {
      toggleTripBtn.disabled = true;
      if (activeTrip) {
        if (user.uid) {
          await updateDoc(doc(db, 'trips', activeTrip.id), {
            active: false,
            endTime: serverTimestamp()
          });
        }
        activeTrip = null;
        updateManifestTable();
      } else {
        const newOtp = String(Math.floor(Math.random() * 9000) + 1000);
        if (user.uid) {
          await addDoc(collection(db, 'trips'), {
            driverId: user.uid,
            driverName: user.name,
            routeId: assignedRouteName,
            vehicleId: busNumber,
            institutionId: instId,
            otp: newOtp,
            otpGeneratedAt: serverTimestamp(),
            active: true,
            boardedCount: 0,
            boardedStudents: [],
            startTime: serverTimestamp()
          });
        } else {
          activeTrip = {
            otp: newOtp,
            active: true,
            boardedCount: 0,
            boardedStudents: []
          };
          otpDisplayEl.innerText = `OTP: ${newOtp}`;
          tripBadgeEl.className = 'status-tag status-live';
          tripBadgeEl.innerText = 'TRIP ACTIVE (DEMO)';
          toggleTripBtn.innerText = 'End Active Trip';
          updateManifestTable();
        }
      }
    } catch (err) {
      console.error('Trip update error:', err);
      alert('Failed to update trip in Firestore: ' + err.message);
    } finally {
      toggleTripBtn.disabled = false;
    }
  });
}

// ── 3. STUDENT VIEW (REAL-TIME TWO-WAY SYNC) ──────────────────────────────────
function renderStudentView(user) {
  cleanupSubscriptions();
  const assignedRouteName = user.route || 'Route 1';
  const assignedRoute = fallbackRoutes.find(r => r.name === assignedRouteName) || fallbackRoutes[0];
  const userStop = user.stop || 'Tambaram';
  const instId = user.institutionId || 'cit';

  let liveUserDoc = { ...user };
  let liveTripDoc = null;

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
        <p>Real-time Firestore boarding verification with driver OTP.</p>
      </div>

      <!-- Prominent Boarded Success Banner -->
      <div id="student-boarded-banner" style="display: none; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--success); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.5rem;">✅</span>
          <div>
            <div style="font-weight: 700; color: var(--success); font-size: 1rem;">Boarding Confirmed!</div>
            <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 0.2rem;">
              You have successfully boarded bus <strong>${assignedRoute.bus}</strong> today. Have a safe journey!
            </div>
          </div>
        </div>
      </div>

      <div class="grid-layout">
        <!-- Student Profile & OTP Boarding Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🎓 Student Profile</span>
            <span id="student-status-badge" class="badge badge-pending">PENDING BOARDING</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Name</span>
              <span class="info-value">${user.name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Roll Number</span>
              <span class="info-value">${user.roll || user.rollNo || 'CIT-2023-CS08'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Boarding Stop</span>
              <span class="info-value" style="color: var(--accent); font-weight: 700;">${userStop}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Institution</span>
              <span class="info-value">${user.institution || 'Chennai Institute of Technology'}</span>
            </div>
          </div>

          <!-- Board Bus with OTP Form -->
          <div id="student-otp-section" style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--accent);">
              🔑 Enter Driver OTP to Board Bus
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="otp-input" class="input-field" placeholder="4-Digit OTP" maxlength="4" style="font-size: 1.1rem; font-weight: 700; text-align: center; letter-spacing: 2px;" />
              <button id="btn-submit-otp" class="btn-primary" style="width: auto; padding: 0 1.25rem; white-space: nowrap;">
                Board Bus
              </button>
            </div>
            <div id="otp-msg" style="font-size: 0.8rem; margin-top: 0.5rem; display: none;"></div>
          </div>

          <div style="margin-top: 1rem;">
            <button id="btn-toggle-absent" style="width: 100%; padding: 0.6rem 1rem; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
              Mark Absent Today
            </button>
          </div>
        </div>

        <!-- Bus & Live Tracking Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">🚍 Today's Bus Info</span>
            <span id="student-live-indicator" class="status-tag status-offline">BUS OFFLINE</span>
          </div>
          <div class="info-list">
            <div class="info-item">
              <span class="info-label">Assigned Route</span>
              <span class="info-value">${assignedRoute.name} — ${assignedRoute.label}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Active OTP Status</span>
              <span id="student-active-otp-status" class="info-value" style="color: var(--accent); font-weight: 700;">Checking trip...</span>
            </div>
            <div class="info-item">
              <span class="info-label">Bus Number</span>
              <span id="student-bus-num" class="info-value">${assignedRoute.bus}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Estimated Pickup</span>
              <span class="info-value" style="color: var(--success); font-weight: 700;">
                ${assignedRoute.stops.find(s => s.name === userStop)?.time || '07:15 AM'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Route Schedule -->
      <div class="grid-layout" style="margin-top: 1.5rem;">
        <div class="card" style="grid-column: span 2;">
          <div class="card-header">
            <span class="card-title">📍 Route Map & Schedule</span>
            <span style="font-size: 0.85rem; color: var(--accent); font-weight: 600;">Your Stop: ${userStop}</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${assignedRoute.stops.map((stop, idx) => `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid ${stop.name === userStop ? 'var(--accent)' : 'var(--border-color)'}; padding: 1rem; border-radius: var(--radius-md); position: relative;">
                ${stop.name === userStop ? '<span style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent); color: white; font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 700;">YOUR STOP</span>' : ''}
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

  const statusBadgeEl = document.getElementById('student-status-badge');
  const toggleAbsentBtn = document.getElementById('btn-toggle-absent');
  const liveIndicatorEl = document.getElementById('student-live-indicator');
  const activeOtpStatusEl = document.getElementById('student-active-otp-status');
  const otpSectionEl = document.getElementById('student-otp-section');
  const boardedBannerEl = document.getElementById('student-boarded-banner');
  const otpInput = document.getElementById('otp-input');
  const btnSubmitOtp = document.getElementById('btn-submit-otp');
  const otpMsg = document.getElementById('otp-msg');

  function updateStudentUI() {
    const boardedList = liveTripDoc?.boardedStudents || [];
    const isBoardedInTrip = (user.uid && boardedList.includes(user.uid)) ||
                            (user.id && boardedList.includes(user.id)) ||
                            (user.name && boardedList.includes(user.name)) ||
                            (user.email && boardedList.includes(user.email)) ||
                            liveUserDoc.isBoarded === true;

    const isAbsent = liveUserDoc.absentToday === true;

    if (isBoardedInTrip) {
      statusBadgeEl.className = 'badge badge-boarded';
      statusBadgeEl.innerText = '✓ BOARDED BUS';
      if (boardedBannerEl) boardedBannerEl.style.display = 'block';
      if (otpSectionEl) otpSectionEl.style.display = 'none';
    } else if (isAbsent) {
      statusBadgeEl.className = 'badge badge-absent';
      statusBadgeEl.innerText = 'MARKED ABSENT';
      if (boardedBannerEl) boardedBannerEl.style.display = 'none';
      if (otpSectionEl) otpSectionEl.style.display = 'none';
    } else {
      statusBadgeEl.className = 'badge badge-pending';
      statusBadgeEl.innerText = 'PENDING BOARDING';
      if (boardedBannerEl) boardedBannerEl.style.display = 'none';
      if (otpSectionEl) otpSectionEl.style.display = 'block';
    }

    if (isAbsent) {
      toggleAbsentBtn.innerText = 'Undo Absence';
      toggleAbsentBtn.style.background = 'rgba(52, 211, 153, 0.15)';
      toggleAbsentBtn.style.color = 'var(--success)';
      toggleAbsentBtn.style.border = '1px solid var(--success)';
    } else {
      toggleAbsentBtn.innerText = 'Mark Absent Today';
      toggleAbsentBtn.style.background = 'rgba(248, 113, 113, 0.15)';
      toggleAbsentBtn.style.color = 'var(--danger)';
      toggleAbsentBtn.style.border = '1px solid var(--danger)';
    }
  }

  updateStudentUI();

  // 1. Live Firestore Listener for Student User Doc
  if (user.uid) {
    try {
      const unsubUserDoc = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
        if (snapshot.exists()) {
          liveUserDoc = { ...snapshot.data(), uid: user.uid };
          updateStudentUI();
        }
      });
      activeUnsubscribers.push(unsubUserDoc);
    } catch (e) {
      console.warn('Could not bind student user doc listener:', e);
    }
  }

  // 2. Live Firestore Listener for Active Trip on Student's route
  try {
    const qTrip = query(
      collection(db, 'trips'),
      where('routeId', '==', assignedRouteName),
      where('active', '==', true)
    );
    const unsubTrip = onSnapshot(qTrip, (snapshot) => {
      if (!snapshot.empty) {
        liveTripDoc = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        liveIndicatorEl.className = 'status-tag status-live';
        liveIndicatorEl.innerText = 'TRIP ACTIVE';
        activeOtpStatusEl.innerText = `OTP: ${liveTripDoc.otp || 'Active'}`;
        activeOtpStatusEl.style.color = 'var(--success)';
      } else {
        liveTripDoc = null;
        liveIndicatorEl.className = 'status-tag status-offline';
        liveIndicatorEl.innerText = 'BUS STANDBY';
        activeOtpStatusEl.innerText = 'No Active Trip';
        activeOtpStatusEl.style.color = 'var(--text-muted)';
      }
      updateStudentUI();
    });
    activeUnsubscribers.push(unsubTrip);
  } catch (e) {
    console.warn('Could not bind active trip listener:', e);
  }

  // 3. Submit OTP to board bus
  btnSubmitOtp.addEventListener('click', async () => {
    const enteredOtp = otpInput.value.trim();
    otpMsg.style.display = 'block';

    if (!enteredOtp || enteredOtp.length < 4) {
      otpMsg.style.color = 'var(--danger)';
      otpMsg.innerText = 'Please enter a valid 4-digit OTP.';
      return;
    }

    if (!liveTripDoc) {
      otpMsg.style.color = 'var(--danger)';
      otpMsg.innerText = 'No active trip found for your route. Please wait for driver to start trip.';
      return;
    }

    const liveOtp = (liveTripDoc.otp || '').toString().trim();
    if (enteredOtp !== liveOtp) {
      otpMsg.style.color = 'var(--danger)';
      otpMsg.innerText = 'Invalid OTP. Check the OTP shown on your driver screen.';
      return;
    }

    // Correct OTP entered! Update Firestore trip doc, boardings collection & user doc
    try {
      btnSubmitOtp.disabled = true;
      btnSubmitOtp.innerText = 'Verifying...';

      const sUid = user.uid || null;
      const sName = user.name;
      const sId = user.id || null;

      if (liveTripDoc.id) {
        const updateArray = [sName];
        if (sUid) updateArray.push(sUid);
        if (sId) updateArray.push(sId);

        await updateDoc(doc(db, 'trips', liveTripDoc.id), {
          boardedCount: increment(1),
          boardedStudents: arrayUnion(...updateArray)
        });

        await addDoc(collection(db, 'boardings'), {
          studentId: sUid || sId || 'demo-uid',
          studentName: sName,
          routeId: assignedRouteName,
          boardingStop: userStop,
          boardedAt: serverTimestamp(),
          tripId: liveTripDoc.id,
          institutionId: instId
        });
      }

      if (sUid) {
        await updateDoc(doc(db, 'users', sUid), {
          isBoarded: true,
          boardedAt: serverTimestamp()
        });
      }

      liveUserDoc.isBoarded = true;
      if (!liveTripDoc.boardedStudents) liveTripDoc.boardedStudents = [];
      liveTripDoc.boardedStudents.push(user.name);
      if (sUid) liveTripDoc.boardedStudents.push(sUid);

      otpMsg.style.color = 'var(--success)';
      otpMsg.innerText = '✓ Boarding confirmed! Have a safe trip.';
      updateStudentUI();
    } catch (err) {
      console.error('OTP Boarding Error:', err);
      otpMsg.style.color = 'var(--danger)';
      otpMsg.innerText = 'Failed to confirm boarding: ' + err.message;
      btnSubmitOtp.disabled = false;
      btnSubmitOtp.innerText = 'Board Bus';
    }
  });

  // Handle Mark / Undo Absent toggle
  toggleAbsentBtn.addEventListener('click', async () => {
    if (!user.uid) {
      liveUserDoc.absentToday = !liveUserDoc.absentToday;
      updateStudentUI();
      return;
    }

    try {
      toggleAbsentBtn.disabled = true;
      const targetState = !(liveUserDoc.absentToday === true);
      await updateDoc(doc(db, 'users', user.uid), {
        absentToday: targetState,
        absentMarkedAt: targetState ? serverTimestamp() : null
      });
      liveUserDoc.absentToday = targetState;
      updateStudentUI();
    } catch (err) {
      console.error('Absent toggle error:', err);
      alert('Failed to update absence status in Firestore: ' + err.message);
    } finally {
      toggleAbsentBtn.disabled = false;
    }
  });
}

// ── LOGOUT ────────────────────────────────────────────────────────────────────
async function handleLogout() {
  cleanupSubscriptions();
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
