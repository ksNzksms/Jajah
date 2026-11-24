// kamel3lom — تفاعلات الواجهة
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('rukn-theme');
  if (saved) root.dataset.theme = saved;
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('rukn-theme', root.dataset.theme);
  });
  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  const top = document.getElementById('toTop');
  window.addEventListener('scroll', () => top?.classList.toggle('show', window.scrollY > 450));
  top?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  document.querySelector('.share-copy')?.addEventListener('click', async (event) => {
    try { await navigator.clipboard.writeText(location.href); event.currentTarget.textContent = 'تم نسخ الرابط'; }
    catch { event.currentTarget.textContent = 'انسخ الرابط من شريط العنوان'; }
  });
})();
