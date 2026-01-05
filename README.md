# Themify - Ultimate Theme Customizer

Themify is a powerful browser extension that allows you to customize the look and feel of any website. Whether you want a dark mode, a sleek gradient theme, or a completely random color palette, Themify has you covered.

## Features

- **Rich Predefined Themes**: Ocean, Sunset, Forest, Berry, Midnight, Cyberpunk, Coffee, Rose, Slate, Solarized, and High Contrast.
- **Smart Night Mode**: Instantly turn any website into a dark-themed version.
- **Randomizer**: Generate unique, harmonious color palettes with a single click.
- **Reading Mode**: Reduces eye strain with a sepia filter.
- **Customizer**: Manually set background and text colors.

## Installation Instructions

### Chrome / Edge / Brave

1. Download or clone this repository to a folder on your computer.
2. Open your browser and go to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the folder where you saved these files (`themify-extension`).
6. The extension is now installed! Click the puzzle icon to pin it.

### Mozilla Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Navigate to the `themify-extension` folder and select the `manifest.json` file.
4. The extension is now active for this session.

## Usage

1. Navigate to any website (e.g., wikipedia.org, google.com).
2. Click the Themify icon in your browser toolbar.
3. Select a mode (Night, Light, Reading) or choose a predefined theme.
4. Use the "Random" button to explore new looks.
5. Use "Reset All" to revert to the original website design.

## Development

- `popup.html`: The main user interface.
- `style.css`: Styles for the glassmorphism UI.
- `content.js`: The script that injects styles into webpages.
- `popup.js`: Logic for handling user interactions.

Enjoy customizing any website with Themify!
