document.addEventListener('DOMContentLoaded', () => {
    const skinsContainer = document.getElementById('skins-container');

    // 1. Рендеринг скинов из config.js
    if (typeof kyodanConfig !== 'undefined' && kyodanConfig.skins) {
        kyodanConfig.skins.forEach((skin, index) => {
            const skinCard = document.createElement('div');
            skinCard.className = 'skin-card';

            // Генерируем HTML для картинок карусели
            let imagesHtml = '';
            skin.images.forEach((imgSrc, imgIndex) => {
                imagesHtml += `<img src="${imgSrc}" alt="${skin.name}" onclick="openLightbox(${index}, ${imgIndex})">`;
            });

            skinCard.innerHTML = `
                <div class="carousel" id="carousel-${index}">
                    <div class="carousel-images" id="track-${index}">
                        ${imagesHtml}
                    </div>
                    ${skin.images.length > 1 ? `
                        <button class="carousel-btn prev" onclick="moveCarousel(${index}, -1)">&#10094;</button>
                        <button class="carousel-btn next" onclick="moveCarousel(${index}, 1)">&#10095;</button>
                    ` : ''}
                </div>
                <div class="skin-info">
                    <div class="skin-name">${skin.name}</div>
                    <div class="skin-price">${skin.price}</div>
                </div>
            `;
            
            skinsContainer.appendChild(skinCard);
        });
    } else {
        skinsContainer.innerHTML = '<p>Ошибка загрузки конфигурации скинов.</p>';
    }

    // 2. Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Глобальный объект для хранения текущего индекса фото в каждой карусели
const carouselStates = {};

// Функция переключения фото в карусели
window.moveCarousel = function(carouselId, direction) {
    if (!carouselStates[carouselId]) {
        carouselStates[carouselId] = 0;
    }

    const track = document.getElementById(`track-${carouselId}`);
    const totalImages = track.children.length;
    
    // Обновляем индекс
    carouselStates[carouselId] += direction;

    // Зацикливаем карусель
    if (carouselStates[carouselId] < 0) {
        carouselStates[carouselId] = totalImages - 1;
    } else if (carouselStates[carouselId] >= totalImages) {
        carouselStates[carouselId] = 0;
    }

    // Сдвигаем трек с картинками
    const offset = -(carouselStates[carouselId] * 100);
    track.style.transform = `translateX(${offset}%)`;
};

// Lightbox functions
let currentLightboxSkin = null;
let currentLightboxImg = null;

window.openLightbox = function(skinIndex, imgIndex) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg || !kyodanConfig.skins[skinIndex]) return;
    
    currentLightboxSkin = skinIndex;
    currentLightboxImg = imgIndex;
    
    lightboxImg.src = kyodanConfig.skins[skinIndex].images[imgIndex];
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transformOrigin = 'center center';
    lightbox.classList.add('active');
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
};

window.changeLightboxImage = function(direction) {
    if (currentLightboxSkin === null || currentLightboxImg === null) return;
    
    const skin = kyodanConfig.skins[currentLightboxSkin];
    let newImgIndex = currentLightboxImg + direction;
    
    if (newImgIndex < 0) {
        newImgIndex = skin.images.length - 1;
    } else if (newImgIndex >= skin.images.length) {
        newImgIndex = 0;
    }
    
    openLightbox(currentLightboxSkin, newImgIndex);
};

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        // Закрытие по клику на фон
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Зум по клику на картинку
        lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.classList.toggle('zoomed');
            
            if (lightboxImg.classList.contains('zoomed')) {
                updateZoomPan(e);
            } else {
                lightboxImg.style.transformOrigin = 'center center';
            }
        });

        // Панорамирование при движении мыши
        lightbox.addEventListener('mousemove', updateZoomPan);
        
        function updateZoomPan(e) {
            if (lightboxImg.classList.contains('zoomed')) {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                lightboxImg.style.transformOrigin = `${x}% ${y}%`;
            }
        }
    }
});

// Управление с клавиатуры
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});
