(function initYear(){
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();

  (function initMobileNav(){
    const navToggle = document.getElementById("navToggle");
    const mobileNav = document.getElementById("mobileNav");
    if (!navToggle || !mobileNav) return;

    function setOpen(open) {
      navToggle.setAttribute("aria-expanded", String(open));
      mobileNav.hidden = !open;
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    mobileNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setOpen(false);
    });
  })();

  document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       LOAD HEADER
    ================================= */
    fetch("partials/header.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("header-container").innerHTML = html;

        /* Mark active nav link */
        const path = window.location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav a, .mobile-nav a").forEach(a => {
          if (a.getAttribute("href") === path) a.classList.add("active");
        });

        /* Init mobile nav AFTER header is in the DOM */
        const hamburgerBtn = document.getElementById("hamburgerBtn");
        const mobileNav = document.getElementById("mobileNav");

        if (hamburgerBtn && mobileNav) {
          function setOpen(open) {
            hamburgerBtn.setAttribute("aria-expanded", String(open));
            hamburgerBtn.classList.toggle("is-open", open);
            mobileNav.classList.toggle("open", open);
            hamburgerBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
          }

          hamburgerBtn.addEventListener("click", () => {
            const isOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
            setOpen(!isOpen);
          });

          mobileNav.addEventListener("click", (e) => {
            if (e.target.closest("a")) setOpen(false);
          });
        }
      })
      .catch(err => console.error("Header load error:", err));

    /* ================================
       LOAD FOOTER
    ================================= */
    fetch("partials/footer.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("footer-container").innerHTML = html;

        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      })
      .catch(err => console.error("Footer load error:", err));

  });
  function toggleServiceMobile(event) {
      // Prevent the click from bubbling up (important)
      event.stopPropagation();

      const menu = document.getElementById('mobileServiceMenu');
      const chevron = event.currentTarget.querySelector('.chevron');

      if (menu.style.display === "flex") {
          menu.style.display = "none";
          chevron.style.transform = "rotate(0deg)";
      } else {
          menu.style.display = "flex";
          chevron.style.transform = "rotate(180deg)";
      }
  }

function toggleIndustriesMobile(event) {
  event.preventDefault();
  const menu = document.getElementById('mobileIndustriesMenu');
  const chevron = event.target.querySelector('.chevron');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  chevron.style.transform = menu.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
}
   function closeAnnouncement() {
        document.getElementById("announcementBar").style.display = "none";
        localStorage.setItem("announcementClosed", "true");
    }

    window.addEventListener('load', function() {
        // Show announcement bar on EVERY refresh (ignores localStorage)
        // Remove localStorage check to always show on refresh
        // if (localStorage.getItem("announcementClosed") === "true") {
        //     document.getElementById("announcementBar").style.display = "none";
        // }
    });

