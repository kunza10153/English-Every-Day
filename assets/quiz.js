function choose(button, correct, note) {
  const card = button.closest('.card');
  if (card.dataset.done) return;
  card.dataset.done = 'true';
  button.classList.add(correct ? 'ok' : 'no');
  card.querySelector('.feedback').textContent = (correct ? 'ถูกต้อง — ' : 'ยังไม่ใช่ — ') + note;
  const total = document.querySelectorAll('.card[data-question]').length;
  const done = document.querySelectorAll('.card[data-done]').length;
  const right = document.querySelectorAll('.card .ok').length;
  document.querySelector('#score').textContent = `ผล: ${right}/${done}${done === total ? '  บอกผลนี้ให้ครูเพื่อเลือกบทถัดไป' : ''}`;
}
