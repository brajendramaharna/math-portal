(() => {
  const portal = document.getElementById('ptApp');
  const arena = document.getElementById('arRoot');
  const quest = document.getElementById('ptMQ');
  const header = document.createElement('header');
  header.className = 'studio-bar';
  header.innerHTML = `<div class="studio-row">
    <a class="studio-brand" href="./" data-section="home"><b aria-hidden="true">ग</b>GaṇitaSetu</a>
    <nav aria-label="Main navigation">
      <a href="./" data-section="home">Home</a>
      <a href="math-digibook.html" data-section="digibook">Digibook</a>
      <a href="./?section=games" data-section="games">Games</a>
    </nav><a class="studio-account" href="./?section=login" data-section="login">Log in</a></div>`;
  document.body.prepend(header);
  function sync() {
    const home = portal && !portal.hidden;
    const current = home ? 'home' : arena && !arena.hidden ? 'games' : 'digibook';
    for (const item of header.querySelectorAll('nav a')) {
      if (item.dataset.section === current) item.setAttribute('aria-current','page');
      else item.removeAttribute('aria-current');
    }
    if (portal) {
      const account = header.querySelector('.studio-account');
      account.textContent = PT.state().U ? 'Dashboard' : 'Log in';
      account.href = PT.state().U ? './' : './?section=login';
    }
  }
  header.addEventListener('click', event => {
    const link = event.target.closest('[data-section]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const section = link.dataset.section;
    if (portal) {
      event.preventDefault();
      if (section === 'games') PT.ACT.openGames();
      else if (section === 'digibook') PT.ACT.openBook();
      else {
        if (!quest.hidden) PT.ACT.mqback();
        if (section === 'login' && !PT.state().U) PT.ACT.goLogin();
        else PT.ACT.goHome();
      }
      sync();
    } else if (arena && (section === 'games' || section === 'digibook')) {
      event.preventDefault();
      SH.show(section === 'games' ? 'play' : 'learn');
    }
  });
  const observer = new MutationObserver(sync);
  for (const el of [portal,arena,quest]) if (el) observer.observe(el,{attributes:true,attributeFilter:['hidden']});
  const root = document.getElementById('ptRoot');
  if (root) observer.observe(root,{childList:true});
  sync();
})();
