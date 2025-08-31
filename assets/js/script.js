document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");

  // ✅ Loader fade out
  if (loader) {
    window.addEventListener("load", function () {
      loader.classList.add("fade-out");
      setTimeout(() => loader.style.display = "none", 600);
    });

    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.style.display = "none", 600);
    }, 1200);
  }

  // ✅ Init AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  // ✅ Mobile menu toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // ✅ Header scroll effect
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  // ✅ Portfolio filtering
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
            item.classList.add("fade-in");
          } else {
            item.style.display = "none";
            item.classList.remove("fade-in");
          }
        });

        AOS.refresh();
      });
    });
  }

  // ✅ Lightbox
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

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
    const video = document.querySelector(".lightbox-video");
    if (video) video.pause();
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

  // ✅ Back to top
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ✅ Contact form
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // ✅ Lazy-load portfolio images
  const lazyImages = document.querySelectorAll(".portfolio-item img");
  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const dataSrc = img.getAttribute("data-src");
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      // Move src → data-src, keep tiny placeholder in src
      if (img.getAttribute("src")) {
        img.setAttribute("data-src", img.getAttribute("src"));
        img.src = "assets/images/placeholder.jpg"; // tiny 1kb placeholder
      }
      imgObserver.observe(img);
    });
  }
});
