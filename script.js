// Detectar modo escuro do sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Criar partículas animadas
function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório
        const size = 2 + Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição inicial aleatória
        const startX = Math.random() * 100;
        const startY = 70 + Math.random() * 30; // Concentrar na parte inferior
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;
        
        // Cor aleatória
        const colorOptions = [
            'var(--primary)', 
            'var(--primary-light)', 
            'var(--secondary)', 
            'var(--secondary-light)',
            'var(--accent)',
            'var(--accent-light)'
        ];
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        particle.style.background = color;
        
        // Movimento aleatório
        const moveX = -50 + Math.random() * 100;
        particle.style.setProperty('--particle-move-x', `${moveX}px`);
        
        // Duração e delay aleatórios
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 10;
        particle.style.animation = `particleMove ${duration}s ease-in-out ${delay}s infinite`;
        
        // Adicionar partícula ao container
        container.appendChild(particle);
    }
}

// Animar cards (sem efeitos 3D, conforme pedido)
function animateCards() {
    const cards = document.querySelectorAll('.premium-card');
    
    // Animar aparecimento dos cards de forma simples
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
}

// Adicionar smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Reduzido devido à barra de navegação menor
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Funções do Modal
function openEarthModal() {
    document.getElementById('earthModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeEarthModal() {
    document.getElementById('earthModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openNotionModal() {
    document.getElementById('notionModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeNotionModal() {
    document.getElementById('notionModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openTab(tabId, type) {
    // Esconder todas as abas do tipo especificado (earth ou notion)
    const contents = document.querySelectorAll(`.${type}-content`);
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover classe ativa de todas as abas
    const tabs = document.querySelectorAll(`.${type}-tab`);
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Ativar a aba clicada
    document.getElementById(tabId).classList.add('active');
    
    // Ativar o botão da aba
    event.currentTarget.classList.add('active');
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const earthModal = document.getElementById('earthModal');
    const notionModal = document.getElementById('notionModal');
    
    if (event.target == earthModal) {
        closeEarthModal();
    }
    
    if (event.target == notionModal) {
        closeNotionModal();
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEarthModal();
        closeNotionModal();
    }
});

// Sistema de Filtros e Busca
function initResourcesFilter() {
    const searchInput = document.getElementById('resourceSearch');
    const categorySelect = document.getElementById('categoryFilter');
    const applyBtn = document.getElementById('applyFilters');
    const resetBtn = document.getElementById('resetFilters');
    const resourceCards = document.querySelectorAll('.premium-card');

    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;

        resourceCards.forEach(card => {
            const title = card.querySelector('.resource-title').textContent.toLowerCase();
            const description = card.querySelector('.resource-description').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category');

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCategory === category;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    applyBtn.addEventListener('click', filterResources);
    
    resetBtn.addEventListener('click', function() {
        searchInput.value = '';
        categorySelect.value = 'all';
        resourceCards.forEach(card => {
            card.style.display = 'flex';
        });
    });

    // Também filtra quando o usuário pressiona Enter no campo de busca
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterResources();
        }
    });
}

// Calendário de Eventos
function initCalendar() {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    currentDate.setMonth(0); // Começar em janeiro
    currentDate.setFullYear(2025); // Usar o ano 2025 para os eventos
    
    // Eventos específicos para 2025
    const events = {
        // Eventos educacionais gerais
        '2025-01-15': [
            { name: 'Fórum de Inovação Pedagógica', time: 'Todo o dia', description: 'Discussões sobre tendências educacionais e apresentação de práticas inovadoras para o ano letivo.' }
        ],
        '2025-02-10': [
            { name: 'Workshop de Tecnologias Imersivas', time: '14:00 - 17:00', description: 'Experiências práticas com realidade virtual e aumentada na educação básica.' }
        ],
        '2025-03-15': [
            { name: 'Dia da Inovação na Educação', time: 'Todo o dia', description: 'Apresentação de ferramentas novas, cases de sucesso e tendências em tecnologia educacional.' }
        ],
        '2025-04-20': [
            { name: 'Festival do Professor Criativo', time: 'Todo o dia', description: 'Concurso de atividades criativas, com votação da comunidade e premiação.' }
        ],
        '2025-05-05': [
            { name: 'Semana do Planejamento Inteligente', time: '5 a 9 de maio', description: 'Série de conteúdos sobre organização, estratégias de aula e produtividade docente.' }
        ],
        '2025-05-06': [
            { name: 'Semana do Planejamento Inteligente', time: '5 a 9 de maio', description: 'Série de conteúdos sobre organização, estratégias de aula e produtividade docente.' }
        ],
        '2025-05-07': [
            { name: 'Semana do Planejamento Inteligente', time: '5 a 9 de maio', description: 'Série de conteúdos sobre organização, estratégias de aula e produtividade docente.' }
        ],
        '2025-05-08': [
            { name: 'Semana do Planejamento Inteligente', time: '5 a 9 de maio', description: 'Série de conteúdos sobre organização, estratégias de aula e produtividade docente.' }
        ],
        '2025-05-09': [
            { name: 'Semana do Planejamento Inteligente', time: '5 a 9 de maio', description: 'Série de conteúdos sobre organização, estratégias de aula e produtividade docente.' }
        ],
        '2025-06-25': [
            { name: 'Simpósio de IA na Educação', time: 'Todo o dia', description: 'Evento sobre avanços na Inteligência Artificial aplicada à sala de aula, com tutoriais e demonstrações.' }
        ],
        '2025-07-15': [
            { name: 'Conferência de Educação Inclusiva', time: '09:00 - 18:00', description: 'Estratégias e ferramentas para garantir acessibilidade e inclusão no ambiente educacional.' }
        ],
        '2025-08-12': [
            { name: 'Conexão Pedagógica Global', time: 'Todo o dia', description: 'Encontros virtuais entre professores de diferentes países para troca de experiências e práticas.' }
        ],
        '2025-09-20': [
            { name: 'Metodologias Ativas na Prática', time: '10:00 - 16:00', description: 'Workshop sobre implementação de metodologias ativas em diferentes contextos educacionais.' }
        ],
        '2025-10-15': [
            { name: 'Dia do Professor', time: 'Todo o dia', description: 'Comemoração da importante missão dos educadores com homenagens, reflexão sobre práticas pedagógicas e autocuidado.' }
        ],
        '2025-11-10': [
            { name: 'Hackathon Educacional', time: 'Todo o dia', description: 'Desafio colaborativo para criar soluções educativas inovadoras com professores e alunos.' }
        ],
        '2025-12-05': [
            { name: 'Feira Virtual do Conhecimento', time: 'Todo o dia', description: 'Exposição de projetos desenvolvidos pelos professores ao longo do ano.' }
        ],
        
        // Eventos específicos de disciplinas
        '2025-03-14': [
            { name: 'Dia da Matemática (Pi Day)', time: 'Todo o dia', description: 'Celebração da constante matemática π (3,14...) com atividades lúdicas de geometria e aritmética.' }
        ],
        '2025-04-15': [
            { name: 'Dia da Conservação do Solo', time: 'Todo o dia', description: 'Ideal para aulas de ciências e geografia sobre a importância da conservação do solo.' }
        ],
        '2025-05-05': [
            { name: 'Dia da Língua Portuguesa', time: 'Todo o dia', description: 'Celebração da riqueza linguística e cultural dos países lusófonos.' }
        ],
        '2025-06-05': [
            { name: 'Dia Mundial do Meio Ambiente', time: 'Todo o dia', description: 'Data para atividades de consciência ambiental e sustentabilidade nas escolas.' }
        ],
        '2025-07-08': [
            { name: 'Dia Nacional da Ciência', time: 'Todo o dia', description: 'Data ideal para experimentos científicos e discussões sobre inovações tecnológicas.' }
        ],
        '2025-08-12': [
            { name: 'Dia Nacional das Artes', time: 'Todo o dia', description: 'Oportunidade para explorar diferentes expressões artísticas, desde pintura até música e teatro.' }
        ],
        '2025-08-22': [
            { name: 'Dia do Folclore', time: 'Todo o dia', description: 'Celebração da cultura popular brasileira, lendas, danças e tradições regionais.' }
        ],
        '2025-09-21': [
            { name: 'Dia da Árvore', time: 'Todo o dia', description: 'Data para atividades de educação ambiental e plantio de mudas em escolas.' }
        ],
        '2025-10-31': [
            { name: 'Dia Nacional do Livro', time: 'Todo o dia', description: 'Incentivo à leitura, troca de livros e atividades literárias.' }
        ],
        '2025-11-20': [
            { name: 'Dia Nacional da Consciência Negra', time: 'Todo o dia', description: 'Reflexão sobre a história e cultura afro-brasileira na educação.' }
        ]
    };
    
    // Eventos semanais fixos
    function getWeeklyEvents(date) {
        const weekNum = Math.ceil(date.getDate() / 7);
        const dayOfWeek = date.getDay(); // 0 = domingo, 1 = segunda, ...
        
        if (weekNum === 1 && dayOfWeek === 2) { // 1ª semana, terça-feira
            return [{ name: 'Desafio do Educador', time: 'Evento Semanal', description: 'Um mini-desafio prático para aplicar na sala de aula.' }];
        } else if (weekNum === 2 && dayOfWeek === 4) { // 2ª semana, quinta-feira
            return [{ name: 'Roda de Saberes', time: 'Evento Semanal', description: 'Encontro virtual com temas atuais, debate ou bate-papo com especialistas.' }];
        } else if (weekNum === 3 && dayOfWeek === 6) { // 3ª semana, sábado
            return [{ name: 'Dia do Cuidado Docente', time: 'Evento Semanal', description: 'Dicas de saúde mental, bem-estar e autocuidado para professores.' }];
        } else if (weekNum === 4 && dayOfWeek === 0) { // 4ª semana, domingo
            return [{ name: 'Café com Planejamento', time: 'Evento Semanal', description: 'Sessão interativa com dicas e templates para planejar a semana seguinte.' }];
        }
        
        return null;
    }
    
    function getFormattedDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    function renderCalendar(date) {
        // Limpar dias anteriores
        while (calendarGrid.children.length > 7) { // Mantém os cabeçalhos
            calendarGrid.removeChild(calendarGrid.lastChild);
        }
        
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Atualizar título do mês
        currentMonthElement.textContent = `${months[month]} ${year}`;
        
        // Obter o primeiro dia do mês
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Adicionar dias do mês anterior para preencher a primeira semana
        const startingDayOfWeek = firstDay.getDay(); // 0 = domingo, 6 = sábado
        const prevMonthLastDay = new Date(year, month, 0);
        
        for (let i = 0; i < startingDayOfWeek; i++) {
            const prevDate = new Date(year, month - 1, prevMonthLastDay.getDate() - startingDayOfWeek + i + 1);
            const prevDateString = getFormattedDateString(prevDate);
            const hasEvent = events[prevDateString] ? true : false;
            const weeklyEvents = getWeeklyEvents(prevDate);
            const hasWeeklyEvent = weeklyEvents !== null;
            
            let className = 'other-month';
            if (hasEvent || hasWeeklyEvent) className += ' has-event';
            
            const dayElement = createDayElement(prevDate.getDate(), className, prevDate, hasEvent, hasWeeklyEvent);
            calendarGrid.appendChild(dayElement);
        }
        
        // Adicionar dias do mês atual
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDayDate = new Date(year, month, day);
            const currentDateString = getFormattedDateString(currentDayDate);
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const hasEvent = events[currentDateString] ? true : false;
            const weeklyEvents = getWeeklyEvents(currentDayDate);
            const hasWeeklyEvent = weeklyEvents !== null;
            
            let className = '';
            if (isToday) className = 'today';
            if (hasEvent || hasWeeklyEvent) className += ' has-event';
            
            const dayElement = createDayElement(day, className, currentDayDate, hasEvent, hasWeeklyEvent);
            calendarGrid.appendChild(dayElement);
        }
        
        // Adicionar dias do próximo mês para completar a última semana
        const daysFromLastMonth = calendarGrid.children.length - 7;
        const totalDaysToShow = 7 * Math.ceil(daysFromLastMonth / 7);
        const remainingDays = totalDaysToShow - daysFromLastMonth;
        
        for (let day = 1; day <= remainingDays; day++) {
            const nextDate = new Date(year, month + 1, day);
            const nextDateString = getFormattedDateString(nextDate);
            const hasEvent = events[nextDateString] ? true : false;
            const weeklyEvents = getWeeklyEvents(nextDate);
            const hasWeeklyEvent = weeklyEvents !== null;
            
            let className = 'other-month';
            if (hasEvent || hasWeeklyEvent) className += ' has-event';
            
            const dayElement = createDayElement(day, className, nextDate, hasEvent, hasWeeklyEvent);
            calendarGrid.appendChild(dayElement);
        }
    }
    
    function createDayElement(dayNumber, className, date, hasEvent, hasWeeklyEvent) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        if (className) {
            className.split(' ').forEach(cls => {
                if (cls) dayElement.classList.add(cls);
            });
        }
        
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-date');
        dateElement.textContent = dayNumber;
        
        dayElement.appendChild(dateElement);
        
        // Adicionar indicador de evento
        if (hasEvent || hasWeeklyEvent) {
            dayElement.appendChild(createEventIndicator());
            
            const dateString = getFormattedDateString(date);
            const eventsList = [];
            
            // Adicionar eventos específicos
            if (hasEvent && events[dateString]) {
                eventsList.push(...events[dateString]);
            }
            
            // Adicionar eventos semanais
            if (hasWeeklyEvent) {
                eventsList.push(...getWeeklyEvents(date));
            }
            
            if (eventsList.length > 0) {
                dayElement.appendChild(createEventPopup(date, eventsList));
            }
        }
        
        return dayElement;
    }
    
    function createEventIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('event-indicator');
        return indicator;
    }
    
    function createEventPopup(date, eventsList) {
        const popup = document.createElement('div');
        popup.classList.add('event-popup');
        
        const title = document.createElement('div');
        title.classList.add('event-popup-title');
        title.textContent = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
        popup.appendChild(title);
        
        eventsList.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-item');
            
            const eventName = document.createElement('div');
            eventName.classList.add('event-name');
            eventName.textContent = event.name;
            
            const eventTime = document.createElement('div');
            eventTime.classList.add('event-time');
            eventTime.innerHTML = `<i class="fas fa-clock"></i> ${event.time}`;
            
            const eventDesc = document.createElement('div');
            eventDesc.classList.add('event-time');
            eventDesc.style.marginTop = '5px';
            eventDesc.textContent = event.description;
            
            eventItem.appendChild(eventName);
            eventItem.appendChild(eventTime);
            eventItem.appendChild(eventDesc);
            popup.appendChild(eventItem);
        });
        
        return popup;
    }
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    
    // Inicializar calendário com o mês configurado (janeiro 2025)
    renderCalendar(currentDate);
}

// Atualizar data
function updateDate() {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('pt-BR', options);
    document.getElementById('lastUpdate').textContent = formattedDate;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateCards();
    updateDate();
    initSmoothScroll();
    initResourcesFilter();
    initCalendar();
    
    // Suavizar transições nos links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'var(--transition-normal)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transition = 'var(--transition-normal)';
        });
    });
    
    // Adicionar eventos aos cards para abrir modais
    document.querySelectorAll('.premium-card').forEach(card => {
        if (card.querySelector('.resource-title a').textContent.includes('Google Earth')) {
            card.addEventListener('dblclick', openEarthModal);
        }
        if (card.querySelector('.resource-title a').textContent.includes('Notion')) {
            card.addEventListener('dblclick', openNotionModal);
        }
    });
});
