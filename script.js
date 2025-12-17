// Header scroll effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Video Modal
const playBtn = document.getElementById('playBtn');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const modalVideo = document.getElementById('modalVideo');

playBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    modalVideo.play();
});

closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.currentTime = 0;
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
});

// Info Modal
const moreInfoBtn = document.getElementById('moreInfoBtn');
const infoModal = document.getElementById('infoModal');
const closeInfoModal = document.getElementById('closeInfoModal');

moreInfoBtn.addEventListener('click', () => {
    infoModal.classList.add('active');
});

closeInfoModal.addEventListener('click', () => {
    infoModal.classList.remove('active');
});

infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
        infoModal.classList.remove('active');
    }
});

// Row Slider Navigation
const rows = document.querySelectorAll('.row');

rows.forEach(row => {
    const slider = row.querySelector('.row-slider');
    const leftArrow = row.querySelector('.row-arrow-left');
    const rightArrow = row.querySelector('.row-arrow-right');
    
    if (leftArrow && rightArrow && slider) {
        leftArrow.addEventListener('click', () => {
            slider.scrollBy({
                left: -slider.offsetWidth,
                behavior: 'smooth'
            });
        });
        
        rightArrow.addEventListener('click', () => {
            slider.scrollBy({
                left: slider.offsetWidth,
                behavior: 'smooth'
            });
        });
    }
});

// Card Hover Effect - Enhanced positioning
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    const cardHover = card.querySelector('.card-hover');
    
    card.addEventListener('mouseenter', () => {
        // Get card position
        const rect = card.getBoundingClientRect();
        const slider = card.closest('.row-slider');
        const sliderRect = slider.getBoundingClientRect();
        
        // Calculate if card is near the edges
        const cardCenter = rect.left + rect.width / 2;
        const sliderCenter = sliderRect.left + sliderRect.width / 2;
        
        // Reset transform origin based on position
        if (cardCenter < sliderCenter) {
            // Card is on left side - expand to right
            cardHover.style.transformOrigin = 'left center';
        } else {
            // Card is on right side - expand to left
            cardHover.style.transformOrigin = 'right center';
        }
        
        // Check if card is at edges
        const isLeftEdge = rect.left - sliderRect.left < 100;
        const isRightEdge = sliderRect.right - rect.right < 100;
        
        if (isLeftEdge) {
            cardHover.style.transformOrigin = 'left center';
        } else if (isRightEdge) {
            cardHover.style.transformOrigin = 'right center';
        }
    });
});

// Prevent scrollbar from affecting layout
document.querySelectorAll('.row-slider').forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'default';
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'default';
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
});

// Card play button in hover state
document.querySelectorAll('.card-hover .play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        videoModal.classList.add('active');
        modalVideo.play();
    });
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
        if (infoModal.classList.contains('active')) {
            infoModal.classList.remove('active');
        }
    }
});