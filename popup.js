document.addEventListener('DOMContentLoaded', () => {
  const modes = document.querySelectorAll('.mode-card');
  const themeBtns = document.querySelectorAll('.theme-btn');
  const bgColorInput = document.getElementById('bg-color');
  const textColorInput = document.getElementById('text-color');
  const resetBtn = document.getElementById('reset-btn');

  // Mode Selection
  modes.forEach(mode => {
    mode.addEventListener('click', () => {
      // Visual feedback
      modes.forEach(m => m.classList.remove('active'));
      if (!mode.classList.contains('special')) {
        mode.classList.add('active');
      }

      const modeType = mode.id.replace('mode-', '');
      
      if (modeType === 'random') {
        applyRandomTheme();
      } else {
        sendMessageToContent({ type: 'MODE', mode: modeType });
      }
    });
  });

  // Theme Selection
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      sendMessageToContent({ type: 'THEME', theme: theme });
    });
  });

  // Custom Controls
  [bgColorInput, textColorInput].forEach(input => {
    input.addEventListener('input', () => {
      sendMessageToContent({
        type: 'CUSTOM',
        bg: bgColorInput.value,
        text: textColorInput.value
      });
    });
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    modes.forEach(m => m.classList.remove('active'));
    sendMessageToContent({ type: 'RESET' });
  });

  function applyRandomTheme() {
    // Generate harmonious colors using HSL
    const hue = Math.floor(Math.random() * 360);
    const bg = `hsl(${hue}, 20%, 95%)`;
    const text = `hsl(${hue}, 80%, 15%)`;
    const accent = `hsl(${(hue + 180) % 360}, 70%, 50%)`;
    
    // Update inputs to reflect random
    // Note: Inputs take hex, so simplistic conversion or just separate 'RANDOM' type needed.
    // simpler to just send random type with values.
    
    sendMessageToContent({ 
      type: 'CUSTOM_RANDOM', 
      hue: hue 
    });
  }

  function sendMessageToContent(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});
