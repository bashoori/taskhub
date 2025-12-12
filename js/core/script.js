/* ============================================
   Mobile Navigation Controller
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!toggleBtn || !mobileNav) return;

  const openMenu = () => {
    mobileNav.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  };

  // Toggle button click
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (mobileNav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking a menu link
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileNav.classList.contains("open") &&
      !mobileNav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) {
      closeMenu();
    }
  });
});
