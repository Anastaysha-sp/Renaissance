// Логика для интерактивных заданий (Task 4)

function initInteractiveTest() {
    console.log("Initializing Interactive Test Logic");
    
    // --- Автоматический скроллинг при перетаскивании ---
    let dragScrollInterval;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    function startDragScroll(element, event) {
        if (dragScrollInterval) clearInterval(dragScrollInterval);
        
        isDragging = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        
        const scrollStep = 15;
        const scrollMargin = 50; // Отступ от края для начала скролла
        
        dragScrollInterval = setInterval(() => {
            if (!isDragging) {
                clearInterval(dragScrollInterval);
                return;
            }
            
            const modalBody = document.querySelector('.modal-body');
            if (!modalBody) return;
            
            // Определяем направление скролла
            let scrollX = 0;
            let scrollY = 0;
            
            // Вертикальный скролл
            if (lastMouseY < scrollMargin) {
                scrollY = -scrollStep; // Вверх
            } else if (lastMouseY > window.innerHeight - scrollMargin) {
                scrollY = scrollStep; // Вниз
            }
            
            // Горизонтальный скролл
            if (lastMouseX < scrollMargin) {
                scrollX = -scrollStep; // Влево
            } else if (lastMouseX > window.innerWidth - scrollMargin) {
                scrollX = scrollStep; // Вправо
            }
            
            // Применяем скролл
            modalBody.scrollLeft += scrollX;
            modalBody.scrollTop += scrollY;
            
        }, 16); // ~60 FPS
    }
    
    function updateMousePosition(event) {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
    
    function stopDragScroll() {
        isDragging = false;
        if (dragScrollInterval) {
            clearInterval(dragScrollInterval);
            dragScrollInterval = null;
        }
    }
    
    // --- Инициализация Drag & Drop для Заданий 1 (Художники) и 2 (Изобретатели) ---
    const draggables = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.setData('category', e.target.dataset.category);
            e.target.classList.add('dragging');
        });
        
        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Разрешаем сброс
            zone.classList.add('zone-hover');
        });
        
        zone.addEventListener('dragleave', (e) => {
            zone.classList.remove('zone-hover');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('zone-hover');
            
            const id = e.dataTransfer.getData('text/plain');
            const category = e.dataTransfer.getData('category');
            
            const draggable = document.getElementById(id);
            if (draggable) {
                // Удаляем из предыдущей зоны
                const previousZone = draggable.closest('.drop-zone');
                if (previousZone && previousZone !== zone) {
                    // Оставляем пустым или можно добавить текст
                }
                
                // Очищаем зону и добавляем элемент
                zone.innerHTML = '';
                zone.appendChild(draggable);
                draggable.style.margin = '0';
            }
        });
    });

    // --- Инициализация Сортировки для Задания 3 (Хронология) ---
    const timelineContainer = document.getElementById('timeline-sort');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    let draggedTimelineItem = null;

    timelineItems.forEach(item => {
        item.setAttribute('draggable', 'true');

        item.addEventListener('dragstart', (e) => {
            draggedTimelineItem = item;
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => item.classList.add('dragging'), 0);
        });

        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging');
            draggedTimelineItem = null;
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (item === draggedTimelineItem) return;

            const rect = item.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            
            if (e.clientY < midpoint) {
                timelineContainer.insertBefore(draggedTimelineItem, item);
            } 
            else {
                timelineContainer.insertBefore(draggedTimelineItem, item.nextSibling);
            }
        });
    });
    
    if (timelineContainer) {
        timelineContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    }

    // --- Инициализация Drag & Drop для Задания 4 (Карта) ---
    const mapPins = document.querySelectorAll('.map-pin');
    const mapZones = document.querySelectorAll('.map-zone');
    
    mapPins.forEach(pin => {
        // Сохраняем оригинальный текст
        if (!pin.dataset.originalText) {
            pin.dataset.originalText = pin.innerHTML;
        }
        
        pin.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.location);
            window.draggedMapPin = e.target;
            e.target.classList.add('dragging');
            
            // Начинаем отслеживать для скроллинга
            startDragScroll(e.target, e);
            
            // Добавляем обработчик для обновления позиции мыши
            document.addEventListener('mousemove', updateMousePosition);
        });
        
        pin.addEventListener('drag', (e) => {
            // Обновляем позицию для скроллинга
            updateMousePosition(e);
        });
        
        pin.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
            window.draggedMapPin = null;
            stopDragScroll();
            
            // Удаляем обработчик
            document.removeEventListener('mousemove', updateMousePosition);
        });
    });
    
    mapZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('map-zone-hover');
            
            // Обновляем позицию для скроллинга
            updateMousePosition(e);
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('map-zone-hover');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('map-zone-hover');
            
            const pinLocation = e.dataTransfer.getData('text/plain');
            
            if (window.draggedMapPin) {
                // Сохраняем оригинальный текст, если еще не сохранен
                if (!window.draggedMapPin.dataset.originalText) {
                    window.draggedMapPin.dataset.originalText = window.draggedMapPin.innerHTML;
                }
                
                // Стилизация пина при попадании в зону
                window.draggedMapPin.style.position = 'absolute';
                window.draggedMapPin.style.top = '50%';
                window.draggedMapPin.style.left = '50%';
                window.draggedMapPin.style.transform = 'translate(-50%, -50%)';
                window.draggedMapPin.style.width = 'auto';
                window.draggedMapPin.style.height = 'auto';
                window.draggedMapPin.style.padding = '5px 10px';
                window.draggedMapPin.style.margin = '0';
                window.draggedMapPin.style.display = 'flex';
                window.draggedMapPin.style.justifyContent = 'center';
                window.draggedMapPin.style.alignItems = 'center';
                window.draggedMapPin.style.fontSize = '0.8rem';
                window.draggedMapPin.style.zIndex = '20';
                
                // Меняем содержимое для компактности
                window.draggedMapPin.innerHTML = '<i class="fas fa-map-pin"></i>';
                window.draggedMapPin.title = window.draggedMapPin.dataset.originalText.replace(/<[^>]*>/g, '');
                
                // Очищаем зону от предыдущих пинов
                const existingPin = zone.querySelector('.map-pin');
                if (existingPin && existingPin !== window.draggedMapPin) {
                    // Возвращаем предыдущий пин в контейнер
                    existingPin.style.position = '';
                    existingPin.style.top = '';
                    existingPin.style.left = '';
                    existingPin.style.transform = '';
                    existingPin.style.width = '';
                    existingPin.style.height = '';
                    existingPin.style.padding = '';
                    existingPin.style.fontSize = '';
                    existingPin.style.zIndex = '';
                    existingPin.innerHTML = existingPin.dataset.originalText;
                    
                    const mapPinsList = document.querySelector('.map-pins-list');
                    if (mapPinsList) {
                        mapPinsList.appendChild(existingPin);
                    }
                }
                
                zone.innerHTML = '';
                zone.appendChild(window.draggedMapPin);
                
                // Добавляем атрибут для проверки ответа
                zone.dataset.filledWith = pinLocation;
                
                // Добавляем подсказку с названием зоны
                const zoneName = zone.dataset.name || getZoneName(pinLocation);
                const label = document.createElement('div');
                label.className = 'zone-label';
                label.innerHTML = `<small>${zoneName}</small>`;
                label.style.position = 'absolute';
                label.style.bottom = '-25px';
                label.style.left = '50%';
                label.style.transform = 'translateX(-50%)';
                label.style.background = 'rgba(0,0,0,0.7)';
                label.style.color = 'white';
                label.style.padding = '2px 6px';
                label.style.borderRadius = '3px';
                label.style.fontSize = '10px';
                label.style.whiteSpace = 'nowrap';
                label.style.display = 'none';
                label.style.zIndex = '30';
                zone.appendChild(label);
                
                // Показываем подсказку при наведении
                zone.addEventListener('mouseenter', () => {
                    label.style.display = 'block';
                });
                zone.addEventListener('mouseleave', () => {
                    label.style.display = 'none';
                });
            }
        });
    });
    
    // Функция для получения названия зоны
    function getZoneName(location) {
        const zoneNames = {
            'hope': 'Мыс Доброй Надежды',
            'america': 'Америка',
            'afrika': 'Мыс Бохадор',
            'magellan_proliv': 'Магелланов пролив',
            'tihii': 'Тихий океан',
            'newfaundlend': 'Ньюфаундленд',
            'amazonka': 'Река Амазонка',
            'brazilia': 'Бразилия',
            'japan': 'Япония',
            'deznev': 'Мыс Дежнева',
            'zond': 'Индонезия'
        };
        return zoneNames[location] || location;
    }
}

// Глобальная функция проверки всех заданий
window.checkAllInteractiveTasks = function() {
    let score = 0;
    let maxScore = 0;

    // 1. Проверка Художников (4 балла)
    const artistZones = document.querySelectorAll('#task1 .drop-zone');
    maxScore += artistZones.length; // 4
    let artistsCorrect = 0;
    
    artistZones.forEach(zone => {
        const item = zone.querySelector('.draggable-item');
        zone.classList.remove('correct', 'incorrect');
        
        if (item) {
            if (item.dataset.correct === zone.dataset.artist) {
                score++;
                artistsCorrect++;
                zone.classList.add('correct');
            } else {
                zone.classList.add('incorrect');
            }
        } else {
            zone.classList.add('incorrect');
        }
    });

    // 2. Проверка Изобретателей (4 балла)
    const inventorZones = document.querySelectorAll('#task2 .drop-zone');
    maxScore += inventorZones.length; // +4 = 8
    let inventorsCorrect = 0;

    inventorZones.forEach(zone => {
        const item = zone.querySelector('.draggable-item');
        zone.classList.remove('correct', 'incorrect');
        if (item) {
            if (item.dataset.correct === zone.dataset.artist) { 
                score++;
                inventorsCorrect++;
                zone.classList.add('correct');
            } else {
                zone.classList.add('incorrect');
            }
        } else {
            zone.classList.add('incorrect');
        }
    });

    // 3. Проверка Хронологии (1 балл за правильный порядок)
    const timelineItems = document.querySelectorAll('#timeline-sort .timeline-item');
    maxScore += 1; // +1 = 9
    let timelineCorrect = true;
    let prevYear = 0;
    
    timelineItems.forEach(item => {
        const year = parseInt(item.dataset.year);
        if (year < prevYear) {
            timelineCorrect = false;
        }
        prevYear = year;
    });
    
    const timelineContainer = document.getElementById('timeline-sort');
    if (timelineContainer) {
        timelineContainer.classList.remove('correct-border', 'incorrect-border');
        if (timelineCorrect) {
            score++;
            timelineContainer.classList.add('correct-border');
        } else {
            timelineContainer.classList.add('incorrect-border');
        }
    }

    // 4. Проверка Карты (11 баллов - по 1 за каждую правильную метку)
    const mapZones = document.querySelectorAll('.map-zone');
    const totalZones = mapZones.length;
    maxScore += totalZones; // +11 = 20 всего
    
    let mapCorrectCount = 0;
    let mapTotalPlaced = 0;
    
    // Правильные соответствия меток и зон
    const correctMatches = {
        'hope': 'hope', // Мыс Доброй Надежды
        'america': 'america', // Америка
        'afrika': 'afrika', // Мыс Бохадор
        'magellan_proliv': 'magellan_proliv', // Магелланов пролив
        'tihii': 'tihii', // Тихий океан
        'newfaundlend': 'newfaundlend', // Ньюфаундленд
        'amazonka': 'amazonka', // Река Амазонки
        'brazilia': 'brazilia', // Бразилия
        'japan': 'japan', // Япония
        'deznev': 'deznev', // Мыс Дежнева
        'zond': 'zond' // Индонезия
    };
    
    mapZones.forEach(zone => {
        const droppedLocation = zone.dataset.filledWith;
        const targetLocation = zone.dataset.location;
        
        // Сброс стиля
        zone.style.border = "2px dashed white";
        zone.style.backgroundColor = "transparent";
        
        if (droppedLocation) {
            mapTotalPlaced++;
            
            // Проверяем соответствие
            const isCorrect = correctMatches[droppedLocation] === targetLocation;
            
            if (isCorrect) {
                mapCorrectCount++;
                score++; // Добавляем балл за правильную метку
                zone.style.borderColor = "#28a745";
                zone.style.backgroundColor = "rgba(40, 167, 69, 0.3)";
            } else {
                zone.style.borderColor = "#dc3545";
                zone.style.backgroundColor = "rgba(220, 53, 69, 0.3)";
            }
        }
    });
    
    // Обновляем визуальный вид непомещенных пинов
    const mapPins = document.querySelectorAll('.map-pin');
    mapPins.forEach(pin => {
        if (!pin.closest('.map-zone')) {
            pin.style.opacity = '0.6';
            pin.style.border = '2px dashed #ffc107';
        }
    });

    // Формирование итога
    const percentage = Math.round((score / maxScore) * 100);
    
    window.interactiveScore = {
        score: percentage,
        details: {
            artists: artistsCorrect,
            inventors: inventorsCorrect,
            timeline: timelineCorrect,
            map: mapCorrectCount, // теперь просто количество правильных
            maxMap: totalZones,   // максимальное количество (11)
            mapTotalPlaced: mapTotalPlaced,
            totalScore: score,
            maxTotalScore: maxScore
        }
    };
    
    window.calculateAllInteractiveResults();
};

window.calculateAllInteractiveResults = function() {
    if (!window.interactiveScore) {
        window.checkAllInteractiveTasks();
        return;
    }

    // Останавливаем таймер теста
    if (window.testTimer) {
        clearInterval(window.testTimer);
    }

    const res = window.interactiveScore;
    let gradeColor = "";
    let gradeText = "";
    
    if (res.score >= 90) {
        gradeText = "Великолепно!";
        gradeColor = "rgb(255, 255, 255)";
    } else if (res.score >= 70) {
        gradeText = "Хорошо!";
        gradeColor = "rgb(255, 255, 255)";
    } else if (res.score >= 50) {
        gradeText = "Неплохо";
        gradeColor = "rgb(255, 255, 255)";
    } else {
        gradeText = "Попробуйте еще раз";
        gradeColor = "rgb(255, 255, 255)";
    }
    
    const html = `
        <div class="result-container">
            <div class="score-circle" style="background: linear-gradient(135deg, ${gradeColor} 0%, ${gradeColor}88 100%); font-weight: normal">
                ${res.score}%
            </div>
            
            <h3 class="result-title">Результат Практикума</h3>
            <h4 style="color: ${gradeColor}; margin-bottom: 30px;">${gradeText}</h4>
            
            <div class="result-details interactive-details-grid">
                <div class="result-card">
                    <h5>Живопись</h5>
                    <h2>${res.details.artists}/4</h2>
                    <small>${res.details.artists === 4 ? '✓ Идеально' : res.details.artists >= 3 ? '✓ Хорошо' : '✗ Повторите'}</small>
                </div>
                <div class="result-card">
                    <h5>Изобретения</h5>
                    <h2>${res.details.inventors}/4</h2>
                    <small>${res.details.inventors === 4 ? '✓ Идеально' : res.details.inventors >= 3 ? '✓ Хорошо' : '✗ Повторите'}</small>
                </div>
                <div class="result-card">
                    <h5>Хронология</h5>
                    <h2>${res.details.timeline ? '✓ Верно' : '✗ Ошибка'}</h2>
                    <small>${res.details.timeline ? 'Порядок верный' : 'Проверьте последовательность'}</small>
                </div>
                <div class="result-card">
                    <h5>Карта</h5>
                    <h2>${res.details.map}/${res.details.maxMap}</h2>
                    <small>${res.details.map === res.details.maxMap ? '✓ Идеально!' : 
                             res.details.map >= 8 ? '✓ Отлично!' : 
                             res.details.map >= 5 ? '✓ Хорошо' : '✗ Можно лучше'}</small>
                    <small>Размещено: ${res.details.mapTotalPlaced} из ${res.details.maxMap}</small>
                </div>
            </div>
            
            <div class="total-score" style="margin: 25px 0; padding: 20px; background: linear-gradient(135deg, rgba(102, 126, 234, 0) 0%, rgba(118, 75, 162, 0) 100%); border-radius: 10px;">
                <h3 style="margin-bottom: 10px; color:rgb(255, 255, 255); font-weight: normal">Общий итог</h5>
                <h4 style="color:rgb(235, 235, 235); margin: 0; font-weight: normal">${res.details.totalScore} из ${res.details.maxTotalScore} баллов</h3>
                <p style="color:rgb(212, 212, 212); margin-top: 5px; font-weight: normal">${res.score}% правильных ответов</p>
            </div>
            
            <div class="result-actions">
                <button class="result-btn restart-btn" onclick="startTest(4); window.interactiveScore=null;">
                    Попробовать еще раз
                </button>
                <button class="result-btn close-modal-btn" onclick="closeTestModal()">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    const testContent = document.getElementById('testContent');
    if(testContent) testContent.innerHTML = html;
    
    // Показываем детализацию по карте
    setTimeout(() => {
        showMapFeedback(res.details);
    }, 100);
};

// Функция для показа детальной обратной связи по карте
function showMapFeedback(details) {
    const mapZones = document.querySelectorAll('.map-zone');
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'map-feedback';
    feedbackContainer.style.marginTop = '20px';
    feedbackContainer.style.padding = '15px';
    feedbackContainer.style.background = 'rgba(0,0,0,0.05)';
    feedbackContainer.style.borderRadius = '8px';
    feedbackContainer.style.fontSize = '0.9rem';
    
    let feedbackHTML = `<h5 style="margin-bottom: 10px;">Детали по карте:</h5>`;
    feedbackHTML += `<p>Правильно размещено: <strong>${details.map} из ${details.maxMap}</strong></p>`;
    feedbackHTML += `<p>Всего размещено меток: <strong>${details.mapTotalPlaced} из ${details.maxMap}</strong></p>`;
    
    if (details.map < details.maxMap) {
        feedbackHTML += `<p style="color: #6c757d; margin-top: 10px;">
            <i class="fas fa-info-circle"></i> Можно улучшить результат, разместив больше меток правильно
        </p>`;
    }
    
    feedbackContainer.innerHTML = feedbackHTML;
    
    const testContent = document.getElementById('testContent');
    const actionsDiv = testContent.querySelector('.result-actions');
    if (actionsDiv) {
        testContent.insertBefore(feedbackContainer, actionsDiv);
    }
}

// Функция для показа детальной обратной связи по карте
function showMapFeedback(details) {
    const mapZones = document.querySelectorAll('.map-zone');
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'map-feedback';
    feedbackContainer.style.marginTop = '20px';
    feedbackContainer.style.padding = '15px';
    feedbackContainer.style.background = 'rgba(0,0,0,0.05)';
    feedbackContainer.style.borderRadius = '8px';
    feedbackContainer.style.fontSize = '0.9rem';
    
    let feedbackHTML = `<h5 style="margin-bottom: 10px;">Детали по карте:</h5>`;
    feedbackHTML += `<p>Правильно размещено: <strong>${details.mapCorrect} из 11</strong></p>`;
    feedbackHTML += `<p>Требуется для зачета: <strong>${details.mapRequired} из 11</strong></p>`;
    
    if (details.mapCorrect < details.mapRequired) {
        feedbackHTML += `<p style="color: #dc3545; margin-top: 10px;">
            <i class="fas fa-exclamation-triangle"></i> Разместите еще ${details.mapRequired - details.mapCorrect} меток правильно
        </p>`;
    }
    
    feedbackContainer.innerHTML = feedbackHTML;
    
    const testContent = document.getElementById('testContent');
    const actionsDiv = testContent.querySelector('.result-actions');
    if (actionsDiv) {
        testContent.insertBefore(feedbackContainer, actionsDiv);
    }
}

// Функция сброса задания с картой
window.resetMapTask = function() {
    const mapZones = document.querySelectorAll('.map-zone');
    const mapPinsList = document.querySelector('.map-pins-list');
    
    mapZones.forEach(zone => {
        // Очищаем зоны
        const pin = zone.querySelector('.map-pin');
        if (pin) {
            // Возвращаем пин в исходное состояние
            pin.style.position = '';
            pin.style.top = '';
            pin.style.left = '';
            pin.style.transform = '';
            pin.style.width = '';
            pin.style.height = '';
            pin.style.padding = '';
            pin.style.fontSize = '';
            pin.style.zIndex = '';
            pin.style.opacity = '1';
            pin.style.border = '';
            pin.innerHTML = pin.dataset.originalText || '';
            pin.title = '';
            
            // Возвращаем в контейнер
            if (mapPinsList) {
                mapPinsList.appendChild(pin);
            }
        }
        
        // Очищаем зону
        zone.innerHTML = '';
        zone.dataset.filledWith = '';
        zone.style.border = '2px dashed rgba(255, 255, 255, 0.7)';
        zone.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        
        // Удаляем обработчики
        const newZone = zone.cloneNode(true);
        zone.parentNode.replaceChild(newZone, zone);
    });
    
    // Сбрасываем все пины к исходному виду
    const mapPins = document.querySelectorAll('.map-pin');
    mapPins.forEach(pin => {
        pin.style.opacity = '1';
        pin.style.border = '';
        if (pin.dataset.originalText) {
            pin.innerHTML = pin.dataset.originalText;
        }
    });
    
    console.log('Задание с картой сброшено');
    
    // Переинициализируем drag-and-drop
    setTimeout(() => {
        initInteractiveTest();
    }, 100);
};

// Функция для переключения табов с сохранением прогресса
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    
    // Находим соответствующую кнопку
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach((btn, index) => {
        if (btn.textContent.includes(tabId.replace('task', ''))) {
            btn.classList.add('active');
        }
    });
    
    // Если переключаемся на карту, убедимся что контейнер скроллится
    if (tabId === 'task4') {
        setTimeout(() => {
            const mapContainer = document.querySelector('.map-game-container');
            if (mapContainer) {
                mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 300);
    }
};

// Экспорт для доступа
window.initInteractiveTest = initInteractiveTest;
window.checkAllInteractiveTasks = checkAllInteractiveTasks;
window.calculateAllInteractiveResults = calculateAllInteractiveResults;