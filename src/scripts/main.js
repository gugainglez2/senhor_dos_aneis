document.addEventListener('DOMContentLoaded', () => {
    // Constantes do Header ao Scroll
    const heroSection = document.querySelector('.hero');
    const alturaHero = heroSection.clientHeight;
    // Constantes das Abas (Tabs)
    const tabs = document.querySelectorAll('[data-tab-id]');
    // Seleciona todos os botões de INFO
    const infoButtons = document.querySelectorAll('[data-info-id]')
    // Constantes do Acordion FAQ
    const questions = document.querySelectorAll('[data-faq-question]');

    // Lógica do Header ao Scroll
    window.addEventListener('scroll', function() {
        const posicaoAtual = this.window.scrollY;

        if(posicaoAtual < alturaHero) {
            ocultaElementosDoHeader();
        } else {
            exibeElementosDoHeader();
        }
    })
    
    // Lógica das Abas (Tabs)
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tabId;
            // 1. Remove ativo das capas e conteúdos
            removeAtivos();
            // 2. Adiciona ativo na capa clicada
            this.classList.add('tabs__item--is-active');
            // 3. Adiciona ativo no conteúdo correspondente
            document.getElementById(tabId).classList.add('sinopse__item--is-active');
        });
    });

    // Lógica dos botões de INFO
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sinopse = this.closest('li').querySelector('.tabs__sinopse');
            // Alterna a classe 'is-active'
            sinopse.classList.toggle('tabs__sinopse--is-active');
            // Verifica se a classe está ativa para mudar o texto do botão
            if (sinopse.classList.contains('tabs__sinopse--is-active')) {
                this.innerText = 'INFO (-)';
            } else {
                this.innerText = 'INFO (+)';
            }
        });
    });

    //seção faq, acordion
    for (let i = 0; i < questions.length; i++) {
        questions[i].addEventListener('click', abreOuFechaResposta);
    }
})

// Funções do Header ao Scroll
function ocultaElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.add('header--is-hidden');
}

function exibeElementosDoHeader() {
    const header = document.querySelector('header');
    header.classList.remove('header--is-hidden');
}

// Funções das Abas (Tabs)
function removeAtivos() {
    const tabs = document.querySelectorAll('[data-tab-id]');
    const contents = document.querySelectorAll('.sinopse__item');
    
    tabs.forEach(t => t.classList.remove('tabs__item--is-active'));
    contents.forEach(c => c.classList.remove('sinopse__item--is-active'));
}

// Funções do Acordion FAQ
function abreOuFechaResposta(elemento) {
    const classe = 'faq__questions__item--is-open';
    const elementoPai = elemento.target.parentNode;
    
    elementoPai.classList.toggle(classe);
}

document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Encontra o parágrafo da sinopse que está antes do botão
        const description = this.previousElementSibling;
        
        // Alterna a classe de expansão
        description.classList.toggle('tabs__sinopse__description--expanded');
        
        // Altera o texto do botão
        if (description.classList.contains('tabs__sinopse__description--expanded')) {
            this.textContent = 'Ver menos';
        } else {
            this.textContent = 'Ver mais';
        }
    });
});