const assert = require('assert');
const { test } = require('node:test');
const { Card, Deck } = require('../script.js');

test('pushAll adds cards to bottom', () => {
  const deck = new Deck([new Card('♠','A'), new Card('♠','2')]);
  deck.pushAll([new Card('♣','3'), new Card('♣','4')]);
  assert.deepStrictEqual(deck.cards.map(c => c.value), ['A','2','3','4']);
});

test('won cards are placed at bottom and next round uses top', () => {
  const p1Deck = new Deck([new Card('♠','2'), new Card('♠','3'), new Card('♠','4')]);
  const p2Deck = new Deck([new Card('♣','5'), new Card('♣','6'), new Card('♣','7')]);
  const roundCards = [p1Deck.pop(), p2Deck.pop()]; // 2 vs 5 -> player2 wins
  p2Deck.pushAll(roundCards);
  assert.deepStrictEqual(p2Deck.cards.map(c => c.value), ['6','7','2','5']);
  assert.strictEqual(p2Deck.pop().value, '6');
});
