// Создаем курсоры для модального окна
const modalCursor = document.createElement('div');
modalCursor.className = 'modal-cursor';
const modalFollower = document.createElement('div');
modalFollower.className = 'modal-cursor-follower';
document.body.appendChild(modalCursor);
document.body.appendChild(modalFollower);

// Основной курсор
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

// Функция для управления курсором
function initCursor(cursorEl, followerEl, scope = document) {
    scope.addEventListener('mousemove', function trackMouse(e) {
        cursorEl.style.left = e.clientX + 'px';
        cursorEl.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            followerEl.style.left = e.clientX + 'px';
            followerEl.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Эффекты при наведении
    function addCursorEffects(element) {
        element.addEventListener('mouseenter', () => {
            cursorEl.style.transform = 'scale(2)';
            followerEl.style.transform = 'scale(1.5)';
            followerEl.style.borderColor = '#fff';
            followerEl.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorEl.style.transform = 'scale(1)';
            followerEl.style.transform = 'scale(1)';
            followerEl.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            followerEl.style.background = 'transparent';
        });
    }
    
    // Добавляем эффекты ко всем интерактивным элементам
    const interactiveElements = scope.querySelectorAll('a, button, .start-test-btn, .option-btn, .nav-btn, .result-btn, .tab-btn, .draggable-item, .drop-zone, .indicator-dot, .close-btn, .timeline-item, .map-pin, .map-zone');
    interactiveElements.forEach(addCursorEffects);
    
    // Эффект при клике
    scope.addEventListener('mousedown', () => {
        cursorEl.style.transform = 'scale(0.5)';
        followerEl.style.transform = 'scale(0.8)';
    });
    
    scope.addEventListener('mouseup', () => {
        cursorEl.style.transform = 'scale(1)';
        followerEl.style.transform = 'scale(1)';
    });
}

// Инициализируем основной курсор
initCursor(cursor, follower);

// ====================== ТЕСТЫ ======================

function applyTestCardGradients() {
    const testCards = document.querySelectorAll('.test-card');
    
    testCards.forEach(card => {
        const testId = card.dataset.test;
        const header = card.querySelector('.test-header');
        
        if (!header) return;
        
        // Убираем любые inline стили
        header.style.backgroundImage = 'none';
        header.style.backgroundColor = 'transparent';
        
        // Применяем градиенты
        switch(testId) {
            case '1':
                header.style.background = 'linear-gradient(135deg,rgb(78, 45, 23) 0%,  #F5DEB3 100%)';
                break;
            case '2':
                header.style.background = 'linear-gradient(135deg,rgb(112, 30, 30) 0%, #F5DEB3 100%)';
                break;
            case '3':
                header.style.background = 'linear-gradient(135deg,rgb(29, 47, 98) 0%, #F5DEB3 100%)';
                break;
            case '4':
                header.style.background = 'linear-gradient(135deg,rgb(47, 87, 64) 0%, #F5DEB3 100%)';
                break;
        }
    });
}

// Вызываем при загрузке страницы
document.addEventListener('DOMContentLoaded', applyTestCardGradients);

// Объект для хранения данных тестов
const testsData = {
    1: { // Тест по культуре
        title: "Культура и искусство Возрождения",
        questions: [
            {
                id: 1,
                text: "Кто создал технику 'сфумато'?",
                options: [
                    "Леонардо да Винчи",
                    "Микеланджело Буонарроти",
                    "Рафаэль Санти",
                    "Тициан Вечеллио"
                ],
                correct: 0,
                explanation: "Леонардо да Винчи мастерски использовал технику сфумато для создания мягких, дымчатых переходов между цветами."
            },
            {
                id: 2,
                text: "Какой архитектор создал купол собора Санта-Мария-дель-Фьоре?",
                options: [
                    "Филиппо Брунеллески",
                    "Донато Браманте",
                    "Андреа Палладио",
                    "Микеланджело"
                ],
                correct: 0,
                explanation: "Филиппо Брунеллески создал гениальный купол диаметром 42 метра без использования поддерживающих лесов."
            },
            {
                id: 3,
                text: "Как называется знаменитая фреска Рафаэля в Ватикане?",
                options: [
                    "Афинская школа",
                    "Тайная вечеря",
                    "Сотворение Адама",
                    "Весна"
                ],
                correct: 0,
                explanation: "'Афинская школа' - одна из четырех фресок Рафаэля в Станце делла Сеньятура в Ватикане."
            },
            {
                id: 4,
                text: "Какой художник создал 'Рождение Венеры'?",
                options: [
                    "Сандро Ботичелли",
                    "Леонардо да Винчи",
                    "Тициан",
                    "Альбрехт Дюрер"
                ],
                correct: 0,
                explanation: "Сандро Ботичелли создал 'Рождение Венеры' - одно из самых известных произведений эпохи Раннего Возрождения."
            },
            {
                id: 5,
                text: "Что означает термин 'перспектива' в живописи Возрождения?",
                options: [
                    "Техника создания иллюзии глубины на плоскости",
                    "Использование светотени",
                    "Техника смешивания красок",
                    "Изображение эмоций на лицах персонажей"
                ],
                correct: 0,
                explanation: "Перспектива - это математически обоснованная техника создания иллюзии трехмерного пространства на двухмерной поверхности."
            },
            {
                id: 6,
                text: "Какой архитектурный элемент характерен для Ренессанса?",
                options: [
                    "Колонны с капителями",
                    "Готические аркбутаны",
                    "Византийские купола",
                    "Романские полукруглые арки"
                ],
                correct: 0,
                explanation: "Возрождение античных ордерных систем с колоннами стало характерной чертой архитектуры Ренессанса."
            },
            {
                id: 7,
                text: "Кто из перечисленных художников был немецким мастером Северного Возрождения?",
                options: [
                    "Альбрехт Дюрер",
                    "Тициан",
                    "Рафаэль",
                    "Боттичелли"
                ],
                correct: 0,
                explanation: "Альбрехт Дюрер был ведущим художником немецкого Возрождения, мастером гравюры."
            },
            {
                id: 8,
                text: "Что такое 'кьяроскуро'?",
                options: [
                    "Контрастное использование света и тени",
                    "Техника рисования фресок",
                    "Создание миниатюр",
                    "Использование золотого фона"
                ],
                correct: 0,
                explanation: "Кьяроскуро (итал. chiaroscuro) - техника контрастного распределения света и тени для создания объема."
            },
            {
                id: 9,
                text: "Какой период Возрождения считается вершиной развития искусства?",
                options: [
                    "Высокое Возрождение",
                    "Проторенессанс",
                    "Раннее Возрождение",
                    "Позднее Возрождение"
                ],
                correct: 0,
                explanation: "Высокое Возрождение (конец XV - начало XVI века) считается пиком развития искусства Ренессанса."
            },
            {
                id: 10,
                text: "Какая техника была характерна для венецианской школы живописи?",
                options: [
                    "Использование насыщенного колорита",
                    "Четкий линейный рисунок",
                    "Монохромная палитра",
                    "Иконописные традиции"
                ],
                correct: 0,
                explanation: "Венецианские художники, такие как Тициан и Веронезе, славились богатым колоритом и работой с цветом."
            }
        ]
    },
    
    2: { // Тест по политике
        title: "Политика и общество эпохи Возрождения",
        questions: [
            {
                id: 1,
                text: "Какой правитель Флоренции был прозван 'Великолепным'?",
                options: [
                    "Лоренцо Медичи",
                    "Чезаре Борджиа",
                    "Франческо Сфорца",
                    "Козимо Медичи"
                ],
                correct: 0,
                explanation: "Лоренцо Медичи (1449-1492) был правителем Флоренции и покровителем искусств."
            },
            {
                id: 2,
                text: "Какая форма правления была характерна для Флоренции в XV веке?",
                options: [
                    "Олигархическая республика",
                    "Абсолютная монархия",
                    "Теократия",
                    "Демократия"
                ],
                correct: 0,
                explanation: "Флоренция была республикой, где реальная власть принадлежала богатым семьям, особенно Медичи."
            },
            {
                id: 3,
                text: "Что такое 'принципат' в политической мысли Возрождения?",
                options: [
                    "Единовластие правителя-принца",
                    "Республиканское правление",
                    "Аристократическая олигархия",
                    "Городское самоуправление"
                ],
                correct: 0,
                explanation: "Принципат - форма правления, описанная Макиавелли, где власть сосредоточена в руках одного правителя."
            },
            {
                id: 4,
                text: "Кто автор трактата 'Государь'?",
                options: [
                    "Никколо Макиавелли",
                    "Томас Мор",
                    "Эразм Роттердамский",
                    "Франческо Гвиччардини"
                ],
                correct: 0,
                explanation: "Никколо Макиавелли написал 'Государя' - классический труд о политической власти."
            },
            {
                id: 5,
                text: "Как называлась банкирская династия, правившая Флоренцией?",
                options: [
                    "Медичи",
                    "Борджиа",
                    "Сфорца",
                    "Эсте"
                ],
                correct: 0,
                explanation: "Семья Медичи была банкирской династией, которая фактически правила Флоренцией с XV века."
            },
            {
                id: 6,
                text: "Что означало понятие 'вирту' у Макиавелли?",
                options: [
                    "Личные качества правителя для удержания власти",
                    "Божественная благодать",
                    "Аристократическое происхождение",
                    "Военная доблесть"
                ],
                correct: 0,
                explanation: "Вирту - комплекс качеств (ум, сила воли, гибкость), необходимых правителю для успешного правления."
            },
            {
                id: 7,
                text: "Какое государство было самым могущественным на Апеннинском полуострове в XV веке?",
                options: [
                    "Флорентийская республика",
                    "Папская область",
                    "Венецианская республика",
                    "Миланское герцогство"
                ],
                correct: 2,
                explanation: "Венецианская республика была самой богатой и могущественной благодаря своей морской торговле."
            },
            {
                id: 8,
                text: "Что такое 'синьория' в итальянских городах-государствах?",
                options: [
                    "Правящий совет",
                    "Народное собрание",
                    "Судебный орган",
                    "Военное командование"
                ],
                correct: 0,
                explanation: "Синьория - правящий совет или правительство в итальянских городах-государствах."
            },
            {
                id: 9,
                text: "Кто был знаменитым правителем-кондотьером?",
                options: [
                    "Франческо Сфорца",
                    "Лоренцо Медичи",
                    "Папа Александр VI",
                    "Дож Венеции"
                ],
                correct: 0,
                explanation: "Франческо Сфорца был кондотьером (наемным военачальником), который стал герцогом Милана."
            },
            {
                id: 10,
                text: "Какой политический строй предложил Томас Мор в 'Утопии'?",
                options: [
                    "Социалистическое общество без частной собственности",
                    "Абсолютная монархия",
                    "Теократическое государство",
                    "Аристократическая республика"
                ],
                correct: 0,
                explanation: "Томас Мор в 'Утопии' описал идеальное общество без частной собственности и социального неравенства."
            }
        ]
    },
    
    3: { // Тест по науке и технологиям
        title: "Наука и технологии эпохи Возрождения",
        questions: [
            {
                id: 1,
                text: "Кто создал гелиоцентрическую модель Вселенной?",
                options: [
                    "Николай Коперник",
                    "Галилео Галилей",
                    "Иоганн Кеплер",
                    "Тихо Браге"
                ],
                correct: 0,
                explanation: "Николай Коперник предложил гелиоцентрическую систему в работе 'О вращении небесных сфер' (1543)."
            },
            {
                id: 2,
                text: "Какое изобретение Гутенберга произвело революцию в распространении знаний?",
                options: [
                    "Печатный станок с подвижными литерами",
                    "Телескоп",
                    "Микроскоп",
                    "Часы с маятником"
                ],
                correct: 0,
                explanation: "Иоганн Гутенберг изобрел печатный станок с подвижными металлическими литерами около 1440 года."
            },
            {
                id: 3,
                text: "Кто первым начал систематическое изучение анатомии человека на основе вскрытий?",
                options: [
                    "Андреас Везалий",
                    "Леонардо да Винчи",
                    "Гален",
                    "Парацельс"
                ],
                correct: 0,
                explanation: "Андреас Везалий в работе 'О строении человеческого тела' (1543) исправил многие ошибки Галена."
            },
            {
                id: 4,
                text: "Что такое 'квадрант'?",
                options: [
                    "Навигационный инструмент для определения широты",
                    "Астрономический телескоп",
                    "Медицинский инструмент",
                    "Строительный прибор"
                ],
                correct: 0,
                explanation: "Квадрант использовался мореплавателями для определения широты по положению звезд."
            },
            {
                id: 5,
                text: "Кто усовершенствовал телескоп и сделал важные астрономические открытия?",
                options: [
                    "Галилео Галилей",
                    "Николай Коперник",
                    "Исаак Ньютон",
                    "Тихо Браге"
                ],
                correct: 0,
                explanation: "Галилей создал телескоп с 30-кратным увеличением и открыл спутники Юпитера, фазы Венеры и др."
            },
            {
                id: 6,
                text: "Какой вклад в географию внес Фернан Магеллан?",
                options: [
                    "Первое кругосветное плавание",
                    "Открытие Америки",
                    "Открытие морского пути в Индию",
                    "Картографирование Африки"
                ],
                correct: 0,
                explanation: "Экспедиция Магеллана (1519-1522) совершила первое кругосветное плавание, доказав шарообразность Земли."
            },
            {
                id: 7,
                text: "Что изучал Леонардо да Винчи в своих анатомических исследованиях?",
                options: [
                    "Строение человеческого тела",
                    "Поведение животных",
                    "Строение растений",
                    "Геологию Земли"
                ],
                correct: 0,
                explanation: "Леонардо провел множество вскрытий и создал подробные анатомические рисунки, опередившие свое время."
            },
            {
                id: 8,
                text: "Какое значение имело изобретение очков?",
                options: [
                    "Позволило продлить активную жизнь ученых и мастеров",
                    "Улучшило военную тактику",
                    "Ускорило морскую навигацию",
                    "Повысило производительность в сельском хозяйстве"
                ],
                correct: 0,
                explanation: "Очки позволили людям с плохим зрением продолжать работать в преклонном возрасте."
            },
            {
                id: 9,
                text: "Что такое 'астролябия'?",
                options: [
                    "Астрономический прибор для определения положения звезд",
                    "Медицинский инструмент",
                    "Архитектурный инструмент",
                    "Музыкальный инструмент"
                ],
                correct: 0,
                explanation: "Астролябия использовалась для решения задач, связанных со временем и положением Солнца и звезд."
            },
            {
                id: 10,
                text: "Кто создал первый атлас звездного неба?",
                options: [
                    "Тихо Браге",
                    "Николай Коперник",
                    "Галилео Галилей",
                    "Иоганн Кеплер"
                ],
                correct: 0,
                explanation: "Тихо Браге создал подробные каталоги звезд без использования телескопа."
            }
        ]
    },
    
    4: { // Интерактивный тест
        title: "Интерактивный практикум",
        description: "Выполните 4 интерактивных задания на проверку знаний."
    }
};

// Переменные состояния
let currentTest = null;
let currentQuestion = 0;
let userAnswers = [];
let testTimer = null;
let timeLeft = 600; // 10 минут в секундах
let testStartTime = null;

// Элементы DOM
const testModal = document.getElementById('testModal');
const testContent = document.getElementById('testContent');
const timerElement = document.getElementById('timer');
const testModalLabel = document.getElementById('testModalLabel');
const closeTestBtn = document.getElementById('closeTest');

// ====================== ОСНОВНЫЕ ФУНКЦИИ ======================

// Запуск теста
document.querySelectorAll('.start-test-btn').forEach(button => {
    button.addEventListener('click', function() {
        const testId = parseInt(this.dataset.test);
        startTest(testId);
    });
});

// Начать тест
function startTest(testId) {
    currentTest = testId;
    currentQuestion = 0;
    userAnswers = [];
    timeLeft = 600; // 10 минут
    testStartTime = new Date();
    
    // Обновить заголовок модального окна
    testModalLabel.textContent = testsData[testId].title;
    
    // Сбросить таймер
    timerElement.textContent = "10:00";
    timerElement.style.background = "linear-gradient(135deg,rgba(255, 107, 107, 0) 0%,rgba(196, 69, 105, 0) 100%)";
    
    // Показать первый вопрос или интерактивный тест
    if (testId === 4) {
        loadInteractiveTest();
    } else {
        loadQuestion(currentQuestion);
    }
    
    // Показать модальное окно
    testModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Включаем модальный курсор
    modalCursor.style.display = 'block';
    modalFollower.style.display = 'block';
    cursor.style.display = 'none';
    follower.style.display = 'none';
    
    // Инициализируем курсор для модального окна
    initCursor(modalCursor, modalFollower, testModal);
    
    // Запустить таймер
    startTimer();
}

// Таймер
function startTimer() {
    clearInterval(testTimer);
    
    testTimer = setInterval(() => {
        timeLeft--;
        
        // Форматирование времени
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Изменение цвета при малом времени
        if (timeLeft <= 60) {
            timerElement.style.background = "linear-gradient(135deg, #ff4757 0%, #c23616 100%)";
        }
        
        // Завершение теста по времени
        if (timeLeft <= 0) {
            finishTest();
        }
    }, 1000);
}

// Загрузка вопроса
function loadQuestion(questionIndex) {
    const test = testsData[currentTest];
    const question = test.questions[questionIndex];
    
    const progressPercentage = ((questionIndex + 1) / test.questions.length) * 100;
    
    let html = `
        <div class="question-container">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progressPercentage}%"></div>
            </div>
            
            <div class="question-text">
                <h4>Вопрос ${questionIndex + 1} из ${test.questions.length}</h4>
                <p>${question.text}</p>
            </div>
            
            <div class="options-container">
    `;
    
    // Варианты ответов
    question.options.forEach((option, index) => {
        const isSelected = userAnswers[questionIndex] === index;
        html += `
            <button class="option-btn ${isSelected ? 'selected' : ''}" 
                    onclick="selectAnswer(${index})">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `;
    });
    
    html += `
            </div>
            
            <div class="test-navigation">
                <button class="nav-btn prev-btn" onclick="prevQuestion()" 
                        ${questionIndex === 0 ? 'disabled' : ''}>
                    Назад
                </button>
                
                <div class="question-indicator">
                    ${test.questions.map((q, idx) => `
                        <div class="indicator-dot ${idx === questionIndex ? 'current' : ''} 
                             ${userAnswers[idx] !== undefined ? 'answered' : ''}"
                             onclick="goToQuestion(${idx})">
                            ${idx + 1}
                        </div>
                    `).join('')}
                </div>
                
                ${questionIndex < test.questions.length - 1 ? `
                    <button class="nav-btn next-btn" onclick="nextQuestion()">
                        Вперед
                    </button>
                ` : `
                    <button class="nav-btn finish-btn" onclick="finishTest()">
                        Завершить тест
                    </button>
                `}
            </div>
        </div>
    `;
    
    testContent.innerHTML = html;
    initCursor(modalCursor, modalFollower, testContent);
}

// Выбор ответа
function selectAnswer(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    
    // Обновить кнопки
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === optionIndex);
    });
    
    // Обновить индикатор
    updateQuestionIndicators();
}

// Следующий вопрос
function nextQuestion() {
    if (currentQuestion < testsData[currentTest].questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

// Предыдущий вопрос
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// Перейти к конкретному вопросу
function goToQuestion(index) {
    currentQuestion = index;
    loadQuestion(currentQuestion);
}

// Обновить индикаторы вопросов
function updateQuestionIndicators() {
    document.querySelectorAll('.indicator-dot').forEach((dot, idx) => {
        dot.classList.toggle('answered', userAnswers[idx] !== undefined);
        dot.classList.toggle('current', idx === currentQuestion);
    });
}

// Завершить тест
function finishTest() {
    clearInterval(testTimer);
    
    if (currentTest === 4) {
        // В интерактивном режиме результаты проверяются в interactive-test.js
        window.calculateAllInteractiveResults();
    } else {
        calculateResult();
    }
}

// Расчет результата обычного теста
function calculateResult() {
    const test = testsData[currentTest];
    let correctAnswers = 0;
    const totalQuestions = test.questions.length;
    
    // Подсчет правильных ответов
    test.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctAnswers++;
        }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = 600 - timeLeft;
    const minutesSpent = Math.floor(timeSpent / 60);
    const secondsSpent = timeSpent % 60;
    
    // Определяем оценку
    let grade = "";
    let gradeColor = "";
    if (score >= 90) {
        grade = "Отлично!";
        gradeColor = "rgb(236, 236, 236)";
    } else if (score >= 70) {
        grade = "Хорошо!";
        gradeColor = "rgb(232, 232, 232)";
    } else if (score >= 50) {
        grade = "Удовлетворительно";
        gradeColor = "rgb(234, 234, 234)";
    } else {
        grade = "Попробуйте еще раз";
        gradeColor = "rgb(238, 238, 238)";
    }
    
    // Отображение результатов
    let html = `
        <div class="result-container">
            <div class="score-circle" style="background: linear-gradient(135deg, rgb(29, 47, 98) 0%, #a59475 100%);">
                ${score}%
            </div>
            
            <h3 class="result-title">"${test.title}"</h3>
            <h4 style="color: ${gradeColor}; margin-bottom: 30px;">${grade}</h4>
            
            <div class="result-details">
                <div class="result-card">
                    <h5>Правильные ответы</h5>
                    <h2>${correctAnswers}/${totalQuestions}</h2>
                </div>
                <div class="result-card">
                    <h5>Время прохождения</h5>
                    <h2>${minutesSpent}:${secondsSpent.toString().padStart(2, '0')}</h2>
                </div>
                <div class="result-card">
                    <h5>Процент выполнения</h5>
                    <h2>${score}%</h2>
                </div>
            </div>
            
            <div class="questions-review">
                <h4 class="review-title">Обзор ответов:</h4>
    `;
    
    // Детальный обзор вопросов
    test.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : "Не отвечен";
        const correctAnswerText = question.options[question.correct];
        
        html += `
            <div class="result-card" style="text-align: left; margin-bottom: 20px; box-shadow: 0 0 20px 10px ${isCorrect ? 'rgba(55, 111, 88, 0.3)' : 'rgba(100, 35, 35, 0.3)'}; background:rgba(255, 255, 255, 0.48)">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <strong style="color:rgb(255, 255, 255); font-weight: normal;">Вопрос ${index + 1}:</strong>
                        <p style="margin: 8px 0; color:rgb(255, 255, 255);">${question.text}</p>
                    </div>
                    <span style="
                        background: linear-gradient(135deg, ${isCorrect ? 'rgb(47, 87, 64) 0%, #a59475 100%' : 'rgb(112, 30, 30) 0%, #a59475 100%'});
                        color: white; 
                        padding: 5px 15px; 
                        border-radius: 15px; 
                        font-size: 0.9em;
                        display: inline-block;
                        font-weight: 500;
                        border: none;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ">
                        ${isCorrect ? '✓ Правильно' : '✗ Неправильно'}
                    </span>
                </div>
                <div style="background: ${isCorrect ? 'rgba(167, 207, 177, 0)' : 'rgba(207, 181, 183, 0)'}; padding: 15px; border-radius: 8px;">
                    <p style="margin: 5px 0; color: white; font-weight: normal"><strong>Ваш ответ:</strong> ${userAnswerText}</p>
                    ${!isCorrect ? `
                        <p style="margin: 5px 0; color: white; font-weight: normal"><strong>Правильный ответ:</strong> ${correctAnswerText}</p>
                    ` : ''}
                    <p style="margin: 10px 0 0 0; color: rgb(229, 229, 229); font-size: 0.95em; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 10px; font-weight: normal">
                        ${question.explanation}
                    </p>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <div class="result-actions">
                <button class="result-btn restart-btn" onclick="restartTest()">
                    Пройти тест еще раз
                </button>
                <button class="result-btn close-modal-btn" onclick="closeTestModal()">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    testContent.innerHTML = html;
    initCursor(modalCursor, modalFollower, testContent);
}

// Перезапустить тест
function restartTest() {
    startTest(currentTest);
}

// Закрыть модальное окно
function closeTestModal() {
    testModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    clearInterval(testTimer);
    
    // Возвращаем основной курсор
    modalCursor.style.display = 'none';
    modalFollower.style.display = 'none';
    cursor.style.display = 'block';
    follower.style.display = 'block';
}

closeTestBtn.addEventListener('click', closeTestModal);

testModal.addEventListener('click', function(e) {
    if (e.target === testModal) {
        closeTestModal();
    }
});

// ====================== ИНТЕРАКТИВНЫЙ ТЕСТ HTML ГЕНЕРАЦИЯ ======================

function loadInteractiveTest() {
    const html = `
        <div class="interactive-container">
            <div class="interactive-tabs">
                <button class="tab-btn active" onclick="switchTab('task1')">1. Живопись</button>
                <button class="tab-btn" onclick="switchTab('task2')">2. Изобретения</button>
                <button class="tab-btn" onclick="switchTab('task3')">3. Хронология</button>
                <button class="tab-btn" onclick="switchTab('task4')">4. Карта открытий</button>
            </div>

            <!-- ЗАДАНИЕ 1: ХУДОЖНИКИ -->
            <div id="task1" class="tab-pane active">
                <h4 class="task-title">Задание 1: Сопоставьте картины и художников</h4>
                <p class="task-desc">Перетащите картины в рамку к соответствующему мастеру.</p>
                
                <div class="drag-drop-grid">
                    <div class="zone-column">
                        <h5 class="col-title">Мастера</h5>
                        <div class="drop-zone" id="zone-leonardo" data-artist="Леонардо да Винчи">
                            <strong>Леонардо да Винчи</strong>
                        </div>
                        <div class="drop-zone" id="zone-michelangelo" data-artist="Микеланджело">
                            <strong>Микеланджело</strong>
                        </div>
                        <div class="drop-zone" id="zone-raphael" data-artist="Рафаэль">
                            <strong>Рафаэль Санти</strong>
                        </div>
                        <div class="drop-zone" id="zone-botticelli" data-artist="Боттичелли">
                            <strong>Сандро Ботичелли</strong>
                        </div>
                    </div>
                    
                    <div class="items-column">
                        <h5 class="col-title">Произведения</h5>
                        <div class="draggable-item" draggable="true" id="p-monalisa" data-category="painting" data-correct="Леонардо да Винчи">
                            Мона Лиза
                        </div>
                        <div class="draggable-item" draggable="true" id="p-adam" data-category="painting" data-correct="Микеланджело">
                            Сотворение Адама
                        </div>
                        <div class="draggable-item" draggable="true" id="p-athens" data-category="painting" data-correct="Рафаэль">
                            Афинская школа
                        </div>
                        <div class="draggable-item" draggable="true" id="p-venus" data-category="painting" data-correct="Боттичелли">
                            Рождение Венеры
                        </div>
                    </div>
                </div>
            </div>

            <!-- ЗАДАНИЕ 2: ИЗОБРЕТЕНИЯ -->
            <div id="task2" class="tab-pane">
                <h4 class="task-title">Задание 2: Изобретатели и их творения</h4>
                <p class="task-desc">Соедините изобретение или открытие с его автором.</p>
                
                <div class="drag-drop-grid">
                    <div class="zone-column">
                        <h5 class="col-title">Ученые</h5>
                        <div class="drop-zone" id="zone-gutenberg" data-artist="Гутенберг">
                            <strong>Иоганн Гутенберг</strong>
                        </div>
                        <div class="drop-zone" id="zone-galileo" data-artist="Галилей">
                            <strong>Галилео Галилей</strong>
                        </div>
                        <div class="drop-zone" id="zone-vesalius" data-artist="Везалий">
                            <strong>Андреас Везалий</strong>
                        </div>
                        <div class="drop-zone" id="zone-davinci-tech" data-artist="Да Винчи">
                            <strong>Леонардо да Винчи</strong>
                        </div>
                    </div>
                    
                    <div class="items-column">
                        <h5 class="col-title">Изобретения</h5>
                        <div class="draggable-item" draggable="true" id="i-press" data-category="invention" data-correct="Гутенберг">
                            Печатный станок
                        </div>
                        <div class="draggable-item" draggable="true" id="i-telescope" data-category="invention" data-correct="Галилей">
                            Телескоп
                        </div>
                        <div class="draggable-item" draggable="true" id="i-atlas" data-category="invention" data-correct="Везалий">
                            Анатомический атлас
                        </div>
                        <div class="draggable-item" draggable="true" id="i-heli" data-category="invention" data-correct="Да Винчи">
                            Проект вертолета
                        </div>
                    </div>
                </div>
            </div>

            <!-- ЗАДАНИЕ 3: ХРОНОЛОГИЯ -->
            <div id="task3" class="tab-pane">
                <h4 class="task-title">Задание 3: Лента времени</h4>
                <p class="task-desc">Расположите события в правильном хронологическом порядке (сверху вниз).</p>
                
                <div id="timeline-sort" class="timeline-sortable">
                    <!-- Элементы перемешаны намеренно -->
                    <div class="timeline-item" data-year="1492">
                        <span class="event-text">Открытие Нового Света (Колумб)</span>
                        <i class="fas fa-bars handle"></i>
                    </div>
                     <div class="timeline-item" data-year="1519">
                        <span class="event-text">Кругосветное плавание Магеллана</span>
                        <i class="fas fa-bars handle"></i>
                    </div>
                    <div class="timeline-item" data-year="1488">
                        <span class="event-text">Открытие мыса Доброй Надежды (Диас)</span>
                        <i class="fas fa-bars handle"></i>
                    </div>
                    <div class="timeline-item" data-year="1606">
                        <span class="event-text">Открытие Австралии (Янсзон)</span>
                        <i class="fas fa-bars handle"></i>
                    </div>
                    <div class="timeline-item" data-year="1498">
                        <span class="event-text">Морской путь в Индию (Да Гама)</span>
                        <i class="fas fa-bars handle"></i>
                    </div>
                </div>
            </div>

            <!-- ЗАДАНИЕ 4: КАРТА -->
            <div id="task4" class="tab-pane">
                <h4 class="task-title">Задание 4: Географические открытия</h4>
                <p class="task-desc">Перетащите метки на соответствующие места на карте.</p>
                
                <div class="map-game-container">
                    <img src="technology_page/image/karta.jpg" class="game-map-img" alt="World Map">
                    
                    <!-- Зоны сброса (Drop Zones) - координаты примерные для image/karta.jpg -->

                    <div class="map-zone" style="bottom: 35%; left: 65%;" data-location="hope"></div>
    
                    <div class="map-zone" style="top: 47%; left: 34%;" data-location="america"></div>
                
                    <div class="map-zone" style="top: 45%; left: 55%;" data-location="afrika"></div>
            
                    <div class="map-zone" style="bottom: 29%; left: 32%;" data-location="magellan_proliv"></div>

                    <div class="map-zone" style="top: 52%; left: 32%;" data-location="tihii"></div>

                    <div class="map-zone" style="top: 40%; left: 35%;" data-location="newfaundlend"></div>

                    <div class="map-zone" style="top: 53%; left: 42%;" data-location="amazonka"></div>

                    <div class="map-zone" style="top: 57%; left: 47%;" data-location="brazilia"></div>

                    <div class="map-zone" style="top: 38%; left: 89%;" data-location="japan"></div>

                    <div class="map-zone" style="top: 29%; left: 84%;" data-location="deznev"></div>

                    <div class="map-zone" style="top: 48%; left: 87%;" data-location="zond"></div>
                </div>

                <div class="map-pins-container">
                    <div class="map-pin" draggable="true" data-category="map" data-location="hope">
                        <i class="fas fa-map-marker-alt"></i> Открытие мыса Доброй Надежды
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="america">
                        <i class="fas fa-map-marker-alt"></i> Открытие Америки
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="afrika">
                        <i class="fas fa-map-marker-alt"></i> Открытие мыса Бохадор
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="magellan_proliv">
                        <i class="fas fa-map-marker-alt"></i> Открытие Магелланова пролива
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="tihii">
                        <i class="fas fa-map-marker-alt"></i> Открытие Тихого океана
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="newfaundlend">
                        <i class="fas fa-map-marker-alt"></i> Открытие Ньюфаундленда
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="amazonka">
                        <i class="fas fa-map-marker-alt"></i> Открытие реки Амазонки
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="brazilia">
                        <i class="fas fa-map-marker-alt"></i> Открытие Бразилии
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="japan">
                        <i class="fas fa-map-marker-alt"></i> Открытие Японии
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="deznev">
                        <i class="fas fa-map-marker-alt"></i> Открытие мыса Дежнева
                    </div>
                    <div class="map-pin" draggable="true" data-category="map" data-location="zond">
                        <i class="fas fa-map-marker-alt"></i> Открытие Индонезии
                    </div>
                </div>
            </div>
            
            <div class="interactive-footer">
                <div id="interactive-feedback"></div>
                <button class="nav-btn finish-btn" onclick="checkAllInteractiveTasks()" style="margin-top: 20px; margin-left: 35%">
                    Проверить все задания
                </button>
            </div>
        </div>
    `;
    
    testContent.innerHTML = html;
    
    // Инициализация логики интерактивного теста (в файле interactive-test.js)
    if(window.initInteractiveTest) {
        window.initInteractiveTest();
    }
    
    initCursor(modalCursor, modalFollower, testContent);
}

// Переключение табов
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    // Находим кнопку, которая вызвала это, через event или просто по порядку
    // Проще найти по тексту или индексу, но здесь сделаем просто перебор:
    const index = parseInt(tabId.replace('task', '')) - 1;
    document.querySelectorAll('.tab-btn')[index].classList.add('active');
};

// Делаем функции глобальными
window.selectAnswer = selectAnswer;
window.prevQuestion = prevQuestion;
window.nextQuestion = nextQuestion;
window.goToQuestion = goToQuestion;
window.finishTest = finishTest;
window.restartTest = restartTest;
window.closeTestModal = closeTestModal;
