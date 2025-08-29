AOS.init({
  duration: 800,
  once: true
});

function openLightbox(src, type) {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  content.innerHTML = '';
  
  if (type === 'image') {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'max-h-[90vh] max-w-[90vw]';
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

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');
  lightbox.classList.add('hidden');
  content.innerHTML = '';
}
