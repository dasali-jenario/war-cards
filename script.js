class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red';
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

function createFullDeck() {
    const SUITS = ["♠", "♣", "♥", "♦"];
    const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const cards = SUITS.flatMap(suit => VALUES.map(value => new Card(suit, value)));
    const deck = new Deck(cards);
    deck.shuffle();
    return deck;
}

// --- DOM Elements ---
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

player1Name.addEventListener('blur', () => {
    if (!player1Name.textContent.trim()) {
        player1Name.textContent = "Player 1";
    }
});

player2Name.addEventListener('blur', () => {
    if (gameMode === 'pvp' && !player2Name.textContent.trim()) {
        player2Name.textContent = "Player 2";
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
});

function startGame(mode) {
    gameMode = mode;
    gameModeSelection.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    nextTurnButton.classList.remove('hidden');
    document.body.classList.remove('war-mode');
    player1CardSlot.classList.remove('war-pile');
    player2CardSlot.classList.remove('war-pile');

    player1Name.textContent = "Player 1";
    player1Name.setAttribute('contenteditable', 'true');

    if (gameMode === 'pvc') {
        player2Name.textContent = "Computer";
        player2Name.removeAttribute('contenteditable');
    } else {
        player2Name.textContent = "Player 2";
        player2Name.setAttribute('contenteditable', 'true');
    }

    const deck = createFullDeck();
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
    nextTurnButton.textContent = "Next Turn";
    player1CardSlot.innerHTML = '';
    player2CardSlot.innerHTML = '';
    messageArea.textContent = "Click 'Next Turn' to start!";
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

    // Clear board from previous round's results
    player1CardSlot.classList.remove('war-pile');
    player2CardSlot.classList.remove('war-pile');
    player1CardSlot.innerHTML = '';
    player2CardSlot.innerHTML = '';

    if (inWar) {
        handleWar();
        return;
    }

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
        handleRoundWinner(player1Deck, player1Section, "Player 1");
    } else if (value2 > value1) {
        handleRoundWinner(player2Deck, player2Section, player2Name.textContent);
    } else {
        messageArea.textContent = "War!";
        inWar = true;
        document.body.classList.add('war-mode');
        nextTurnButton.textContent = "Go to War";
        nextTurnButton.disabled = false; // Re-enable button for user to click
    }
}

function handleRoundWinner(winnerDeck, winnerSection, winnerName) {
    const wasWar = inWar;
    flashWinner(winnerSection);

    if (wasWar) {
        messageArea.textContent = `${winnerName} wins the war and takes all ${roundCards.length} cards!`;
        displayWarCards();
        setTimeout(() => {
            winnerDeck.pushAll(roundCards);
            roundCards = [];
            inWar = false;
            document.body.classList.remove('war-mode');
            nextTurnButton.disabled = false;
            nextTurnButton.textContent = "Next Turn";
        }, 3000); // 3-second delay to view spoils
    } else {
        messageArea.textContent = `${winnerName} wins the round!`;
        winnerDeck.pushAll(roundCards);
        roundCards = [];
        nextTurnButton.disabled = false;
    }
}

function handleWar() {
    nextTurnButton.disabled = true;
    player1CardSlot.innerHTML = '';
    player2CardSlot.innerHTML = '';

    const cardsToLay = Math.min(3, player1Deck.numberOfCards -1, player2Deck.numberOfCards - 1);

    for (let i = 0; i < cardsToLay; i++) {
        setTimeout(() => {
            const p1c = player1Deck.pop();
            const p2c = player2Deck.pop();
            if(p1c) roundCards.push(p1c);
            if(p2c) roundCards.push(p2c);
            
            const p1CardElem = p1c.getHTML();
            p1CardElem.classList.add('face-down');
            animateCard(player1CardSlot, p1CardElem, i * 10);
            
            const p2CardElem = p2c.getHTML();
            p2CardElem.classList.add('face-down');
            animateCard(player2CardSlot, p2CardElem, i * 10);

            updateCardCounts();
        }, i * 400);
    }

    if (checkGameOver()) return;

    setTimeout(() => {
        const warCard1 = player1Deck.pop();
        const warCard2 = player2Deck.pop();

        if (!warCard1 || !warCard2) {
            if (!warCard1 && warCard2) roundCards.push(warCard2);
            if (!warCard2 && warCard1) roundCards.push(warCard1);

            if (!warCard1) player2Deck.pushAll(roundCards);
            if (!warCard2) player1Deck.pushAll(roundCards);
            checkGameOver();
            return;
        }

        roundCards.push(warCard1, warCard2);

        const warCard1Elem = warCard1.getHTML();
        animateCard(player1CardSlot, warCard1Elem, cardsToLay * 10);

        const warCard2Elem = warCard2.getHTML();
        animateCard(player2CardSlot, warCard2Elem, cardsToLay * 10);

        updateCardCounts();
        compareCards(warCard1, warCard2);
        nextTurnButton.disabled = false;
        if(inWar) {
            nextTurnButton.textContent = "Go to War";
        } else {
            nextTurnButton.textContent = "Next Turn";
        }
    }, cardsToLay * 400 + 200);
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
    }
    if (player2Deck.numberOfCards === 0) {
        endGame("Player 1");
        return true;
    }
    return false;
}

function endGame(winner) {
    gameBoard.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    winnerMessage.textContent = `${winner} Wins the Game!`;
    nextTurnButton.classList.add('hidden');
} 