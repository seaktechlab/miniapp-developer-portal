/* ======================================================
   APP INITIALIZATION
====================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     COPY BUTTONS
  ====================================================== */

  document
    .querySelectorAll('.copy-btn[data-target]')
    .forEach(btn => {

      const originalHTML = btn.innerHTML;

      btn.addEventListener('click', () => {

        const targetId = btn.dataset.target;
        const targetElement =
          document.getElementById(targetId);

        if (!targetElement) {
          console.warn(
            `Copy target not found: ${targetId}`
          );
          return;
        }

        navigator.clipboard
          .writeText(targetElement.innerText)
          .then(() => {

            btn.classList.add('copied');

            btn.innerHTML = `
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            `;

            setTimeout(() => {
              btn.classList.remove('copied');
              btn.innerHTML = originalHTML;
            }, 2000);

          })
          .catch(error => {
            console.error(
              'Clipboard copy failed:',
              error
            );
          });

      });

    });

  /* ======================================================
     ACTIVE NAVIGATION (SCROLL SPY)
  ====================================================== */

  const sections =
    document.querySelectorAll('section[id]');

  const navItems =
    document.querySelectorAll('.nav-item');

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          const currentId =
            entry.target.id;

          navItems.forEach(item => {

            const href =
              item.getAttribute('href');

            item.classList.toggle(
              'active',
              href === `#${currentId}`
            );

          });

        });

      },

      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }

    );

  sections.forEach(section => {
    observer.observe(section);
  });

});