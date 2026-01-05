(() => {
  const STYLE_ID = 'themify-injected-style';

  function getStyleElement() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    return style;
  }

  function removeStyle() {
    const style = document.getElementById(STYLE_ID);
    if (style) style.remove();
    document.documentElement.style.filter = '';
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const styleEl = getStyleElement();
    document.documentElement.style.filter = ''; // Reset filters first

    if (request.type === 'RESET') {
      removeStyle();
      return;
    }

    if (request.type === 'MODE') {
      handleMode(request.mode, styleEl);
    } else if (request.type === 'THEME') {
      handleTheme(request.theme, styleEl);
    } else if (request.type === 'CUSTOM') {
      handleCustom(request, styleEl);
    } else if (request.type === 'CUSTOM_RANDOM') {
      handleRandom(request.hue, styleEl);
    }
  });

  function handleMode(mode, styleEl) {
    if (mode === 'night') {
      styleEl.innerHTML = `
        html { 
          filter: invert(1) hue-rotate(180deg) !important; 
          height: 100%;
          background-color: #1a1a1a !important;
        }
        /* Preserve images, videos, and other media */
        img, video, iframe, canvas, svg, picture, [role="img"], [style*="background-image"] { 
          filter: invert(1) hue-rotate(180deg) !important; 
        }
      `;
    } else if (mode === 'light') {
      removeStyle();
    } else if (mode === 'reading') {
      styleEl.textContent = `
        html {
          filter: sepia(0.6) contrast(0.95) !important;
        }
        body {
           background-color: #fbf0d9 !important;
        }
      `;
    }
  }

  // Helper to generate the CSS block
  function generateThemeCSS(bg, text, accent, isGradient = false) {
    const bgRule = isGradient ? `background: ${bg} !important; background-attachment: fixed !important;` : `background-color: ${bg} !important;`;
    
    // We target text containers for transparency, but preserve buttons and inputs
    return `
      /* Root styles */
      html, body {
        ${bgRule}
        color: ${text} !important;
        min-height: 100vh;
      }

      /* Structural elements - make transparent to show theme bg */
      div, section, article, main, aside, nav, header, footer, 
      p, h1, h2, h3, h4, h5, h6, li, span, ul, ol, dl, dt, dd {
        background-color: transparent !important;
        color: ${text} !important;
        border-color: rgba(255,255,255,0.15) !important;
      }

      /* Links */
      a {
        color: ${accent} !important;
        text-decoration-color: ${accent} !important;
      }
      a:hover {
        opacity: 0.8;
      }

      /* Inputs and Interactive Elements - Keep them distinct so they don't disappear */
      input, textarea, select {
        background-color: rgba(255,255,255,0.1) !important;
        color: ${text} !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        border-radius: 4px !important;
      }
      
      /* Buttons - Use accent color */
      button, input[type="submit"], input[type="button"], input[type="reset"], .btn, [role="button"] {
        background-color: ${accent} !important;
        color: #ffffff !important;
        border: none !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
        text-shadow: none !important;
      }

      /* Tables */
      table, tr, td, th {
        background-color: transparent !important;
        color: ${text} !important;
        border-color: rgba(255,255,255,0.1) !important;
      }

      /* Code blocks */
      pre, code {
        background-color: rgba(0,0,0,0.2) !important;
        color: ${text} !important;
      }

      /* Scrollbars */
      ::-webkit-scrollbar {
        width: 12px;
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.2);
        border-radius: 6px;
      }
    `;
  }

  function handleTheme(theme, styleEl) {
    let css = '';
    
    switch (theme) {
      case 'ocean':
        css = generateThemeCSS('linear-gradient(to bottom right, #00c6ff, #0072ff)', '#ffffff', '#caf0f8', true);
        break;
      case 'sunset':
        css = generateThemeCSS('linear-gradient(to bottom right, #ff9966, #ff5e62)', '#fff5f5', '#ffe3e3', true);
        break;
      case 'forest':
        css = generateThemeCSS('linear-gradient(to bottom right, #11998e, #38ef7d)', '#f0fff4', '#ccffd8', true);
        break;
      case 'berry':
        css = generateThemeCSS('linear-gradient(to bottom right, #8E2DE2, #4A00E0)', '#ffffff', '#e9d5ff', true);
        break;
      case 'midnight':
        css = generateThemeCSS('#232526', '#cfcfcf', '#6366f1', false);
        break;
      // NEW THEMES
      case 'cyberpunk':
        css = generateThemeCSS('#000b1e', '#00f3ff', '#ff0099', false);
        break;
      case 'coffee':
        css = generateThemeCSS('#3e2723', '#d7ccc8', '#8d6e63', false);
        break;
      case 'rose':
        css = generateThemeCSS('linear-gradient(to right, #ffafbd, #ffc3a0)', '#4a2c2c', '#d63384', true);
        break;
      case 'slate':
         css = generateThemeCSS('#1e293b', '#e2e8f0', '#38bdf8', false);
         break;
      case 'solarized':
         css = generateThemeCSS('#fdf6e3', '#657b83', '#b58900', false);
         break;
      case 'high-contrast':
         css = generateThemeCSS('#000000', '#ffffff', '#ffff00', false);
         break;
    }
    
    styleEl.textContent = css;
  }

  function handleCustom(data, styleEl) {
    const { bg, text } = data;
    // We treat custom like a flat theme
    // Auto-calculate an accent color (e.g., inverse or just a brightness shift)
    // For simplicity, using text color for links but brighter
    styleEl.textContent = generateThemeCSS(bg, text, text, false);
  }

  function handleRandom(hue, styleEl) {
    const bg = `hsl(${hue}, 30%, 95%)`;
    const text = `hsl(${hue}, 80%, 20%)`;
    const accent = `hsl(${(hue + 180) % 360}, 70%, 50%)`;

    styleEl.textContent = generateThemeCSS(bg, text, accent, false);
  }

})();
