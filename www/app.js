(() => {
  const STORAGE_KEY = 'libvio:lastLine';

  const continueBtn = document.getElementById('continueBtn');
  const continueLine = document.getElementById('continueLine');
  const lineGroup = document.getElementById('lineGroup');

  function loadLast() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLast(entry) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    } catch (e) {}
  }

  function go(url) {
    // Capacitor WKWebView: 同源外跳会在当前 WebView 内继续导航，保持全屏 app 体验
    window.location.href = url;
  }

  // 初始化：有历史就显示"继续观看"
  const last = loadLast();
  if (last && last.url) {
    continueLine.textContent = last.label || last.url;
    continueBtn.classList.remove('hidden');
    lineGroup.style.marginTop = '8px';
  }

  continueBtn.addEventListener('click', () => {
    if (last && last.url) go(last.url);
  });

  document.querySelectorAll('.btn-line').forEach((btn) => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      const label = btn.querySelector('.btn-label').textContent.trim();
      saveLast({ url, label });
      go(url);
    });
  });
})();
