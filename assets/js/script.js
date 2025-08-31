document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  let preservedScroll = 0; // for scroll locking on lightbox

  // =====================
  // Loader & AOS
  // =====================
  window.addEventListener("load", function () {
    if (loader) loader.style.display = "none";
    if (window.AOS) {
      AOS.init({ duration: 800, once: true, offset: 100 });
      AOS.refresh();
    }
  });

  // =====================
  // Mobile menu
  // =====================
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileToggle) mobileToggle.classList.remove("active");
      if (navMenu) navMenu.classList.remove("active");
    });
  });

  // =====================
  // Header scroll effect
  // =====================
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    });
  }

  // =====================
  // Portfolio filtering
  // =====================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const filter = this.getAttribute("data-filter");
        portfolioItems.forEach((item) => {
          if (filter === "all" || item.dataset.category === filter) {
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

  // =====================
  // Lightbox
  // =====================
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightbox-content");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(item) {
    preservedScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${preservedScroll}px`;
    document.body.classList.add("no-scroll");

    lightboxContent.innerHTML = "";
    const videoSrc = item.getAttribute("data-video-src");
    if (videoSrc) {
      const video = document.createElement("video");
      video.className = "lightbox-video";
      video.controls = true;
      video.autoplay = true;
      const source = document.createElement("source");
      source.src = videoSrc;
      source.type = "video/mp4";
      video.appendChild(source);
      lightboxContent.appendChild(video);
    } else {
      const img = item.querySelector("img");
      if (img) {
        const lightImg = document.createElement("img");
        lightImg.src = img.dataset.src || img.src;
        lightImg.className = "lightbox-image";
        lightboxContent.appendChild(lightImg);
      }
    }

    if (lightbox) lightbox.classList.add("active");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    const video = lightboxContent.querySelector(".lightbox-video");
    if (video) video.pause();
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    if (typeof preservedScroll === "number") {
      window.scrollTo({ top: preservedScroll, behavior: "instant" });
    }
  }

  if (portfolioItems.length) {
    portfolioItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        openLightbox(item);
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.type = "button";
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

  // =====================
  // Back to top button
  // =====================
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =====================
  // EmailJS Contact Form
  // =====================
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.sendForm('service_9846hpm', 'template_y8zvxyq', this)
        .then(function () {
          alert("Thank you! We will get back to you soon.");
          contactForm.reset();
        }, function (error) {
          alert("Oops... something went wrong. Try again later.");
          console.error(error);
        });
    });
  }

  // =====================
  // Lazy load images
  // =====================
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (lazyImages.length) {
    const imgObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("fade-in");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px 0px", threshold: 0.1 }
    );
    lazyImages.forEach((img) => {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      imgObserver.observe(img);
    });
  }
});
