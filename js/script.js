/* =========================================================
📜 Bita Digital Hub — Global Script (2025 Final, Clean)
Handles:
- Load header + footer
- Mobile navigation toggle
- Language dropdown
- Smooth scrolling
- Lucide icons
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     Load Header + Footer
  -------------------------------- */
  loadComponent("/components/header.html", "header-placeholder", initHeader);
  loadComponent("/components/footer.html", "footer-placeholder", initFooter);

  function loadComponent(file, targetId, callback) {
    const placeholder = document.getElementById(targetId);
    if (!placeholder) return;

    fetch(file)
      .then(res => res.text())
      .then(html => {
        placeholder.innerHTML = html;
        if (callback) callback();
      })
      .catch(err => console.error(`❌ Error loading ${file}`, err));
  }

  /* -------------------------------
     Initialize Header Behaviors
  -------------------------------- */
  function initHeader() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const langBtn = document.getElementById("lang-btn");
    const langMenu = document.getElementById("lang-menu");

    // Mobile Menu
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuToggle.classList.toggle("open");
      });
    }

    // Language dropdown
    if (langBtn && langMenu) {
      langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        langMenu.classList.remove("show");
      });
    }

    // Smooth scroll for internal anchor links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        scrollToTarget(target);

        navLinks.classList.remove("show");
        menuToggle.classList.remove("open");
      });
    });

    // Icons
    if (window.lucide) lucide.createIcons();
  }

  /* -------------------------------
     Footer Smooth Scroll
  -------------------------------- */
  function initFooter() {
    document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        scrollToTarget(target);
      });
    });
  }

  /* -------------------------------
     Smooth Scroll (shared function)
  -------------------------------- */
  function scrollToTarget(target) {
    const headerOffset = 80;
    const elementPos = target.offsetTop - headerOffset;

    window.scrollTo({
      top: elementPos,
      behavior: "smooth"
    });
  }
});

/* =========================================================
   Safe smooth scroll for ALL #anchors on page
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});
