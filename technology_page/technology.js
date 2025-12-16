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









/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 100))
    active = Math.floor(progress/100*($items.length-1))
    
    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i/$items.length) * 100 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel
    progress = progress + wheelProgress
    animate()
}

const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)










// Инициализация карты после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    const map = L.map('antique-map', {
        center: [20, 20], // Центр карты (широта, долгота)
        zoom: 3,
        minZoom: 1,
        maxZoom: 6,
        scrollWheelZoom: true,
        attributionControl: false,
        zoomControl: false // Сначала отключим, потом добавим кастомный
    });

    // Границы изображения карты
    // Важно: настройте эти значения под ваше изображение!
    // Формат: [[южная_граница, западная_граница], [северная_граница, восточная_граница]]
    const imageBounds = [[-70, -180], [90, 180]];

    // Загрузка изображения карты
    // ЗАМЕНИТЕ 'map.jpg' на путь к вашему файлу карты!
    L.imageOverlay('image/карта.jpg', imageBounds, {
        opacity: 0.95,
        interactive: true,
        alt: 'Старинная карта мира ORBIS TERRARUM'
    }).addTo(map);
    map.fitBounds(imageBounds);

    // Установка границ просмотра
    map.setMaxBounds(imageBounds);

    // Создаем кастомную иконку для маркеров
    const customIcon = L.divIcon({
        className: 'antique-marker',
        html: '<div style="width: 20px; height: 20px; background-color: #8b4513; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Функция для создания маркеров
    function createMarker(lat, lng, title, content) {
        const marker = L.marker([lat, lng], {
            title: title,
            icon: customIcon
        }).addTo(map);
        
        marker.bindPopup(`
            <div class="custom-popup">
                <div class="popup-title">${title}</div>
                ${content}
            </div>
        `);
        
        return marker;
    }

    // Примеры маркеров (замените на свои данные)
    createMarker(
        44, -60, "Америка (1492)",
        `<p>Колумб достиг Багамских островов, открыв Новый Свет.</p>
         <p><em>Особенность:</em> Считал, что нашёл путь в Азию.</p>`
    );
    
    createMarker(
        50, 16, "Мыс Бохадор (1434)",
        `<p>Португалец Жил Эанеш обогнул мыс на западном побережье Африки, считавшийся непроходимым.</p>
         <p><em>Особенность:</em> Психологический прорыв для моряков, старт португальской экспансии вдоль Африки</p>`
    );
    
    createMarker(
        6, 55, "Мыс доброй надежды (1488)",
        `<p>Португальский мореплаватель Бартоломеу Диаш первым из европейцев обогнул южную границу африки, достигнув мыса, название которого символизировало открытие долгожданного морского пути в Индию</p>
         <p><em>Особенность:</em> Открытие связующего звена между Европой и Восточной Азией</p>`
    );
    
    createMarker(
        21, -10, "Бразилия (1500)",
        `<p>Португальская флотилия Кабрала, следуя в Индию, достигла восточного побережья Южной Америки</p>
         <p><em>Особенность:</em> Случайное открытие из-за отклонения маршрута</p>`
    );
    
    createMarker(
        32, -67, "Тихий океан (1513)",
        `<p>Испанский конкистадор Васко Нуньес де Бальбоа с отрядом пересек Панамский перешеек и первым из европейцев увидел Тихий океан</p>
         <p><em>Особенность:</em> Доказано, что за Америкой простирается еще 1 огромный океан</p>`
    );
    
    createMarker(
        58, -49, "Ньюфаундленд (1497)",
        `<p>Джон Кабот открыл остров для Англии.</p>
         <p><em>Особенность:</em> Основа английских претензий на Северную Америку</p>`
    );
    
    createMarker(
        29, -30, "Амазонка (1542)",
        `<p>Испанский конкистадор Франсиско де Орельяна совершил первое полное плавание по реке Амазонке от Анд до Атлантики</p>
         <p><em>Особенность:</em> Открытие великой реки по водоносности и длине, доказательство огромных размеров Южной Америки</p>`
    );
    
    createMarker(
        -11, -60, "Магелланов пролив (1520)",
        `<p>Экспедиция Магеллана нашла проход из Атлантики н аюге Южной Америки</p>
         <p><em>Особенность:</em> Единственный сложный, но проходимый пролив между океанами. Позволил Магеллану выйти в Тихий океан и совершить первое кругосветное путешествие</p>`
    );
    
    createMarker(
        60, 140, "Япония (1543)",
        `<p>Португальские моряки Мендиш Пинту достигли острова Японии.</p>
         <p><em>Особенность:</em> Начало торговых и культурных контактов Европы с Японией. В страну попало огнестрельное оружие "танэгасима"</p>`
    );
    
    createMarker(
        42, 136, "Открытие Великих Зондских островов (Индонезии) 1648",
        `<p>После плавания Магеллана (1521) и экспедиций португальцев (начиная с 1512) европейцы достигли островов Индонезии</p>
         <p><em>Особенность:</em> Главная ель эпохи - "Острова пряностей" (Моллукские острова). Начало юорьбы Португалии, Испании и после Голландии за контроль над торговлей пряностями</p>`
    );

    createMarker(
        70, 122, "Пролив Дежнёва (1648)",
        `<p>Экспедиция <b>Семёна Дежнёва</b> прошла из Ледовитого в Тихий океан.</p>
         <p><em>Особенность:</em> Открытие стало известно лишь через 100 лет.</p>`
    );


    // Добавление элементов управления
    // Кнопки масштаба
    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Кастомная кнопка для сброса вида
    const ResetViewControl = L.Control.extend({
        onAdd: function(map) {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            const button = L.DomUtil.create('a', 'reset-view-btn', container);
            button.innerHTML = '↻';
            button.href = '#';
            button.title = 'Сбросить вид к исходному';
            
            L.DomEvent.on(button, 'click', function(e) {
                L.DomEvent.stopPropagation(e);
                L.DomEvent.preventDefault(e);
                map.fitBounds(imageBounds);
                map.setZoom(2);
            });
            
            return container;
        }
    });
    
    new ResetViewControl({ position: 'topright' }).addTo(map);

    // Функция для адаптации размера карты
    function resizeMap() {
        map.invalidateSize();
        // Небольшая задержка для корректного отображения
        setTimeout(() => {
            map.fitBounds(imageBounds);
        }, 100);
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', resizeMap);
    

    // Инициализация при загрузке
    resizeMap();

    // Добавляем информацию об использовании в консоль
    console.log('Интерактивная карта ORBIS TERRARUM загружена');
    console.log('Используйте функции:');
    console.log('- Перетаскивание: зажатая левая кнопка мыши');
    console.log('- Масштабирование: колесо мыши или кнопки +/-');
    console.log('- Клик по маркеру: открытие информации');
});








document.addEventListener('DOMContentLoaded', function() {
  
    // Находим все элементы для анимации
    const animatedElements = document.querySelectorAll('[data-animate="true"]');
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
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
    }
    
    // Запускаем сразу и при скролле
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Для отладки
    console.log('Таймлайн загружен. Элементов для анимации:', animatedElements.length);
  });
