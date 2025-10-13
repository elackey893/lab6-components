# Lab 6: Component Approaches

This repository demonstrates four different ways to build a simple Eliza-style chatbot interface, exploring component-based thinking in web development. Each approach builds the same chat UI (message bubbles, input form, pattern-matching responses) but with increasing levels of modularity, reusability, and encapsulation.

## Live Demo
View the project on GitHub Pages: [https://evanlackey.github.io/lab6-components](https://elackey893.github.io/lab6-components/)  

## Project Structure
- **Root**: `index.html` (navigation hub with links to all approaches).
- **chat-prototype-html-css/**: Static HTML/CSS mockup (visual only).
- **chat-dom/**: Vanilla JS DOM manipulation for interactivity.
- **chat-webcomponent-pe/**: Progressive Enhancement web component (HTML-first, JS upgrade).
- **chat-webcomponent-gd/**: Fully encapsulated Shadow DOM web component (JS-generated, isolated).

All versions use the same eliza.js module for pattern-matching responses (e.g., greetings, questions, reflections).

## Reflections on Differences
- **Complexity**: Prototype/DOM are simplest (vanilla HTML/JS). PE adds modularity (custom element). Shadow DOM is most complex but most robust for libraries.
- **Reusability**: Prototype/DOM require copy-paste. PE/Shadow are droppable tags—PE needs markup inside, Shadow is self-contained.
- **Encapsulation**: Prototype/DOM/PE use global styles (risk leaks/conflicts). Shadow isolates everything (ideal for third-party components).
- **Accessibility**: All semantic (forms, ARIA-friendly bubbles). PE best fallback (works sans JS); Shadow/DOM blank without it.
- **Maintainability**: Shadow easiest to debug/update (isolated); DOM/PE easier for quick tweaks.

*Overall, start with Prototype for design, DOM for basic interactivity, PE for reusable enhancement, Shadow for production-grade encapsulation.*

## Challenges and Limitations
- **Eliza Logic**: Simple patterns work for demo but lack advanced NLP (e.g., no context/memory across messages).
- **Styling Consistency**: Matching bubble notches/gradients across approaches was tricky without shared CSS—used inline for isolation.
- **Enter Key Handling**: Default form submit prevented page reloads; added trim to skip empties.
- **Shadow DOM Testing**: Inspecting scoped styles required dev tools shadow toggle; no external CSS leaks.
- **Limitations**: No timestamps/avatars (kept minimal); mobile responsiveness basic (fixed widths).

## Implementation Notes
- **Testing**: Verified in Chrome/Firefox/Safari; JS off for PE fallback; keyboard nav for accessibility.
- **Files**: eliza.js shared across folders; styles.css per approach for isolation.

## Approaches Overview

| Approach | Description | Key Features | Trade-offs |
|----------|-------------|--------------|------------|
| **HTML/CSS Prototype** | Pure static layout—no JS. Pre-written messages in bubbles, disabled input. | Semantic HTML (*<header>*, *<chat-window>*, *<form>*, *<footer>*); styled with Flexbox/Grid for alignment/rounding. | Non-interactive (great for design iteration); no reusability; styles global. |
| **DOM Manipulation** | Vanilla JS adds events/logic to static HTML (empty *<chat-window>*). | *createElement*/*appendChild* for dynamic bubbles; event listeners for click/Enter; auto-scroll; imports eliza.js. | Simple but page-specific (tied to IDs); blank if JS fails; global styles/scripts. |
| **Progressive Enhancement** | Custom *<simple-chat>* with slotted markup; JS enhances existing elements. | Queries slotted *.messages*/**.input-area**; *addEventListener* scoped to element; graceful fallback (static form/message if JS off). | Reusable tag; accessible without JS; global styles (leaks possible); more setup than DOM. |
| **Shadow DOM Encapsulation** | Empty *<chat-interface>*; JS builds all HTML/CSS inside sealed Shadow DOM. | *attachShadow({mode: 'open'})*; innerHTML template with *<style>*; scoped queries/manipulation; no leaks. | Fully portable (drop-in anywhere); isolated styles/logic; blank if JS fails (trade-off for encapsulation). |
