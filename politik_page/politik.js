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






// ==================== МОБИЛЬНОЕ МЕНЮ ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuIndicator = document.querySelector('.menu-indicator');
    const sidebar = document.querySelector('.sidebar');
    
    // Проверяем мобильное устройство
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Функция управления меню
    function toggleMenu() {
        sidebar.classList.toggle('active');
        menuIndicator.classList.toggle('active');
    }
    
    // Обработчик для индикатора меню
    if (menuIndicator) {
        menuIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && isMobile()) {
            if (!sidebar.contains(e.target) && !menuIndicator.contains(e.target)) {
                sidebar.classList.remove('active');
                menuIndicator.classList.remove('active');
            }
        }
    });
    
    // Закрытие меню при клике на ссылку
    const menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobile()) {
                sidebar.classList.remove('active');
                menuIndicator.classList.remove('active');
            }
        });
    });
    
    // Адаптация на изменение размера окна
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            // На десктопе сбрасываем активное состояние
            sidebar.classList.remove('active');
            if (menuIndicator) {
                menuIndicator.classList.remove('active');
            }
        }
    });
    
    // На мобильных отключаем hover-эффекты для меню
    if (isMobile()) {
        // Отключаем стандартное поведение hover
        sidebar.style.pointerEvents = 'auto';
    }
});







// Данные о правителях
const rulers = [
    {
        name: 'Высшая знать',
        desc: 'Высшая знать в эпоху Возрождения обладала исключительными привилегиями: владела землей с правом суда над крестьянами, освобождалась от налогов и монополизировала высшие государственные и военные должности. Они жили в замках и городских дворцах, получали рыцарское воспитание и активно покровительствовали искусствам, заказывая произведения у великих художников для укрепления своего престижа. Политически аристократия доминировала, занимая ключевые посты при дворах, управляя провинциями и участвуя в дипломатии.'
    },
    {
        name: 'Духовенство',
        desc: 'Духовенство обладало церковным иммунитетом, освобождением от налогов и владело обширными землями, собирая десятину. Высшие иерархи, часто из знатных семей, жили в роскоши, покровительствуя искусствам и наукам — папский двор в Риме стал центром культурной жизни. Политически церковь была мощной силой: папство вмешивалось в дела государств, влияло на коронацию монархов, а кардиналы занимали важные государственные посты, хотя к концу эпохи авторитет духовенства был подорван коррупцией и чрезмерной роскошью.'
    },
    {
        name: 'Буржуазия',
        desc: 'Купцы и банкиры, новая экономическая элита, наживали состояния на международной торговле, банковских операциях и кредитовании монархов, разрабатывая новые финансовые инструменты вроде векселей и двойной бухгалтерии. Их роль в экономике была фундаментальной: они финансировали государства, организовывали трансконтинентальную торговлю и стимулировали урбанизацию.'
    },
    {
        name: 'Ремесленичество',
        desc: 'Ремесленники, объединенные в цехи, регулировали качество продукции, цены и доступ к профессии через систему ученичества, обеспечивая социальную защиту своим членам. Их повседневная жизнь была строго регламентирована: длинный рабочий день, обучение с раннего возраста, а мастерские часто располагались в жилых домах. Ремесленники производили товары для местного рынка и экспорта — от флорентийских тканей до венецианского стекла — способствуя технологическим инновациям и участвуя в городском самоуправлении.'
    },
    {
        name: 'Крестьянство',
        desc: 'Крестьяне и городская беднота жили в тяжелых условиях: крестьяне — в простых домах, с скудным питанием и низкой продолжительностью жизни, выполняя барщину, оброк и платя десятину, будучи прикреплены к земле. Городская беднота — поденщики, слуги и нищие — ютилась в перенаселенных кварталах, работая за мизерную плату без социальной защиты. Восстания, такие как крестьянская война в Германии, вспыхивали из-за непосильных повинностей и налогов, но жестоко подавлялись, хотя иногда вынуждали власти к уступкам.'
    }
];

// Инициализация слайдера
$(document).ready(function() {
    var $carousel = $('.carousel');
    
    $carousel.on('beforeChange', function(event, slick, currentSlide, newSlide) {
        if (newSlide !== currentSlide) {
            $('.item-content').animate({ opacity: 0}, 150);
        }
    }).on('afterChange', function(event, slick, currentSlide) {
        $('.item-content').animate({ opacity: 1}, 150);
        $('#ruler-name').html(rulers[currentSlide].name);
        $('#ruler-desc').html(rulers[currentSlide].desc);
        
        // Обновляем прогресс-бар
        const progress = ((currentSlide + 1) / rulers.length) * 100;
        $('.progress-bar__value').css('width', progress + '%');
    }).on('init', function(event, slick) {
        $('#ruler-name').html(rulers[0].name);
        $('#ruler-desc').html(rulers[0].desc);
    });
    
    $carousel.slick({
        infinite: false,
        vertical: true,
        verticalSwiping: true,
        centerPadding: '40px',
        speed: 300,
        focusOnSelect: true,
        arrows: false,
        dots: false,
        swipeToSlide: true,
        touchThreshold: 10
    });
    
    // Управление клавиатурой
    $(document).keydown(function(event) {
        var currentSlide = $carousel.slick('slickCurrentSlide');
        
        // Стрелка вниз - следующий слайд
        if (event.keyCode === 40 && currentSlide < rulers.length - 1) {
            $carousel.slick('slickNext');
            event.preventDefault();
        }
        // Стрелка вверх - предыдущий слайд
        else if (event.keyCode === 38 && currentSlide > 0) {
            $carousel.slick('slickPrev');
            event.preventDefault();
        }
    });
    
    // Управление колесиком мыши
    $('.carousel-container').on('wheel', function(event) {
        event.preventDefault();
        var delta = event.originalEvent.deltaY;
        var currentSlide = $carousel.slick('slickCurrentSlide');
        
        if (delta > 0 && currentSlide < rulers.length - 1) {
            $carousel.slick('slickNext');
        } else if (delta < 0 && currentSlide > 0) {
            $carousel.slick('slickPrev');
        }
    });
    
    // Кнопки эпох
    $('.level-btn').click(function() {
        const btnText = $(this).val();
        alert('Выбрана ' + btnText + ' правителей Возрождения');
    });
    
    // Анимация при наведении на элементы слайдера
    $('.ruler').hover(
        function() {
            $(this).css('transform', 'translateY(-15px) rotateX(10deg) scale(1.05)');
        },
        function() {
            $(this).css('transform', 'translateY(0) rotateX(0) scale(1)');
        }
    );
});








// Данные для описаний
const ideaDescriptions = {
    1: "Никколо Макиавелли (1469–1527) обосновал, что принципы, на основе которых функционирует государство, определяются не божественным откровением, а природой человека, его разумом и опытом. В труде «Государь» Макиавелли анализировал политику не с позиций «должного», а с позиций «сущего».",
    2: "Идею государственного суверенитета разработал Жак Боден (1530–1596) в работе «Шесть книг о республике». Суверенитет, считал Боден, — самый существенный признак государства, это высшая, постоянная и абсолютная власть в политическом сообществе.",
    3: "Концепция «смешанного» государственного строя в XVI веке формулируется и получает широкую поддержку. Это концепция, включающая элементы монархии, аристократии и народовластия, и отличающаяся наибольшей прочностью и устойчивостью.",
    4: "Мыслители Возрождения считали, что неравномерное распределение богатств и собственности — источник зла и бедствий людей. Например, Томас Мор в работе «Утопия» критиковал современные ему социально-экономические отношения и давал изображение общества, где господствует общественная собственность."
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
