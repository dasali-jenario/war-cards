# War Card Game

This project provides a browser-based implementation of the classic card game *War* using plain HTML, CSS and JavaScript. The game logic runs entirely in the browser and no build step or server is required.

## Features

- **Two Game Modes** – play against the computer or another human player.
- **Deck Selection** – choose between a standard 52‑card deck or a Swiss‑suited deck.
- **Language Support** – interface text can be displayed in English, German, French or Italian.
- **Themes** – optional dark and light themes change the look of the cards and board.
- **Animated Gameplay** – cards are animated as rounds are played and during a war.

User preferences such as the selected language and theme are persisted in `localStorage`.

## Running the Game

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Select your language, card deck and preferred theme.
4. Choose *Player vs Computer* or *Player vs Player* to start.
5. Follow the on‑screen prompts to play through rounds until a winner is declared.

## Repository Contents

- `index.html` – markup for the menu, game board and end‑game screen.
- `style.css` – styles for the board, cards, themes and responsive design.
- `script.js` – game logic, translations and DOM interactions.
- `README.md` – project overview and instructions.

## Responsive Layout

The `style.css` file uses CSS media queries to adjust the layout for different
screen widths. On small screens below **600&nbsp;px** the board stacks
vertically, while larger screens display the three main sections side by side.
Additional breakpoints at **900&nbsp;px** and **1200&nbsp;px** further refine the
spacing so the board scales well up to desktop monitors.

Card dimensions are controlled through CSS custom properties so the base size can
be overridden if needed:

```css
:root {
  --card-width: 100px;
  --card-height: 150px;
}
```

Updating these variables resizes both the deck and individual cards without
changing any HTML. This makes it easy to adapt the game for very small or very
large displays.

No external dependencies are required. Simply open the HTML file to play.

## License

This project is licensed under the [MIT License](LICENSE).
