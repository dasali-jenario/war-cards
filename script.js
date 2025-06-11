class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        if (['♥', '♦', '🌹'].includes(this.suit)) {
            return 'red';
        }
        return 'black';
    }

    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', this.color);
        cardDiv.dataset.value = this.value; 
    
        const suitSpan = document.createElement('span');
        suitSpan.innerText = this.suit;
        cardDiv.appendChild(suitSpan);
    
        return cardDiv;
    }
}

class Deck {
    constructor(cards = []) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    pop() {
        return this.cards.shift();
    }

    push(card) {
        this.cards.push(card);
    }

    pushAll(cards) {
        this.cards.push(...cards);
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[newIndex]] = [this.cards[newIndex], this.cards[i]];
        }
    }
}

function createDeck(deckType = 'standard') {
    let SUITS, VALUES;

    if (deckType === 'swiss') {
        SUITS = ["🛡️", "🌹", "🔔", "🌰"];
        VALUES = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    } else { // 'standard'
        SUITS = ["♠", "♣", "♥", "♦"];
        VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    }

    const cards = SUITS.flatMap(suit => VALUES.map(value => new Card(suit, value)));
    const deck = new Deck(cards);
    deck.shuffle();
    return deck;
}

// --- Translations ---
const translations = {
    en: {
        title: "War Card Game",
        gameTitle: "War Card Game",
        selectLanguageLabel: "Language:",
        selectDeckLabel: "Card Deck:",
        standardDeck: "Standard Deck",
        swissDeck: "Swiss-suited Deck",
        selectThemeLabel: "Card Theme:",
        selectGameMode: "Select Game Mode",
        pvcButton: "Player vs. Computer",
        pvpButton: "Player vs. Player",
        player1Name: "Player 1",
        player2Name: "Player 2",
        computerName: "Computer",
        playRoundButton: "Play Round",
        nextTurnButton: "Next Turn",
        goToWarButton: "Go to War",
        restartButton: "Restart Game",
        roundStartMessage: "Click 'Next Turn' to start!",
        warMessage: "War!",
        warWinnerUndetermined: "War winner is not yet determined. Another card for war!",
        notEnoughCardsForWar: "Not enough cards for war.",
        roundWinnerMessage: "{playerName} wins the round!",
        gameWinnerMessage: "{winnerName} wins the game!"
    },
    de: {
        title: "Krieg Kartenspiel",
        gameTitle: "Krieg Kartenspiel",
        selectLanguageLabel: "Sprache:",
        selectDeckLabel: "Kartendeck:",
        standardDeck: "Standard-Deck",
        swissDeck: "Schweizer Deck",
        selectThemeLabel: "Karten-Thema:",
        selectGameMode: "Spielmodus auswählen",
        pvcButton: "Spieler gegen Computer",
        pvpButton: "Spieler gegen Spieler",
        player1Name: "Spieler 1",
        player2Name: "Spieler 2",
        computerName: "Computer",
        playRoundButton: "Runde spielen",
        nextTurnButton: "Nächster Zug",
        goToWarButton: "In den Krieg ziehen",
        restartButton: "Spiel neustarten",
        roundStartMessage: "Klicken Sie auf 'Nächster Zug', um zu beginnen!",
        warMessage: "Krieg!",
        warWinnerUndetermined: "Kriegsgewinner steht noch nicht fest. Noch eine Karte für den Krieg!",
        notEnoughCardsForWar: "Nicht genug Karten für den Krieg.",
        roundWinnerMessage: "{playerName} gewinnt die Runde!",
        gameWinnerMessage: "{winnerName} gewinnt das Spiel!"
    },
    fr: {
        title: "Jeu de Cartes de la Bataille",
        gameTitle: "Jeu de Cartes de la Bataille",
        selectLanguageLabel: "Langue:",
        selectDeckLabel: "Jeu de cartes:",
        standardDeck: "Jeu Standard",
        swissDeck: "Jeu Suisse",
        selectThemeLabel: "Thème des cartes:",
        selectGameMode: "Sélectionnez le mode de jeu",
        pvcButton: "Joueur contre Ordinateur",
        pvpButton: "Joueur contre Joueur",
        player1Name: "Joueur 1",
        player2Name: "Joueur 2",
        computerName: "Ordinateur",
        playRoundButton: "Jouer la manche",
        nextTurnButton: "Tour suivant",
        goToWarButton: "Aller à la bataille",
        restartButton: "Recommencer le jeu",
        roundStartMessage: "Cliquez sur 'Tour suivant' pour commencer!",
        warMessage: "Bataille!",
        warWinnerUndetermined: "Le vainqueur de la bataille n'est pas encore déterminé. Une autre carte pour la bataille!",
        notEnoughCardsForWar: "Pas assez de cartes pour la bataille.",
        roundWinnerMessage: "{playerName} gagne la manche!",
        gameWinnerMessage: "{winnerName} gagne la partie!"
    },
    it: {
        title: "Gioco di Carte della Guerra",
        gameTitle: "Gioco di Carte della Guerra",
        selectLanguageLabel: "Lingua:",
        selectDeckLabel: "Mazzo di Carte:",
        standardDeck: "Mazzo Standard",
        swissDeck: "Mazzo Svizzero",
        selectThemeLabel: "Tema Carta:",
        selectGameMode: "Seleziona modalità di gioco",
        pvcButton: "Giocatore contro Computer",
        pvpButton: "Giocatore contro Giocatore",
        player1Name: "Giocatore 1",
        player2Name: "Giocatore 2",
        computerName: "Computer",
        playRoundButton: "Gioca il turno",
        nextTurnButton: "Prossimo turno",
        goToWarButton: "Vai in guerra",
        restartButton: "Ricomincia il gioco",
        roundStartMessage: "Clicca 'Prossimo turno' per iniziare!",
        warMessage: "Guerra!",
        warWinnerUndetermined: "Il vincitore della guerra non è ancora stato determinato. Un'altra carta per la guerra!",
        notEnoughCardsForWar: "Non ci sono abbastanza carte per la guerra.",
        roundWinnerMessage: "{playerName} vince il round!",
        gameWinnerMessage: "{winnerName} vince la partita!"
    }
};

let currentLanguage = 'en';

function applyTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-light');
    if (theme === 'dark') {
        document.body.classList.add('theme-dark');
    } else if (theme === 'light') {
        document.body.classList.add('theme-light');
    }
}

function getTranslation(key, replacements = {}) {
    let translation = translations[currentLanguage][key] || translations['en'][key];
    Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    return translation;
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (key === 'title') {
            document.title = translation;
        } else {
            // Preserve child nodes for elements like names that might have other elements inside
            const firstChild = element.firstChild;
            if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
                firstChild.nodeValue = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Update dynamic text that might be on screen
    updateDynamicText();
}

function updateDynamicText() {
    // This function will re-translate any dynamic text currently displayed
    if (!gameBoard.classList.contains('hidden')) {
        if (player2Name.textContent === translations['en'].computerName || 
            player2Name.textContent === translations['de'].computerName ||
            player2Name.textContent === translations['fr'].computerName ||
            player2Name.textContent === translations['it'].computerName) 
        {
            if (gameMode === 'pvc') {
                player2Name.textContent = getTranslation('computerName');
            }
        }
        
        const currentMessage = messageArea.textContent;
        if (currentMessage.includes("wins the round") || currentMessage.includes("gewinnt die Runde") || currentMessage.includes("gagne la manche") || currentMessage.includes("vince il round")) {
            const playerName = currentMessage.split(" ")[0];
            messageArea.textContent = getTranslation('roundWinnerMessage', { playerName: playerName });
        } else if (messageArea.dataset.key) { // Use a data attribute to remember the message key
            messageArea.textContent = getTranslation(messageArea.dataset.key);
        }
        
        if (nextTurnButton.dataset.key) {
            nextTurnButton.textContent = getTranslation(nextTurnButton.dataset.key);
        }
    }

    if (!gameOverScreen.classList.contains('hidden')) {
        const winner = winnerMessage.dataset.winner;
        if (winner) {
            winnerMessage.textContent = getTranslation('gameWinnerMessage', { winnerName: winner });
        }
    }
}

// --- DOM Elements ---
const languageSelect = document.getElementById('language-select');
const deckSelect = document.getElementById('deck-select');
const themeSelect = document.getElementById('theme-select');
const gameModeSelection = document.getElementById('game-mode-selection');
const pvcButton = document.getElementById('pvc-button');
const pvpButton = document.getElementById('pvp-button');
const gameBoard = document.getElementById('game-board');
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Section = document.getElementById('player1-section');
const player2Section = document.getElementById('player2-section');
const player1CardCount = document.getElementById('player1-card-count');
const player2CardCount = document.getElementById('player2-card-count');
const messageArea = document.getElementById('message-area');
const player1CardSlot = document.getElementById('player1-card-slot');
const player2CardSlot = document.getElementById('player2-card-slot');
const nextTurnButton = document.getElementById('next-turn-button');
const gameOverScreen = document.getElementById('game-over-screen');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restart-button');

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLang;
    setLanguage(savedLang);

    const savedTheme = localStorage.getItem('theme') || 'default';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
});

languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
});

themeSelect.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    applyTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
});

player1Name.addEventListener('blur', () => {
    if (!player1Name.textContent.trim()) {
        player1Name.textContent = getTranslation('player1Name');
    }
});

player2Name.addEventListener('blur', () => {
    if (gameMode === 'pvp' && !player2Name.textContent.trim()) {
        player2Name.textContent = getTranslation('player2Name');
    }
});

// --- Game State ---
let gameMode = null; // 'pvc' or 'pvp'
let player1Deck, player2Deck;
let roundCards;
let inWar = false;

const CARD_VALUE_MAP = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 11, "Q": 12, "K": 13, "A": 14
};

// --- Game Setup ---
pvcButton.addEventListener('click', () => startGame('pvc'));
pvpButton.addEventListener('click', () => startGame('pvp'));
restartButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    gameModeSelection.classList.remove('hidden');
    setLanguage(currentLanguage); // Re-apply translations to main menu
});

function startGame(mode) {
    gameMode = mode;
    gameModeSelection.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    nextTurnButton.classList.remove('hidden');
    document.body.classList.remove('war-mode');
    player1CardSlot.classList.remove('war-pile');
    player2CardSlot.classList.remove('war-pile');

    player1Name.textContent = getTranslation('player1Name');
    player1Name.setAttribute('contenteditable', 'true');

    if (gameMode === 'pvc') {
        player2Name.textContent = getTranslation('computerName');
        player2Name.removeAttribute('contenteditable');
    } else {
        player2Name.textContent = getTranslation('player2Name');
        player2Name.setAttribute('contenteditable', 'true');
    }

    const deckType = deckSelect.value;
    const deck = createDeck(deckType);
    const midPoint = Math.ceil(deck.numberOfCards / 2);
    player1Deck = new Deck(deck.cards.slice(0, midPoint));
    player2Deck = new Deck(deck.cards.slice(midPoint, deck.numberOfCards));
    
    roundCards = []; // Initialize roundCards array at the start of the game
    resetRound();
    updateCardCounts();
}

// --- UI Updates ---

function updateCardCounts() {
    player1CardCount.textContent = player1Deck.numberOfCards;
    player2CardCount.textContent = player2Deck.numberOfCards;
}

function displayWarCards() {
    player1CardSlot.innerHTML = '';
    player2CardSlot.innerHTML = ''; // Clear both slots
    player1CardSlot.classList.add('war-pile');
    player2CardSlot.classList.add('war-pile');

    let p1CardCount = 0;
    let p2CardCount = 0;

    roundCards.forEach((card, i) => {
        const cardElem = card.getHTML();
        // Reveal any face-down cards to show the full spoils
        cardElem.classList.remove('face-down');

        if (i % 2 === 0) { // Player 1's card
            cardElem.style.setProperty('--i', p1CardCount);
            cardElem.style.zIndex = p1CardCount;
            player1CardSlot.appendChild(cardElem);
            p1CardCount++;
        } else { // Player 2's card
            cardElem.style.setProperty('--i', p2CardCount);
            cardElem.style.zIndex = p2CardCount;
            player2CardSlot.appendChild(cardElem);
            p2CardCount++;
        }
    });
}

function resetRound() {
    inWar = false;
    nextTurnButton.disabled = false;
    nextTurnButton.textContent = getTranslation('nextTurnButton');
    nextTurnButton.dataset.key = 'nextTurnButton';
    player1CardSlot.innerHTML = '';
    player2CardSlot.innerHTML = '';
    player1CardSlot.classList.remove('war-pile');
    player2CardSlot.classList.remove('war-pile');
    messageArea.textContent = getTranslation('roundStartMessage');
    messageArea.dataset.key = 'roundStartMessage';
}

function animateCard(cardSlot, cardElement, offset = 0) {
    cardElement.style.transform = `translateX(${offset}px)`;
    cardSlot.appendChild(cardElement);
    setTimeout(() => cardElement.classList.add('played'), 50);
}

// --- Game Logic ---

nextTurnButton.addEventListener('click', playRound);

function playRound() {
    nextTurnButton.disabled = true; // Disable button to prevent race conditions

    if (inWar) {
        handleWar();
        return;
    }

    resetRound();

    if (checkGameOver()) return;

    const player1Card = player1Deck.pop();
    const player2Card = player2Deck.pop();

    if (!player1Card || !player2Card) {
        checkGameOver();
        return;
    }

    roundCards.push(player1Card, player2Card);

    player1CardSlot.innerHTML = '';
    const player1CardElement = player1Card.getHTML();
    animateCard(player1CardSlot, player1CardElement);
    
    player2CardSlot.innerHTML = '';
    const player2CardElement = player2Card.getHTML();
    animateCard(player2CardSlot, player2CardElement);

    compareCards(player1Card, player2Card);
    updateCardCounts();
}

function compareCards(card1, card2) {
    const value1 = CARD_VALUE_MAP[card1.value];
    const value2 = CARD_VALUE_MAP[card2.value];

    if (value1 > value2) {
        handleRoundWinner(player1Deck, player1Section, player1Name.textContent);
    } else if (value2 > value1) {
        handleRoundWinner(player2Deck, player2Section, player2Name.textContent);
    } else {
        messageArea.textContent = getTranslation('warMessage');
        messageArea.dataset.key = 'warMessage';
        inWar = true;
        document.body.classList.add('war-mode');
        nextTurnButton.textContent = getTranslation('goToWarButton');
        nextTurnButton.dataset.key = 'goToWarButton';
        nextTurnButton.disabled = false; // Re-enable button for user to click
    }
}

function handleRoundWinner(winningDeck, winnerSection, winnerName) {
    messageArea.textContent = getTranslation('roundWinnerMessage', { playerName: winnerName });
    messageArea.dataset.key = ''; // Clear key as this is a dynamic message
    winningDeck.pushAll(roundCards);
    roundCards = [];
    flashWinner(winnerSection);

    // Short delay to allow player to see result before next turn is enabled
    setTimeout(() => {
        if (!checkGameOver()) {
            if (inWar) {
                resetRound(); // Explicitly reset after a war
                document.body.classList.remove('war-mode');
            }
             nextTurnButton.disabled = false;
             nextTurnButton.textContent = getTranslation('nextTurnButton');
             nextTurnButton.dataset.key = 'nextTurnButton';
        }
    }, 1000);
}

function handleWar() {
    if (player1Deck.numberOfCards < 4 || player2Deck.numberOfCards < 4) {
        messageArea.textContent = getTranslation('notEnoughCardsForWar');
        messageArea.dataset.key = 'notEnoughCardsForWar';
        // Simplified end-game: whoever has more cards wins.
        const winner = player1Deck.numberOfCards > player2Deck.numberOfCards ? player1Name.textContent : player2Name.textContent;
        endGame(winner);
        return;
    }

    // War cards (3 face down, 1 face up)
    const p1WarCards = [player1Deck.pop(), player1Deck.pop(), player1Deck.pop()];
    const p1FaceUpCard = player1Deck.pop();
    const p2WarCards = [player2Deck.pop(), player2Deck.pop(), player2Deck.pop()];
    const p2FaceUpCard = player2Deck.pop();

    roundCards.push(...p1WarCards, p1FaceUpCard, ...p2WarCards, p2FaceUpCard);
    
    // Display all cards in the pot
    displayWarCards();
    
    // Animate the face-up cards
    const player1CardElement = p1FaceUpCard.getHTML();
    const player2CardElement = p2FaceUpCard.getHTML();
    animateCard(player1CardSlot, player1CardElement, (roundCards.length / 2 - 1) * 15);
    animateCard(player2CardSlot, player2CardElement, (roundCards.length / 2 - 1) * 15);

    updateCardCounts();
    compareCards(p1FaceUpCard, p2FaceUpCard);
}

function flashWinner(playerSection) {
    playerSection.classList.add('winner-flash');
    setTimeout(() => {
        playerSection.classList.remove('winner-flash');
    }, 500); // Animation duration
}

function checkGameOver() {
    if (player1Deck.numberOfCards === 0) {
        endGame(player2Name.textContent);
        return true;
    } else if (player2Deck.numberOfCards === 0) {
        endGame(player1Name.textContent);
        return true;
    }
    return false;
}

function endGame(winner) {
    gameOverScreen.classList.remove('hidden');
    gameBoard.classList.add('hidden');
    nextTurnButton.classList.add('hidden');
    winnerMessage.textContent = getTranslation('gameWinnerMessage', { winnerName: winner });
    winnerMessage.dataset.winner = winner;
} 