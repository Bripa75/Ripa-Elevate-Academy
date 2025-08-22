<script>
// Simple paywall helper for Ripa Elevate Academy
(function () {
  function getParam(name) {
    const m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  // If Stripe redirected with ?access=diag, set local unlock
  const access = getParam('access');
  if (access === 'diag') {
    try { localStorage.setItem('rea_diag_paid', '1'); } catch (e) {}
  }

  // Require access on protected pages
  window.requireDiagAccess = function () {
    try {
      const ok = localStorage.getItem('rea_diag_paid') === '1';
      if (!ok) location.replace('lock.html');
    } catch (e) {
      location.replace('lock.html');
    }
  };

  // Optional: clear unlock (for your testing)
  window.clearDiagAccess = function () {
    try { localStorage.removeItem('rea_diag_paid'); } catch (e) {}
  };
})();
</script>
