/* assets/js/script.js
   Fixed lightbox open/close to prevent first-click jump and inconsistent background.
*/
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");

  // Hide loader & init AOS (if present)
  window.addEventListener("load", function () {
    if (loader) loader.style.display = "none";
    if (window.AOS) {
      AOS.init({ duration: 800, once: true, offset: 100 });
      AOS.refresh();
    }
  });

  // ---- Mobile Menu Toggle ----
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileToggle) mobileToggle.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // ---- Header scroll effect ----
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  // ---- Portfolio filtering (unchanged) ----
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter") || this.dataset.filter;

        portfolioItems.forEach((item) => {
          if (filterValue === "all" || item.dataset.category === filterValue) {
            item.style.display = "block";
            item.classList.add("fade-in");
          } else {
            item.style.display = "none";
            item.classList.remove("fade-in");
          }
        });

        if (window.AOS) AOS.refresh();
      });
    });
  }

  // ---- Lightbox (fixed) ----
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  let lastScrollY = 0;
  let lastFocusedElement = null;

  function openLightboxFromItem(item) {
    if (!lightbox || !lightboxContent) return;
    if (lightbox.classList.contains("active")) return; // already open

    // prevent page jump: store scroll and lock body using position:fixed
    lastScrollY = window.scrollY || window.pageYOffset || 0;
    lastFocusedElement = document.activeElement;

    document.body.style.position = "fixed";
    document.body.style.top = `-${lastScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    // ensure overlay background (defensive)
    if (!lightbox.style.background) lightbox.style.background = "rgba(0,0,0,0.8)";

    // Fill content
    const videoSrc = item.getAttribute("data-video-src");
    lightboxContent.innerHTML = "";

    if (videoSrc) {
      const video = document.createElement("video");
      video.className = "lightbox-video";
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      // do NOT force muted — allow normal playback, but autoplay may be blocked by browser
      const source = document.createElement("source");
      source.src = videoSrc;
      source.type = "video/mp4";
      video.appendChild(source);
      lightboxContent.appendChild(video);
      // attempt play (catch if autoplay blocked)
      const p = video.play();
      if (p && p.catch) p.catch(() => {}); // ignore autoplay rejection
    } else {
      const imgElem = document.createElement("img");
      imgElem.className = "lightbox-image";
      const img = item.querySelector("img");
      imgElem.src = img ? img.src : "";
      imgElem.alt = img ? img.alt || "Portfolio image" : "Portfolio image";
      lightboxContent.appendChild(imgElem);
    }

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    // accessibility: move focus to close button if available
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    // pause video if present
    const video = lightbox.querySelector("video");
    if (video) {
      try { video.pause(); } catch (err) {}
    }

    // clear content (small timeout to allow CSS fade-out)
    setTimeout(() => {
      if (lightboxContent) lightboxContent.innerHTML = "";
    }, 200);

    // restore body scroll state and scroll back to stored position
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, lastScrollY);

    // restore focus
    try {
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    } catch (err) {}
  }

  if (portfolioItems.length && lightbox && lightboxContent) {
    portfolioItems.forEach((item) => {
      // make items keyboard-focusable (accessibility)
      if (!item.hasAttribute("tabindex")) item.setAttribute("tabindex", "0");

      // click handler
      item.addEventListener("click", function (e) {
        // prevent link default (if anchors were used) and stop propagation
        if (e) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopPropagation === "function") e.stopPropagation();
        }
        openLightboxFromItem(this);
      });

      // keyboard handler (Enter / Space)
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightboxFromItem(this);
        }
      });
    });
  }

  // close handlers
  if (lightboxClose) {
    lightboxClose.addEventListener("click", function (e) {
      if (e && e.stopPropagation) e.stopPropagation();
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox(); // click on backdrop closes
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // ---- Back to top button ----
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Contact form ----
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
});
