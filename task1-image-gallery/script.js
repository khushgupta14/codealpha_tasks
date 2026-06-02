const imageData = [
    { src: 'https://picsum.photos/id/1015/800/600', category: 'nature', caption: 'Mountain River' },
    { src: 'https://picsum.photos/id/1016/800/600', category: 'nature', caption: 'Canyon' },
    { src: 'https://picsum.photos/id/1029/800/600', category: 'city', caption: 'City Park' },
    { src: 'https://picsum.photos/id/1031/800/600', category: 'city', caption: 'City Night Lights' },
    { src: 'https://picsum.photos/id/1039/800/600', category: 'nature', caption: 'Forest Waterfall' },
    { src: 'https://picsum.photos/id/1024/800/600', category: 'animals', caption: 'Bird in Flight' },
    { src: 'https://picsum.photos/id/1025/800/600', category: 'animals', caption: 'Pug Dog' },
    { src: 'https://picsum.photos/id/1033/800/600', category: 'city', caption: 'Escalators' }
];

const galleryContainer = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentActiveImages = []; 
let currentIndex = 0;

function renderGallery(filter = 'all') {
    galleryContainer.innerHTML = '';
    currentActiveImages = imageData.filter(img => filter === 'all' || img.category === filter);

    currentActiveImages.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.caption;
        imgElement.classList.add('gallery-item');
        
        imgElement.addEventListener('click', () => openLightbox(index));
        
        galleryContainer.appendChild(imgElement);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active')); //loop through all the buttons again and rip the active CSS class off
        btn.classList.add('active');
        renderGallery(btn.getAttribute('data-filter'));
    });
});

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('show');
}

function closeLightbox() {
    lightbox.classList.remove('show');
}

function updateLightboxContent() {
    const currentImage = currentActiveImages[currentIndex];
    lightboxImg.src = currentImage.src;
    lightboxCaption.innerText = currentImage.caption;
}

function nextImage() {
    currentIndex++;
    if (currentIndex >= currentActiveImages.length) {
        currentIndex = 0;
    }
    updateLightboxContent();
}

function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = currentActiveImages.length - 1; 
    }
    updateLightboxContent();
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('show')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

renderGallery();