// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  // Hide loader when page is fully loaded
  window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileToggle) mobileToggle.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // Header scroll effect
  const header = document.getElementById("header");
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

        const filterValue = this.getAttribute("data-filter");
        portfolioItems.forEach((item) => {
          if (filterValue === "all" || item.dataset.category === filterValue) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  if (portfolioItems.length && lightbox && lightboxContent) {
    portfolioItems.forEach((item) => {
      item.addEventListener("click", function () {
        const videoSrc = this.getAttribute("data-video-src");

        if (videoSrc) {
          lightboxContent.innerHTML = `
            <div class="video-player">
              <video class="lightbox-video" controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          `;
        } else {
          const img = this.querySelector("img");
          if (img) {
            lightboxContent.innerHTML = `<img src="${img.src}" alt="Portfolio image" class="lightbox-image">`;
          }
        }

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
  }

  // Close lightbox
  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("active");
    document.body.style.overflow = "auto";

    const video = document.querySelector(".lightbox-video");
    if (video) video.pause();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
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
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
});
