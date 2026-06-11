<script>
  /* ── Copy buttons ─────────────────────────────────────── */
  document.querySelectorAll('.copy-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const el = document.getElementById(id);
      const text = el ? el.innerText : '';
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg> Copied!`;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg> Copy`;
        }, 2000);
      });
    });
  });

  /* ── Active nav on scroll ─────────────────────────────── */
  const sections = document.querySelectorAll('[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(item => {
          item.classList.toggle('active',
            item.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
</script>
