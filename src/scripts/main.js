document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica do Header (Intersection Observer) ---
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');

    const observerOptions = {
        root: null,
        threshold: 0, 
        rootMargin: "-80px 0px 0px 0px"
    };

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                exibeElementosDoHeader();
            } else {
                ocultaElementosDoHeader();
            }
        });
    }, observerOptions);

    headerObserver.observe(heroSection);


    // Lógica das Abas (Tabs)
    const tabs = document.querySelectorAll('[data-tab-id]');
 
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tabId;
            removeAtivos();
            recolheSinopses();
            this.classList.add('tabs__item--is-active');
            document.getElementById(tabId).classList.add('sinopse__item--is-active');
        });
    });

    // Lógica dos botões INFO
    const infoButtons = document.querySelectorAll('[data-info-id]');
    
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sinopse = this.closest('li').querySelector('.tabs__sinopse');
            sinopse.classList.toggle('tabs__sinopse--is-active');
            
            if (sinopse.classList.contains('tabs__sinopse--is-active')) {
                this.innerText = 'INFO (-)';
            } else {
                this.innerText = 'INFO (+)';
            }
        });
    });

    // --- Lógica "Ver Mais" das Sinopses ---
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const description = this.previousElementSibling;
            description.classList.toggle('tabs__sinopse__description--expanded');
            
            this.textContent = description.classList.contains('tabs__sinopse__description--expanded') 
                ? 'Ver menos' 
                : 'Ver mais';
        });
    });

    // --- Lógica do FAQ (Accordion) ---
    const questions = document.querySelectorAll('[data-faq-question]');
    questions.forEach(question => {
        question.addEventListener('click', abreOuFechaResposta);
    });
});


// --- Funções Auxiliares ---

function ocultaElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
}

function exibeElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
}

function removeAtivos() {
    const tabs = document.querySelectorAll('[data-tab-id]');
    const contents = document.querySelectorAll('.sinopse__item');
    tabs.forEach(t => t.classList.remove('tabs__item--is-active'));
    contents.forEach(c => c.classList.remove('sinopse__item--is-active'));
}

function recolheSinopses() {
    const descriptions = document.querySelectorAll('.tabs__sinopse__description');
    const buttons = document.querySelectorAll('.read-more-btn');

    descriptions.forEach(desc => {
        desc.classList.remove('tabs__sinopse__description--expanded');
    });

    buttons.forEach(btn => {
        btn.textContent = 'Ver mais';
    });
}

function abreOuFechaResposta(evento) {
    const classe = 'faq__questions__item--is-open';
    const elementoPai = evento.currentTarget.parentNode;
    elementoPai.classList.toggle(classe);
}