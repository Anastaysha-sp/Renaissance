// Анимированный курсор
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Фолловер с задержкой
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Эффекты при наведении на ссылки и кнопки
const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        follower.style.transform = 'scale(1.5)';
        follower.style.borderColor = '#fff';
        follower.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        follower.style.background = 'transparent';
    });
});

// Эффект при клике
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.5)';
    follower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
});


// Данные для описаний
const ideaDescriptions = {
    1: "Гуманизм — философская и этическая позиция, утверждающая ценность человека, его право на свободу, счастье и развитие. В эпоху Возрождения гуманизм стал центральным течением, противопоставляя себя средневековой схоластике и делая акцент на изучении классических античных текстов.",
    2: "Возрождение античности — обращение к культурному наследию Древней Греции и Рима. Художники, архитекторы и мыслители эпохи Ренессанса изучали и воспроизводили античные образцы, видя в них идеал гармонии, красоты и совершенства.",
    3: "Научный прорыв — период великих географических открытий, развития астрономии, медицины и естественных наук. Изобретение книгопечатания, гелиоцентрическая система Коперника, анатомические исследования — все это характеризовало научную революцию эпохи.",
    4: "Индивидуализм — акцент на уникальности человеческой личности, её творческих способностях и самостоятельности. В отличие от средневекового коллективизма, эпоха Возрождения прославляла индивидуальные достижения и таланты."
};

// Элементы
const modalOverlay = document.getElementById('modalOverlay');
const modalTop = document.getElementById('modalTop');
const modalBottom = document.getElementById('modalBottom');
const modalDescription = document.getElementById('modalDescription');
const detailButtons = document.querySelectorAll('.details-btn');

// Функция открытия модального окна
function openModal(card) {
    const cardId = card.getAttribute('data-id');
    const isReversed = card.classList.contains('reversed');
    
    // Получаем содержимое карточки
    const cardTop = card.querySelector('.card-top').innerHTML;
    const cardBottom = card.querySelector('.card-bottom').innerHTML;
    const description = ideaDescriptions[cardId];
    
    // Заполняем модальное окно
    modalTop.innerHTML = cardTop;
    modalBottom.innerHTML = cardBottom;
    modalDescription.innerHTML = description;
    
    // Если карточка перевернута, меняем порядок
    if (isReversed) {
        modalContent.classList.add('reversed-modal');
    } else {
        modalContent.classList.remove('reversed-modal');
    }
    
    // Показываем модальное окно
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Функция закрытия модального окна
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Обработчики событий для кнопок
detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = button.closest('.idea-card');
        openModal(card);
    });
});

// Закрытие по клику на оверлей
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Предотвращаем закрытие при клике на контент
modalOverlay.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});




class HumanismFoundersSlider {
    constructor() {
        this.slides = document.querySelectorAll('.humanism-founders-section .slide');
        this.prevBtn = document.querySelector('.humanism-founders-section .prev-btn');
        this.nextBtn = document.querySelector('.humanism-founders-section .next-btn');
        this.prevNumber = document.querySelector('.humanism-founders-section .prev-number span');
        this.currentNumber = document.querySelector('.humanism-founders-section .current-number span');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        this.addSwipeSupport();
        this.updateNavigation();
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        const nextSlide = (this.currentSlide + 1) % this.totalSlides;
        this.changeSlide(nextSlide);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        const prevSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.changeSlide(prevSlide);
    }
    
    changeSlide(newIndex) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = newIndex;
        
        setTimeout(() => {
            this.slides[this.currentSlide].classList.add('active');
            this.updateNavigation();
            this.isAnimating = false;
        }, 50);
    }
    
    updateNavigation() {
        const prevSlideIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        const currentSlideIndex = this.currentSlide;
        
        this.prevNumber.textContent = String(prevSlideIndex + 1).padStart(2, '0');
        this.currentNumber.textContent = String(currentSlideIndex + 1).padStart(2, '0');
    }
    
    addSwipeSupport() {
        let startX = 0;
        const sliderElement = document.querySelector('.humanism-founders-section .slider');
        
        sliderElement.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });
        
        sliderElement.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            
            if (startX - endX > swipeThreshold) {
                this.nextSlide();
            } else if (endX - startX > swipeThreshold) {
                this.prevSlide();
            }
        });
    }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', function() {
    new HumanismFoundersSlider();
});




document.addEventListener('DOMContentLoaded', function() {
    
    // Находим все элементы для анимации
    const animatedElements = document.querySelectorAll('[data-animate="true"]');
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const periodImages = document.querySelectorAll('.period-images');
    
    // Скрываем элементы изначально
    animatedElements.forEach(el => {
        el.style.opacity = '0';
    });
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Функция для проверки видимости с отступом
    function isElementInViewportWithOffset(el, offset = 100) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    }
    
    // Функция анимации изображений
    function animateImagesOnScroll() {
        timelineEvents.forEach((event, index) => {
            if (isElementInViewportWithOffset(event, 100)) {
                // Показываем соответствующие изображения
                // index: 0 - первый timeline-event, 1 - второй, и т.д.
                if (periodImages[index]) {
                    periodImages[index].classList.add('show-images');
                }
            } else {
                // Скрываем изображения, если элемент не виден
                if (periodImages[index]) {
                    periodImages[index].classList.remove('show-images');
                }
            }
        });
    }
    
    // Основная функция анимации
    function animateOnScroll() {
        animatedElements.forEach((el, index) => {
            if (isElementInViewportWithOffset(el, 100)) {
                // Задержка для последовательной анимации
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 150); // Задержка 150ms между элементами
            } else {
                // Убираем анимацию если элемент вне видимости
                el.classList.remove('animate-in');
            }
        });
        
        // Анимируем изображения
        animateImagesOnScroll();
    }
    
    // Запускаем сразу и при скролле
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Для отладки
    console.log('Таймлайн загружен. Элементов для анимации:', animatedElements.length);
    console.log('Изображений периодов:', periodImages.length);
});