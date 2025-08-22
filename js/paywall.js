// /js/paywall.js
(function () {
  function getParam(name) {
    const m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  // Accept ?access=diag or ?unlock=diag to set the device unlock
  const access = getParam('access') || getParam('unlock');
  if (access === 'diag') {
    try { localStorage.setItem('rea_diag_paid', '1'); } catch (e) {}
  }

  window.requireDiagAccess = function () {
    try {
      const ok = localStorage.getItem('rea_diag_paid') === '1';
      if (!ok) location.replace('lock.html');
    } catch (e) {
      location.replace('lock.html');
    }
  };

  window.tryUnlockWithCode = function (inputCode, validCodes) {
    if (!inputCode) return false;
    const needle = String(inputCode).trim().toLowerCase();
    const hit = (validCodes || []).some(c => String(c).trim().toLowerCase() === needle);
    if (hit) {
      try { localStorage.setItem('rea_diag_paid', '1'); } catch (e) {}
      return true;
    }
    return false;
  };
})();
