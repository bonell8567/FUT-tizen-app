// Função para esconder o botão "X" de fechar anúncio que fica no canto
function hideAnnoyingElements() {
    const css = `
        div[onclick="closeAd()"] {
            display: none !important;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    console.log("CSS customizado injetado para esconder elementos.");
}

// Lógica principal para manipular o player
function handlePlayer() {
    const playButton = document.querySelector('.play-wrapper > .play');
    const closeAdButton = document.querySelector('.close-ad');

    if (closeAdButton) {
        console.log("Botão de fechar anúncio encontrado, clicando...");
        closeAdButton.click();
    }

    if (playButton) {
        console.log("Botão de Play inicial encontrado, clicando...");
        playButton.click();
        // Depois de clicar, não precisamos mais observar o play inicial
        observer.disconnect();
        setupKeydownListener();
    }
}

// Um observador que "assiste" a página para ver quando o player é carregado
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            handlePlayer();
        }
    }
});

// Começa a observar a página inteira
observer.observe(document.body, { childList: true, subtree: true });

// Função para configurar os botões do controle remoto
function setupKeydownListener() {
    document.addEventListener('keydown', (event) => {
        let targetButton;
        console.log("Tecla Pressionada:", event.key);

        switch (event.key) {
            case 'MediaPlayPause':
                // Tenta clicar no botão de play da barra de controle
                targetButton = document.querySelector('.media-control-button[data-play]');
                if (targetButton) {
                    targetButton.click();
                }
                break;
            
            case 'ColorF0': // Botão VERDE para Tela Cheia
                targetButton = document.querySelector('.media-control-button[data-fullscreen]');
                if (targetButton) {
                    targetButton.click();
                }
                break;
        }
    });
    console.log("Controles do player (Play/Pause, Tela Cheia) estão ativos.");
}

// Esconde elementos irritantes assim que o script começa
hideAnnoyingElements();