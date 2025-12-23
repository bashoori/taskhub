/* ============================================
   Mobile Navigation Controller
   Accessible, predictable, single source of truth
============================================ */

function initMobileNav() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (!toggleBtn || !mobileNav) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    mobileNav.classList.add("open");
    document.body.classList.add("nav-open");
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    isOpen = false;
    mobileNav.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  };

  /* Toggle button */
  toggleBtn.addEventListener("click", toggleMenu);

  /* Close when clicking a nav link */
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* Close when clicking outside */
  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !mobileNav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
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
   Init after DOM is ready
============================================ */

document.addEventListener("DOMContentLoaded", initMobileNav);
