(function () {

    // ── CONFIG ──────────────────────────────────────────────────────
    var CONFIG = {
      requireLogin: false,   // set to false to bypass login entirely
    };
    // ────────────────────────────────────────────────────────────────
  
    var USERS = [
      { username: "acleda", password: "acleda@2025" },
      { username: "admin",  password: "admin@2025"  }
    ];
  
    function checkAuth() {
      if (!CONFIG.requireLogin) return true;
      return sessionStorage.getItem("acledaAuth") === "true";
    }
  
    function showPortal() {
      document.getElementById("loginOverlay").classList.add("hidden");
      var logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn && !logoutBtn._bound) {
        logoutBtn._bound = true;
        logoutBtn.addEventListener("click", function () {
          if (!CONFIG.requireLogin) return; // no-op if login is disabled
          sessionStorage.removeItem("acledaAuth");
          document.getElementById("loginUsername").value = "";
          document.getElementById("loginPassword").value = "";
          document.getElementById("loginError").classList.remove("visible");
          document.getElementById("loginOverlay").classList.remove("hidden");
        });
      }
      // Hide logout button when login is disabled
      if (!CONFIG.requireLogin && logoutBtn) {
        logoutBtn.style.display = "none";
      }
    }
  
    function attemptLogin() {
      var u = document.getElementById("loginUsername").value.trim();
      var p = document.getElementById("loginPassword").value;
      var err = document.getElementById("loginError");
      var match = USERS.some(function (cred) {
        return cred.username === u && cred.password === p;
      });
      if (match) {
        sessionStorage.setItem("acledaAuth", "true");
        err.classList.remove("visible");
        showPortal();
      } else {
        err.classList.add("visible");
        document.getElementById("loginPassword").value = "";
        document.getElementById("loginPassword").focus();
      }
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      // Skip login entirely if disabled
      if (!CONFIG.requireLogin) { showPortal(); return; }
  
      if (checkAuth()) { showPortal(); return; }
  
      document.getElementById("loginUsername").addEventListener("keydown", function (e) {
        if (e.key === "Enter") document.getElementById("loginPassword").focus();
      });
      document.getElementById("loginPassword").addEventListener("keydown", function (e) {
        if (e.key === "Enter") attemptLogin();
      });
      document.getElementById("loginBtn").addEventListener("click", attemptLogin);
  
      document.getElementById("logoutBtn").addEventListener("click", function () {
        if (!CONFIG.requireLogin) return;
        sessionStorage.removeItem("acledaAuth");
        document.getElementById("loginUsername").value = "";
        document.getElementById("loginPassword").value = "";
        document.getElementById("loginError").classList.remove("visible");
        document.getElementById("loginOverlay").classList.remove("hidden");
      });
  
      document.getElementById("loginEye").addEventListener("click", function () {
        var inp = document.getElementById("loginPassword");
        var icon = document.getElementById("eyeIcon");
        if (inp.type === "password") {
          inp.type = "text";
          icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
          inp.type = "password";
          icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        }
      });
    });
  
  })();