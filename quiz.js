'use strict';
(() => {
  const quizzes = window.WorkshopQuizzes;
  const requested = Number(new URLSearchParams(location.search).get('session'));
  const session = Object.hasOwn(quizzes, requested) ? requested : 1;
  const quiz = quizzes[session];
  const root = document.getElementById('quiz-content');
  const letters = ['A', 'B', 'C'];
  const answers = quiz.questions.map(() => null);
  const drafts = quiz.questions.map(() => null);
  let step = 0;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const returnUrl = `index.html?session=${session}#session-quiz`;
  document.title = `Quiz ${String(session).padStart(2, '0')} — ${quiz.title} — Déclic Chantier`;
  document.getElementById('quiz-session-label').textContent = `FIN DE DEMI-JOURNÉE ${String(session).padStart(2, '0')} / NUMÉRIQUE, MÉTIER ET MÉTHODE`;
  document.getElementById('quiz-session-title').textContent = quiz.title;
  document.querySelectorAll('[data-quiz-return]').forEach(link => { link.href = returnUrl; });
  document.querySelectorAll('[data-quiz-menu]').forEach(link => { link.href = `index.html?session=${session}#atelier-menu`; });

  const preferredLabel = q => q.type === 'knowledge' ? 'Réponse attendue' : 'Réaction à privilégier';

  function comparisons(q) {
    return `<details class="quiz-comparison"><summary>${q.type === 'knowledge' ? 'Comparer les trois réponses' : 'Comparer les trois réactions'}</summary><ol>${q.options.map((option, i) => `<li><span class="micro">${letters[i]}${i === q.preferred ? ` · ${preferredLabel(q).toUpperCase()}` : ''}</span><p class="comparison-choice">${esc(option)}</p><p>${esc(q.feedback[i])}</p></li>`).join('')}</ol></details>`;
  }

  function render(focusId) {
    if (step === quiz.questions.length) {
      root.innerHTML = `<section class="quiz-card quiz-finish" aria-labelledby="quiz-heading"><p class="micro">LES ${quiz.questions.length} QUESTIONS SONT PARCOURUES</p><h2 id="quiz-heading" tabindex="-1">Et dans ton atelier ?</h2><p class="quiz-reflection">${esc(quiz.reflection)}</p><p>Prends un exemple concret et partage-le avec ton binôme ou le formateur.</p><details class="quiz-comparison"><summary>Revoir mes choix et les retours</summary><ol>${quiz.questions.map((q, i) => `<li><h3>${esc(q.title)}</h3><p class="micro">${esc(q.skills)}</p><p class="comparison-choice">Ton choix : ${letters[answers[i]]} · ${esc(q.options[answers[i]])}</p><p>${esc(q.feedback[answers[i]])}</p>${answers[i] !== q.preferred ? `<p class="preferred-reminder"><strong>${preferredLabel(q)} :</strong> ${esc(q.options[q.preferred])} ${esc(q.feedback[q.preferred])}</p>` : ''}</li>`).join('')}</ol></details><div class="quiz-actions"><button type="button" class="text-link" data-quiz-action="restart">Recommencer le quiz</button><a class="button primary" href="${returnUrl}">Retour à la séance ${String(session).padStart(2, '0')}</a></div></section>`;
    } else {
      const q = quiz.questions[step];
      const answer = answers[step];
      const submitted = answer !== null;
      root.innerHTML = `<section class="quiz-card" aria-labelledby="quiz-heading"><div class="quiz-progress"><span class="micro">QUESTION ${step + 1} / ${quiz.questions.length}</span><span aria-hidden="true" class="quiz-dots">${quiz.questions.map((_, i) => `<i class="${i === step ? 'current' : answers[i] !== null ? 'done' : ''}"></i>`).join('')}</span></div><h2 id="quiz-heading" tabindex="-1">${esc(q.title)}</h2><p class="quiz-skills">${esc(q.skills)}</p><form id="quiz-form"><fieldset><legend>${esc(q.situation)}</legend><p class="quiz-help" id="quiz-help">${q.type === 'knowledge' ? 'Choisis la réponse qui te semble juste.' : 'Choisis la réaction que tu adopterais.'}</p><div class="quiz-options">${q.options.map((option, i) => `<label class="quiz-option${submitted && i === answer ? ' chosen' : ''}" for="answer-${i}"><input id="answer-${i}" type="radio" name="answer" value="${i}" required aria-describedby="quiz-help"${(submitted ? answer : drafts[step]) === i ? ' checked' : ''}${submitted ? ' disabled' : ''}><span class="quiz-letter" aria-hidden="true">${letters[i]}</span><span>${esc(option)}</span></label>`).join('')}</div></fieldset>${submitted ? `<div class="quiz-feedback${answer === q.preferred ? ' preferred' : ''}" id="quiz-feedback" tabindex="-1" role="region" aria-labelledby="quiz-feedback-title"><h3 id="quiz-feedback-title">${answer === q.preferred ? preferredLabel(q) : q.type === 'knowledge' ? 'À comprendre' : 'Ce que ce choix implique'}</h3><p>${esc(q.feedback[answer])}</p></div>${comparisons(q)}` : ''}<div class="quiz-actions">${step > 0 ? '<button type="button" class="text-link" data-quiz-action="back">Question précédente</button>' : '<span></span>'}${submitted ? `<button type="button" class="button primary" data-quiz-action="next">${step === quiz.questions.length - 1 ? 'Faire le point ensemble' : 'Question suivante'}</button>` : `<button type="submit" class="button primary" id="quiz-submit"${drafts[step] === null ? ' disabled' : ''}>Valider mon choix</button>`}</div></form></section>`;
    }
    if (focusId) {
      const target = document.getElementById(focusId);
      target?.focus({preventScroll: true});
      target?.scrollIntoView({block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }
  }

  root.addEventListener('change', event => {
    if (event.target.name !== 'answer' || answers[step] !== null) return;
    const value = Number(event.target.value);
    if (!Number.isInteger(value) || value < 0 || value > 2) return;
    drafts[step] = value;
    document.getElementById('quiz-submit').disabled = false;
  });
  root.addEventListener('submit', event => {
    if (event.target.id !== 'quiz-form') return;
    event.preventDefault();
    if (step >= quiz.questions.length || answers[step] !== null || drafts[step] === null) return;
    answers[step] = drafts[step];
    render('quiz-feedback');
  });
  root.addEventListener('click', event => {
    const button = event.target.closest('[data-quiz-action]');
    if (!button) return;
    const action = button.dataset.quizAction;
    if (action === 'next' && step < quiz.questions.length && answers[step] !== null) step++;
    else if (action === 'back' && step > 0) step--;
    else if (action === 'restart') { step = 0; answers.fill(null); drafts.fill(null); }
    else return;
    render('quiz-heading');
  });
  render();
})();
