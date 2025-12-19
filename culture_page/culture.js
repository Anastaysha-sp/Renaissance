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









// JavaScript для работы модальных окон
document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.light-button');
    const backButtons = document.querySelectorAll('.back-btn');
    const modals = document.querySelectorAll('.modal');
    
    // Открытие модального окна
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artist = this.getAttribute('data-artist');
            const modal = document.getElementById(`${artist}-modal`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закрытие модального окна
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Закрытие по клику вне модального окна
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
});







// Данные для описаний (добавьте в начало culture.js после курсора)
const ideaDescriptions = {
    1: "В картинах эпохи Возрождения художники использовали как линейную, так и воздушную перспективу. Эти методы помогали передавать глубину пространства не через математические линии, а через свет и цвет.",
    2: "Светотень — художественный приём, основанный на контрасте света и тени. Он позволял передавать объём трёхмерных объектов на плоскости, создавать эмоциональный эффект и драматизм, выделять главное в композиции.",
    3: "Техника сфумато — это техника нанесения краски, при которой границы между цветами и формами смягчаются, создавая плавные, почти неуловимые переходы. Вместо чётких линий и резких контрастов зритель видит эффект лёгкой дымки, словно предметы окутаны воздухом."
};

// Функция инициализации модальных окон для карточек
function initIdeaCards() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const detailButtons = document.querySelectorAll('.details-btn');
    
    if (!modalOverlay || detailButtons.length === 0) return;
    
    // Функция открытия модального окна
    function openModal(card) {
        const cardId = card.getAttribute('data-id');
        const isReversed = card.classList.contains('reversed');
        
        // Получаем содержимое карточки
        const cardTop = card.querySelector('.card-top').innerHTML;
        const cardBottom = card.querySelector('.card-bottom').innerHTML;
        const description = ideaDescriptions[cardId];
        
        // Заполняем модальное окно
        document.getElementById('modalTop').innerHTML = cardTop;
        document.getElementById('modalBottom').innerHTML = cardBottom;
        document.getElementById('modalDescription').innerHTML = description;
        
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
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initIdeaCards();
    
    // Адаптивность для Bootstrap карточек
    if (window.innerWidth <= 768) {
        const ideaCards = document.querySelectorAll('.idea-card');
        ideaCards.forEach(card => {
            card.style.marginTop = '0';
        });
    }
});







document.addEventListener('DOMContentLoaded', function() {
    const artistsSection = document.querySelector('.artists-section');
    const lightCursor = document.querySelector('.artists-light-cursor');
    const imageWrappers = document.querySelectorAll('.artist-image-wrapper');
    
    // Функция для обновления позиции курсора-подсветки
    function updateLightCursor(e) {
        lightCursor.style.left = e.clientX + 'px';
        lightCursor.style.top = e.clientY + 'px';
        
        // Проверяем, находится ли курсор над изображением
        let isOverImage = false;
        imageWrappers.forEach(wrapper => {
            const rect = wrapper.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                isOverImage = true;
                wrapper.classList.add('highlighted');
            } else {
                wrapper.classList.remove('highlighted');
            }
        });
        
        // Активируем курсор-подсветку только когда находимся в секции
        if (e.target.closest('.artists-section')) {
            artistsSection.classList.add('light-cursor-active');
        } else {
            artistsSection.classList.remove('light-cursor-active');
            imageWrappers.forEach(wrapper => {
                wrapper.classList.remove('highlighted');
            });
        }
    }
    
    // Обработчики событий для всей секции
    artistsSection.addEventListener('mousemove', updateLightCursor);
    
    artistsSection.addEventListener('mouseenter', function() {
        artistsSection.classList.add('light-cursor-active');
    });
    
    artistsSection.addEventListener('mouseleave', function() {
        artistsSection.classList.remove('light-cursor-active');
        imageWrappers.forEach(wrapper => {
            wrapper.classList.remove('highlighted');
        });
    });
    
    // Обработчики для отдельных изображений (дополнительная точность)
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('mousemove', function(e) {
            // Обновляем подсветку для конкретного изображения
            const rect = this.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                this.classList.add('highlighted');
            }
        });
        
        wrapper.addEventListener('mouseleave', function() {
            this.classList.remove('highlighted');
        });
    });
    
    // Отключаем стандартное поведение контекстного меню
    artistsSection.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});










// Данные для описаний архитектуры (добавьте после ideaDescriptions)
const ideaDescriptions3 = {
    1: "В архитектуре Возрождения симметрия и пропорция были основополагающими принципами. Архитекторы использовали математические расчёты для создания гармоничных зданий, где все элементы были связаны определёнными пропорциональными соотношениями, часто основанными на золотом сечении.",
    2: "Ордерная система — это система архитектурных ордеров (дорический, ионический, коринфский), унаследованная от античности. Архитекторы Возрождения возродили использование классических ордеров, применяя их для создания структурированных и гармоничных фасадов зданий.",
    3: "Купольное перекрытие стало одним из главных достижений архитектуры Возрождения. Массивные купола, опирающиеся на барабан, символизировали небесный свод и создавали впечатляющие внутренние пространства, как в соборе Святого Петра в Риме."
};

// Функция инициализации архитектурных карточек
function initArchitectureCards() {
    const modalOverlay3 = document.getElementById('modalOverlay3');
    const modalContent3 = document.getElementById('modalContent3');
    const detailButtons3 = document.querySelectorAll('.details-btn3');
    
    if (!modalOverlay3 || detailButtons3.length === 0) return;
    
    // Функция открытия модального окна архитектуры
    function openModal3(card) {
        const cardId = card.getAttribute('data-id');
        const isReversed = card.classList.contains('reversed');
        
        // Получаем содержимое карточки
        const cardTop = card.querySelector('.card-top3').innerHTML;
        const cardBottom = card.querySelector('.card-bottom3').innerHTML;
        const description = ideaDescriptions3[cardId];
        
        // Заполняем модальное окно
        document.getElementById('modalTop3').innerHTML = cardTop;
        document.getElementById('modalBottom3').innerHTML = cardBottom;
        document.getElementById('modalDescription3').innerHTML = description;
        
        // Если карточка перевернута, меняем порядок
        if (isReversed) {
            modalContent3.classList.add('reversed-modal');
        } else {
            modalContent3.classList.remove('reversed-modal');
        }
        
        // Показываем модальное окно
        modalOverlay3.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия модального окна архитектуры
    function closeModal3() {
        modalOverlay3.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Обработчики событий для кнопок архитектуры
    detailButtons3.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.idea-card3');
            openModal3(card);
        });
    });
    
    // Закрытие по клику на оверлей архитектуры
    modalOverlay3.addEventListener('click', (e) => {
        if (e.target === modalOverlay3) {
            closeModal3();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay3.classList.contains('active')) {
            closeModal3();
        }
    });
    
    // Предотвращаем закрытие при клике на контент архитектуры
    if (modalContent3) {
        modalContent3.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Адаптивность для архитектурных карточек
    if (window.innerWidth <= 768) {
        const architectureCards = document.querySelectorAll('.idea-card3');
        architectureCards.forEach(card => {
            card.style.marginTop = '0';
            const btn = card.querySelector('.btn');
            if (btn) btn.style.opacity = '0.8';
        });
    }
}

// Инициализация при загрузке (обновите существующую функцию)
document.addEventListener('DOMContentLoaded', function() {
    initIdeaCards();
    initArchitectureCards();
    
    // Ресайз для архитектурных карточек
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            const architectureCards = document.querySelectorAll('.idea-card3');
            architectureCards.forEach(card => {
                card.style.marginTop = '0';
                const btn = card.querySelector('.btn');
                if (btn) btn.style.opacity = '0.8';
            });
            
            const ideaCards = document.querySelectorAll('.idea-card');
            ideaCards.forEach(card => {
                card.style.marginTop = '0';
                const btn = card.querySelector('.btn');
                if (btn) btn.style.opacity = '0.8';
            });
        } else {
            // Восстанавливаем оригинальные стили на десктопе
            const architectureCards = document.querySelectorAll('.idea-card3');
            architectureCards.forEach((card, index) => {
                if (index === 0 || index === 2) {
                    card.style.marginTop = '-20px';
                }
                if (index === 1) {
                    card.style.marginTop = '20px';
                }
                const btn = card.querySelector('.btn');
                if (btn) btn.style.opacity = '0';
            });
            
            const ideaCards = document.querySelectorAll('.idea-card');
            ideaCards.forEach((card, index) => {
                if (index === 0 || index === 2) {
                    card.style.marginTop = '-20px';
                }
                if (index === 1) {
                    card.style.marginTop = '20px';
                }
                const btn = card.querySelector('.btn');
                if (btn) btn.style.opacity = '0';
            });
        }
    });
});






// Архитектурный слайдер с уникальными названиями
document.addEventListener('DOMContentLoaded', function() {
    const architecturalCards = document.querySelectorAll('.architectural-card');
    const pietreDorata = document.querySelectorAll('.pietra-dorata');
    const capitelloPrev = document.querySelector('.capitello-prev');
    const capitelloNext = document.querySelector('.capitello-next');
    let indiceCorrente = 0;
    const totaleProgetti = architecturalCards.length;
    
    // Функция для показа конкретного проекта
    function mostraProgetto(indiceProgetto) {
        // Nascondi tutte le carte
        architecturalCards.forEach(carta => {
            carta.classList.remove('basilica-active');
        });
        pietreDorata.forEach(pietra => {
            pietra.classList.remove('pietra-attiva');
        });
        
        // Mostra il progetto selezionato
        architecturalCards[indiceProgetto].classList.add('basilica-active');
        pietreDorata[indiceProgetto].classList.add('pietra-attiva');
        indiceCorrente = indiceProgetto;
    }
    
    // Funzione per il prossimo progetto
    function prossimoProgetto() {
        let nuovoIndice = indiceCorrente + 1;
        if (nuovoIndice >= totaleProgetti) {
            nuovoIndice = 0;
        }
        mostraProgetto(nuovoIndice);
    }
    
    // Funzione per il progetto precedente
    function progettoPrecedente() {
        let nuovoIndice = indiceCorrente - 1;
        if (nuovoIndice < 0) {
            nuovoIndice = totaleProgetti - 1;
        }
        mostraProgetto(nuovoIndice);
    }
    
    // Gestori eventi per i capitelli
    capitelloPrev.addEventListener('click', progettoPrecedente);
    capitelloNext.addEventListener('click', prossimoProgetto);
    
    // Gestori eventi per le pietre dorate
    pietreDorata.forEach((pietra, indice) => {
        pietra.addEventListener('click', () => {
            mostraProgetto(indice);
        });
    });
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'ArrowLeft') {
            progettoPrecedente();
        } else if (evento.key === 'ArrowRight') {
            prossimoProgetto();
        }
    });
    
    // Инициализация первого проекта
    mostraProgetto(0);
});



// Функция для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Функция для обработки анимации овалов
function animateOvalsOnScroll() {
    const ovalContainer = document.querySelector('.oval-container');
    
    if (ovalContainer && !ovalContainer.classList.contains('animated')) {
        if (isElementInViewport(ovalContainer)) {
            const ovals = document.querySelectorAll('.oval-animate');
            
            // Добавляем класс для запуска анимации
            ovals.forEach(oval => {
                oval.classList.add('animated');
            });
            
            // Помечаем контейнер как анимированный
            ovalContainer.classList.add('animated');
        }
    }
}

// Функция для анимации с задержкой между элементами
function animateWithDelay() {
    const ovalContainer = document.querySelector('.oval-container');
    
    if (ovalContainer && !ovalContainer.classList.contains('animated')) {
        if (isElementInViewport(ovalContainer)) {
            const ovals = document.querySelectorAll('.oval-animate');
            
            // Анимируем каждый овал с задержкой
            ovals.forEach((oval, index) => {
                setTimeout(() => {
                    oval.classList.add('animated');
                }, index * 200); // Задержка 200ms между каждым овалом
            });
            
            ovalContainer.classList.add('animated');
        }
    }
}

// Инициализация анимации при загрузке и прокрутке
document.addEventListener('DOMContentLoaded', function() {
    // Первая проверка при загрузке
    animateOvalsOnScroll();
    
    // Проверка при прокрутке
    window.addEventListener('scroll', function() {
        animateOvalsOnScroll();
        // или используйте animateWithDelay() для поэтапной анимации
    });
    
    // Также проверяем при изменении размера окна
    window.addEventListener('resize', animateOvalsOnScroll);
});

// Альтернатива: Использование Intersection Observer API (рекомендуется)
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ovalContainer = entry.target;
                const ovals = ovalContainer.querySelectorAll('.oval-animate');
                
                // Анимация с задержкой для каждого овала
                ovals.forEach((oval, index) => {
                    setTimeout(() => {
                        oval.classList.add('animated');
                    }, index * 200);
                });
                
                ovalContainer.classList.add('animated');
                observer.unobserve(ovalContainer);
            }
        });
    }, observerOptions);
    
    const ovalContainer = document.querySelector('.oval-container');
    if (ovalContainer) {
        observer.observe(ovalContainer);
    }
}

// Инициализация Intersection Observer при загрузке
document.addEventListener('DOMContentLoaded', initIntersectionObserver);






// =============================================
// МОБИЛЬНОЕ МЕНЮ ДЛЯ СТРАНИЦЫ КУЛЬТУРЫ
// =============================================

// Функция определения мобильного устройства
function isMobileDevice() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Функции для мобильного меню
function setupMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileIndicator = document.querySelector('.mobile-menu-indicator');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!sidebar || !mobileIndicator || !menuOverlay) {
        console.error('Не найдены элементы меню:', {
            sidebar: !!sidebar,
            indicator: !!mobileIndicator,
            overlay: !!menuOverlay
        });
        return;
    }
    
    console.log('Настройка мобильного меню...');
    
    // Функция открытия меню
    function openMenu() {
        console.log('Открываем меню');
        sidebar.classList.add('open');
    }
    
    // Функция закрытия меню
    function closeMenu() {
        console.log('Закрываем меню');
        sidebar.classList.remove('open');
    }
    
    // Клик по индикатору
    mobileIndicator.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (sidebar.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Клик по оверлею
    menuOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMenu();
    });
    
    // Клик по ссылкам в меню
    const menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeMenu();
        });
    });
    
    // Клик вне меню
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            e.target !== mobileIndicator) {
            closeMenu();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Добавляем touch события для лучшей работы на мобильных
    mobileIndicator.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.click();
    }, { passive: false });
    
    // Убедимся, что индикатор видим
    mobileIndicator.style.display = 'flex';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, проверяем устройство...');
    
    if (isMobileDevice()) {
        console.log('Мобильное устройство обнаружено');
        setupMobileMenu();
        
        // Убедимся, что индикатор виден
        const indicator = document.querySelector('.mobile-menu-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
        }
    } else {
        console.log('Десктопное устройство');
        // Скрываем мобильный индикатор на десктопе
        const mobileIndicator = document.querySelector('.mobile-menu-indicator');
        if (mobileIndicator) {
            mobileIndicator.style.display = 'none';
        }
    }
});

// Обновляем при изменении размера окна
window.addEventListener('resize', function() {
    const mobileIndicator = document.querySelector('.mobile-menu-indicator');
    
    if (isMobileDevice()) {
        console.log('Изменение размера: мобильный режим');
        if (mobileIndicator) {
            mobileIndicator.style.display = 'flex';
        }
        setupMobileMenu();
    } else {
        console.log('Изменение размера: десктопный режим');
        if (mobileIndicator) {
            mobileIndicator.style.display = 'none';
        }
        // Закрываем меню при переходе на десктоп
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }
});
