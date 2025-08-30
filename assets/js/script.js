document.addEventListener("DOMContentLoaded", function () {
  // Loader
  const loader = document.getElementById("loader");
  window.addEventListener("load", function () {
    if (loader) loader.style.display = "none";

    if (window.AOS) {
      AOS.init({ duration: 800, once: true, offset: 100 });
      AOS.refresh();
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll"); // prevent background scroll
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileToggle) mobileToggle.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  // Portfolio filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        const filterValue = this.dataset.filter;
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

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(item) {
    const videoSrc = item.dataset.videoSrc;
    if (videoSrc) {
      lightboxContent.innerHTML = `
        <video class="lightbox-video" controls autoplay>
          <source src="${videoSrc}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
    } else {
      const img = item.querySelector("img");
      if (img) {
        lightboxContent.innerHTML = `<img src="${img.src}" alt="Portfolio Image" class="lightbox-image">`;
      }
    }
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
    const video = document.querySelector(".lightbox-video");
    if (video) video.pause();
  }

  if (portfolioItems.length && lightbox && lightboxContent) {
    portfolioItems.forEach((item) => {
      item.addEventListener("click", () => openLightbox(item));
    });
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact form
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }
});
