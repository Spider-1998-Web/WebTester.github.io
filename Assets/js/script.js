// script.js

// Function to open lightbox for images and videos
function openLightbox(src, type) {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');

  // Clear previous content
  content.innerHTML = '';

  if (type === 'image') {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'max-h-[90vh] max-w-[90vw] object-contain';
    content.appendChild(img);
  } else if (type === 'video') {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.className = 'max-h-[90vh] max-w-[90vw]';
    content.appendChild(video);
  }

  lightbox.classList.remove('hidden');
}

// Function to close lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');

  // Pause video if open
  const video = content.querySelector('video');
  if (video) video.pause();

  lightbox.classList.add('hidden');
  content.innerHTML = '';
}

// Close lightbox when clicking outside the content
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') {
    closeLightbox();
  }
});

// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true
});
