/* =========================================================
📜 Bita Digital Hub – Global Script (v8, multilingual)
Author: Bita Ashoori

Handles:
- Auto-load header/footer (English + Farsi)
- Breadcrumbs for /tools/ pages
- Language dropdown
- Mobile nav toggle
- Smooth scrolling
- Lucide icons
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const isToolPage = window.location.pathname.includes("/tools/");
  const basePath = isToolPage ? "../" : "";
  const lang = document.documentElement.lang || "en"; // Detect page language

  // Choose proper header/footer files
  const headerFile = lang === "fa"
    ? `${basePath}components/header-fa.html`
    : `${basePath}components/header.html`;

  const footerFile = lang === "fa"
    ? `${basePath}components/footer-fa.html`
    : `${basePath}components/footer.html`;

  /* ==========================
     🧭 HEADER LOADER
  ========================== */
  fetch(headerFile)
    .then(res => res.ok ? res.text() : Promise.reject("Header file not found"))
    .then(html => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (!headerPlaceholder) return;
      headerPlaceholder.innerHTML = html;

      initNavbar();

      // 🧩 Add breadcrumb only for /tools/ pages
      if (isToolPage) createBreadcrumb(lang);
    })
    .catch(err => console.error("Header load error:", err));

  /* ==========================
     🦶 FOOTER LOADER
  ========================== */
  fetch(footerFile)
    .then(res => res.ok ? res.text() : Promise.reject("Footer file not found"))
    .then(html => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (!footerPlaceholder) return;
      footerPlaceholder.innerHTML = html;
      initFooterScroll();
    })
    .catch(err => console.error("Footer load error:", err));

  /* ==========================
     🌀 LUCIDE ICONS
  ========================== */
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete" && window.lucide) {
      lucide.createIcons();
    }
  });

  /* =========================================================
     🌍 FUNCTIONS
  ========================================================= */

  // ---------- Initialize Navbar ----------
  function initNavbar() {
    const langBtn = document.getElementById("lang-btn");
    const langMenu = document.getElementById("lang-menu");
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector(".menu-toggle");

    /* 🌐 Language Dropdown */
    if (langBtn && langMenu) {
      langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("show");
      });
      document.addEventListener("click", (e) => {
        if (!langBtn.contains(e.target)) langMenu.classList.remove("show");
      });
    }

    /* 📱 Mobile Menu Toggle */
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuToggle.classList.toggle("open");
      });
    }

    /* 🧭 Smooth Scroll */
    document.querySelectorAll('.nav-links a[href^="#"], .get-started[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });

        if (navLinks && menuToggle) {
          navLinks.classList.remove("show");
          menuToggle.classList.remove("open");
        }
      });
    });
  }

  // ---------- Initialize Footer ----------
  function initFooterScroll() {
    document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // ---------- Breadcrumb Builder ----------
  function createBreadcrumb(lang) {
    const pathParts = window.location.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1].replace(".html", "");
    const prettyName = fileName
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "breadcrumb-nav";

    // Farsi or English labels
    const homeText = lang === "fa" ? "خانه" : "Home";
    const toolsText = lang === "fa" ? "ابزارها" : "Tools";

    breadcrumb.innerHTML = `
      <div class="breadcrumb">
        <a href="${basePath}${lang === "fa" ? "index-fa.html" : "index.html"}">🏠 ${homeText}</a>
        <span>›</span>
        <a href="${basePath}#tools">${toolsText}</a>
        <span>›</span>
        <span class="current">${prettyName}</span>
      </div>
    `;

    const header = document.querySelector(".navbar");
    if (header && header.parentNode) {
      header.insertAdjacentElement("afterend", breadcrumb);
    }
  }
});

/* =========================================================
🪶 Smooth Scroll for any in-page anchor
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80, // offset for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});
