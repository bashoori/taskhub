/* ============================================
   Mobile Navigation Controller
   Predictable, accessible, injection-safe
============================================ */

function initMobileNav() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!toggleBtn || !mobileNav) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    mobileNav.classList.add("open");
    toggleBtn.classList.add("active");
    document.body.classList.add("nav-open");
  };

  const closeMenu = () => {
    isOpen = false;
    mobileNav.classList.remove("open");
    toggleBtn.classList.remove("active");
    document.body.classList.remove("nav-open");
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  };

  /* Toggle button */
  toggleBtn.addEventListener("click", toggleMenu);

  /* Close when clicking a link */
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* Close on outside click */
  document.addEventListener("click", (e) => {
    if (isOpen && !mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  /* Close on ESC */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeMenu();
    }
  });
}


/* ============================================
   Init after DOM + injected header
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
});
