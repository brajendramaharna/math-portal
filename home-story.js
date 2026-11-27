function tutoringStory(gradeOptions) {
  return `<main class="tale">
    <section class="opening">
      <div class="opening-copy"><p class="kicker">One-to-one math tutoring · Pre-K to Calculus</p>
        <h1>Math makes sense<br>when you <em>see it.</em></h1>
        <p>Bring one question. Explore it with a tutor until you can explain the idea in your own words.</p>
        <button class="action" data-act="goReg" data-role="student">Book a free demo class</button>
        <a href="#paper-lesson">Try a mini lesson</a>
      </div>
      <div class="fold-stage" aria-hidden="true"><div class="fold-shadow"></div><div class="fold-paper"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
    </section>
    <section class="chapter lesson" id="paper-lesson"><div class="chapter-inner">
      <div class="narrative"><p class="kicker">Inside a live lesson</p><h2>What changes<br>when paper folds?</h2>
        <p>Imagine colouring half a sheet. Fold it into smaller equal pieces. Does the coloured amount change?</p></div>
      <div class="exhibit paper-lab"><div class="lab-title">Equivalent fractions</div>
        <div class="fraction-paper" aria-hidden="true"><i></i><i></i></div>
        <output class="fraction-caption" aria-live="polite">1 of 2 equal parts is coloured.</output>
        <div class="fold-controls"><button type="button" data-fold="less" disabled>Unfold</button><button type="button" data-fold="more">Fold in half</button></div>
      </div></div></section>
    <section class="chapter book"><div class="chapter-inner"><div class="narrative">
      <p class="kicker">Math Digibook</p><h2>Take the next step<br>at your own pace.</h2>
      <p>Choose a grade, find a skill, and reveal the reasoning one step at a time. When it clicks, try a question on your own.</p>
      <form class="grade-form"><label for="story-grade">Grade or course</label><div><select id="story-grade">${gradeOptions}</select><button class="action">Open Digibook</button></div></form>
      </div><div class="exhibit notebook"><div class="lab-title">Worked example · Algebra</div><div class="equation">3<i>x</i> + 4 = 19</div>
      <details><summary>Reveal the first step</summary><p>Subtract 4 from both sides.</p><strong>3<i>x</i> = 15</strong>
      <details><summary>Finish the example</summary><p>Divide both sides by 3.</p><strong><i>x</i> = 5</strong></details></details></div></div></section>
    <section class="chapter game"><div class="chapter-inner"><div class="narrative"><p class="kicker">Math Quest</p><h2>Put your pattern<br>spotting to work.</h2>
      <p>Try this quick puzzle. Then choose a game, a topic, and a difficulty level to put your skills to the test.</p><button class="action" data-act="openGames">Explore games</button></div>
      <div class="exhibit puzzle"><div class="lab-title">Complete the pattern</div><div class="pattern">3, 6, 12, <em>?</em></div>
      <div class="answers" aria-label="Answer choices"><button>15</button><button>18</button><button>24</button></div><p class="answer-note" role="status"></p></div></div></section>
    <section class="closing"><div><p class="kicker">Live classes &amp; homework</p><h2>Bring a question<br>to your first class.</h2><p>Meet one-to-one, then practise what you covered. Your dashboard keeps your classes and assigned homework together.</p>
    <button class="action" data-act="goReg" data-role="student">Book a free demo class</button><button class="quiet" data-act="goLogin">Student login</button></div>
    <p class="tutor-link">Teach with us <button data-act="goReg" data-role="tutor">Join as a tutor</button></p></section></main>`;
}

function mountTutoringStory(root) {
  const story = root.querySelector('.tale');
  if (!story) return;
  let pieces = 2;
  const paper = story.querySelector('.fraction-paper');
  story.querySelector('.fold-controls').onclick = event => {
    const button = event.target.closest('[data-fold]');
    if (!button) return;
    pieces = Math.min(8, Math.max(2, pieces * (button.dataset.fold === 'more' ? 2 : 0.5)));
    paper.replaceChildren(...Array.from({length:pieces}, () => document.createElement('i')));
    story.querySelector('.fraction-caption').textContent = pieces / 2 + ' of ' + pieces + ' equal parts ' + (pieces === 2 ? 'is' : 'are') + ' coloured. Still one half.';
    story.querySelector('[data-fold="less"]').disabled = pieces === 2;
    story.querySelector('[data-fold="more"]').disabled = pieces === 8;
  };
  story.querySelector('.grade-form').onsubmit = event => {
    event.preventDefault();
    PT.ACT.openGrade({dataset:{grade:story.querySelector('#story-grade').value}});
  };
  story.querySelector('.answers').onclick = event => {
    const choice = event.target.closest('button');
    if (!choice) return;
    story.querySelectorAll('.answers button').forEach(b => b.setAttribute('aria-pressed', String(b === choice)));
    story.querySelector('.answer-note').textContent = choice.textContent === '24' ? 'Exactly. Each number doubles, so 12 × 2 = 24.' : 'Look at 3 to 6, then 6 to 12. What multiplication repeats?';
  };
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('arrived');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.12});
    story.querySelectorAll('.chapter-inner,.closing>div').forEach(el => observer.observe(el));
  }
}
