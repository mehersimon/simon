(() => {
  const themeToggle = document.querySelector('#themeToggle');
  const root = document.documentElement;

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    root.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('dark');
      const isDark = root.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
})();
