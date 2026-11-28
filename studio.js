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

(() => {
  const arena = document.getElementById("arRoot");
  if (!arena) return;
  const portraits = {
    "fox": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAABXklEQVR42pWTv2rDMBDGP5k8g7tk8hqora1DJ1MoFEqg6R669QX8Bt20ZshWAhk6uIVS6BRMhwzdZBcyBbykS/0CGdWhkSPJkpLeprvT7/58ErCzJEpFEqUC/zDzTqAGOQtxLDCJUsFZ6A6K7UaI9eRgh0mUCrGeCLHdaLm9TmZ/CM6WoJkbyFkI9Icdvw57z/QLPlNypRHv/KfnXd/XsuOiWYOyLkhgK0qzxtuUK76HXbGjQGT0RDgLQbOmzeWrGZIoFfsxVzPrPlS4topdcQCggzHKuiBEezcq8Pu13RHNmj+Q3KGipAS1AqhA2fYho4MxALSgDkyFPp65QXefOsQKk53dfDDki6oDqeI3xNU1god561OhgfnXOAuRLyrcXsRWkCqG+Zd7tkcaXM6Re0D6g37xj1nWBUmiVJyM7q07+3meWsd0CqCC5GXTZ4pADimpKueLOWHq2azui/8CeS60Q03NUqYAAAAASUVORK5CYII=",
    "moth": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAABSElEQVR42pVUvYqDQBD+EtJfd9VV2wvrAwhikYNYHFiljW1K8SnEJrlaH+Dw4AoLLQ7BB9gDy4OrDgIhjxCYK2RlVzceGZD9+2bm2/lmBQzGmUeceXTP2dIE/vr5XAAAFdvBiTOPqNiSeHswuWAhQWoANfutJEYMZx4dQkGiuOoMvl8nn3ouiisdQkGceTS5WuimPagK+o2nF20UVQDOPArd1Fwjx7fANyc4vjUc2s/vxtGENxZbmqgC4PdDH2/YUhZwF69x3F/Qlh3ypNayj+d5UqMtOxz3F101tejy7o5vYRevNRZqEBUzVnKioFRRKiP35HrSR2qQPKkBAG3ZIWsiqOrItSywymZSbL45GZ0c30LopsiaSMMZGY27fNwvWRMN++MuX/33BObe4iwjlZlIHnu14jPUuSnQai6zHZ8HBnZs/q1I+wNnbd1zXFfGegAAAABJRU5ErkJggg==",
    "golem": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABGElEQVR42q1TO47CMBB9jnKF5QBukYi5AbJyApQyEqegCw244w6pKKM9AUJcAAkuQMF2mwPQ4W2YkfF6FoR2JEue8bw34/kAT8Ro6422Hu+I0dYvLwe/vBxEEiUBAeDW1A/2zG0AAMfzTiUJCDjdr//M7HMyZyIVgkPg4mMAAFj130mdiPKYnRyf6USUhY/d9sT38XCG8XAm6uSb4T/FaOtHbev99YsPzUFoG7Utt1W92kKplbkErMoiSdCRv4PnGhht/a2pMd2vOQJXvXdY9O4hg6osOJDYhViX7rlU0G57QlUWWKG4f+kObGpkbsMZqLgGx/NO0ZekIpKP2IUQTDWJbeFC/ZqD1AqHqw0ANAvJbSSJo6TefwB1orhFzrT09wAAAABJRU5ErkJggg==",
    "bot": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAATCAYAAACZZ43PAAABBklEQVR42mNgwAMMlJz+Gyg5/WcgBxgoOf3/fzbw//+zgZQZQkgzIzZN+DRcuLePEacBBkpO/8+v5kcI8DlD6E974UKGoR9RDGHEqhmmER1ADUI2hBFds2HoR7zhgqzuwr19jEzYFAUd6GYIOtCNk48MUA14wE44atDUYIbBA3YGw9JXcJsZGBgY1jmUQpzfLcbAoPATMwxQDOkWw207mma86QAlOpECF2c6QNZoGPqRQTw4A8MBL9fOgMvDDMMajciad0QsZ/BYEYlhCEwtC0kxgEUthhcu3NvHaKDk9B+XF2DyKF7AFROw6IRHIVQMOSCZCEUjeqif7xZDybGM+LIysmZccgDjlpvXgCIPAQAAAABJRU5ErkJggg=="
};
  const teams = { hang: 'fox', tug: 'golem', bomb: 'bot', chase: 'moth' };
  const modes = arena.querySelector('#modes');
  const stage = arena.querySelector('#stage');
  function decorateCards() {
    for (const card of modes.querySelectorAll('[data-m]')) {
      const frame = card.querySelector('.ic');
      const sprite = portraits[teams[card.dataset.m]];
      if (!frame || !sprite || frame.querySelector('img')) continue;
      const portrait = new Image();
      portrait.src = sprite;
      portrait.alt = '';
      frame.replaceChildren(portrait);
      frame.setAttribute('aria-hidden', 'true');
    }
  }
  function sprite(parent, name, x, y, size) {
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttribute('href', portraits[name]);
    image.setAttribute('x', x);
    image.setAttribute('y', y);
    image.setAttribute('width', size);
    image.setAttribute('height', size);
    image.setAttribute('aria-hidden', 'true');
    image.setAttribute('class','quest-sprite');
    parent.append(image);
  }
  function decorateStage() {
    const scene = stage.firstElementChild;
    if (!scene || scene.dataset.illustrated) return;
    scene.dataset.illustrated = 'true';
    const team = scene.querySelector('#tgAll');
    const runner = scene.querySelector('#hero');
    if (team) {
      const members = ['fox','bot','golem','moth'];
      const figures = [...team.querySelectorAll('text[font-size="42"]')];
      figures.forEach((figure,i) => {
        sprite(team, members[i], Number(figure.getAttribute('x')) - 25, 100, 48);
        figure.remove();
      });
    } else if (runner) {
      const rival = scene.querySelector('#mon');
      runner.replaceChildren();
      rival.replaceChildren();
      sprite(runner, 'fox', 0, 77, 50);
      sprite(rival, 'moth', 0, 66, 57);
    } else if (scene.querySelector('#hp1')) {
      sprite(scene, 'fox', 7, 145, 45);
    } else {
      sprite(scene, 'bot', 7, 88, 58);
    }
  }
  decorateCards();
  decorateStage();
  new MutationObserver(decorateCards).observe(modes, {childList:true});
  new MutationObserver(decorateStage).observe(stage, {childList:true});
})();
