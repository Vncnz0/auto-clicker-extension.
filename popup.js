document.getElementById("toggle").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      let intervalId = window.autoLikeIntervalId || null;

      function toggleAutoLike() {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
          window.autoLikeIntervalId = null;
          console.log('Auto-Like fermato');
        } else {
          intervalId = setInterval(() => {
            let likeBtn = document.querySelector('[aria-label="Like"]');
            if (!likeBtn) {
              likeBtn = [...document.querySelectorAll('button')].find(b => b.textContent.trim().toLowerCase() === 'like');
            }
            if (!likeBtn) {
              likeBtn = document.querySelector('.ReaActionButton') || document.querySelector('.button--like');
            }

            if (likeBtn) {
              likeBtn.click();
              console.log('Like dato!');
            } else {
              console.log('Bottone Like non trovato');
            }
          }, 1050);
          window.autoLikeIntervalId = intervalId;
          console.log('Auto-Like avviato');
        }
      }

      toggleAutoLike();
      window.toggleAutoLike = toggleAutoLike; // opzionale per debug in console
    }
  });
});
