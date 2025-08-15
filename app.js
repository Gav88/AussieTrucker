// Small helper: toast message
function toast(msg) {
    let t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => t.classList.remove('show'), 2000);
    setTimeout(() => t.remove(), 2600);
  }
  
  // Inject minimal CSS for toast (kept here to avoid extra file)
  (() => {
    const css = `.toast{position:fixed;left:50%;bottom:calc(90px + env(safe-area-inset-bottom,0));transform:translateX(-50%) scale(.96);background:#11131a;color:#e6eaf2;border:1px solid rgba(255,255,255,.08);padding:10px 14px;border-radius:999px;box-shadow:0 10px 22px rgba(0,0,0,.35);opacity:0;transition:opacity .2s ease,transform .2s ease;z-index:60}
    .toast.show{opacity:1;transform:translateX(-50%) scale(1)}`;
    const style = document.createElement('style');
    style.textContent = css; document.head.appendChild(style);
  })();
  
  // Highlight active tab based on current page
  (function setActiveTab() {
    const map = {
      'index.html': 'news',
      'nhvr-updates.html': 'nhvr',
      'driver-room.html': 'drivers',
      'fuck-ups.html': 'incidents',
      'shop.html': 'shop',
      'contact.html': 'contact'
    };
    const path = location.pathname.split('/').pop() || 'index.html';
    const key = map[path] || 'news';
    const el = document.querySelector(`.tabbar .tab[data-tab="${key}"]`);
    if (el) el.classList.add('active');
  })();
  
  // Soft press effect for nav
  for (const tab of document.querySelectorAll('.tabbar .tab')) {
    tab.addEventListener('touchstart', () => tab.style.transform = 'scale(.98)');
    tab.addEventListener('touchend', () => tab.style.transform = '');
  }
  
  // SVG icon helper (used by progressive enhancement if needed)
  function svg(name){
    const paths = {
      news: '<path d="M4 5h12v2H4zM4 9h12v2H4zM4 13h8v2H4z"/>',
      shield: '<path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"/>',
      users: '<path d="M7 13c-2.8 0-5 1.3-5 3v2h10v-2c0-1.7-2.2-3-5-3zm8 0c-1.1 0-2.1.2-3 .6 1.8.7 3 1.9 3 3.4v1h6v-1c0-1.7-2.2-3-6-3zM7 12a4 4 0 110-8 4 4 0 010 8zm8-1a3 3 0 100-6 3 3 0 000 6z"/>',
      warning: '<path d="M1 19h22L12 2 1 19zm12-3h-2v2h2v-2zm0-6h-2v5h2v-5z"/>',
      cart: '<path d="M7 18a2 2 0 110 4 2 2 0 010-4zm10 0a2 2 0 110 4 2 2 0 010-4zM5 4h2l3.6 7.6-1.35 2.45A2 2 0 0011 16h8v-2h-7.42a.25.25 0 01-.22-.13l.03-.06L12.1 12h6.45a2 2 0 001.8-1.1l3.1-6.2-1.8-.9L18.55 10h-6.1L9.38 4H5z"/>',
      mail: '<path d="M2 6h20v12H2z M2 6l10 7 10-7"/>'
    };
    return `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">${paths[name]||''}</svg>`;
  }
  
  // If HTML used ${svg('name')} literal, keep as-is. Otherwise, this helper can render icons dynamically if needed.
  