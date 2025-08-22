// /js/paywall.js
(function () {
  // Helper to grab query params
  function getParam(name) {
    const m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  // 1) Handy reset for testing: ?clear=1
  if (getParam('clear') === '1') {
    try { 
      localStorage.removeItem('rea_diag_paid'); 
      console.log("Diagnostic access cleared on this device.");
    } catch (e) {}
  }

  // 2) Accept ?access=diag or ?unlock=diag to set the device unlock
  const access = getParam('access') || getParam('unlock');
  if (access === 'diag') {
    try { 
      localStorage.setItem('rea_diag_paid', '1'); 
      console.log("Diagnostic access granted on this device.");
    } catch (e) {}
  }

  // 3) Guard for protected pages (use inside diagnostic-test.html)
  window.requireDiagAccess = function () {
    try {
      const ok = localStorage.getItem('rea_diag_paid') === '1';
      if (!ok) location.replace('lock.html');
    } catch (e) {
      location.replace('lock.html');
    }
  };

  // 4) Helper used by lock.html to validate an unlock code
  window.tryUnlockWithCode = function (inputCode, validCodes) {
    if (!inputCode) return false;
    const needle = String(inputCode).trim().toLowerCase();
    const hit = (validCodes || []).some(c => String(c).trim().toLowerCase() === needle);
    if (hit) {
      try { 
        localStorage.setItem('rea_diag_paid', '1'); 
        console.log("Diagnostic access unlocked with code.");
      } catch (e) {}
      return true;
    }
    return false;
  };
})();
