const key = 'english-everyday-v1';
const saved = JSON.parse(localStorage.getItem(key) || '{}');
const boxes = [...document.querySelectorAll('.done')];
const journal = document.querySelector('#journal');
const save = () => { saved.tasks = Object.fromEntries(boxes.map(box => [box.dataset.task, box.checked])); saved.journal = journal.value; localStorage.setItem(key, JSON.stringify(saved)); update(); };
boxes.forEach(box => { box.checked = !!saved.tasks?.[box.dataset.task]; box.addEventListener('change', save); });
journal.value = saved.journal || ''; journal.addEventListener('input', save);
function update(){ const count = boxes.filter(box => box.checked).length; document.querySelector('#progress-number').textContent = `${count * 25}%`; document.querySelector('#streak').textContent = count === 4 ? 'ครบแล้ววันนี้ · เยี่ยมมาก' : `ทำแล้ว ${count}/4 กิจกรรม`; }
document.querySelector('#reset').addEventListener('click', () => { localStorage.removeItem(key); boxes.forEach(box => box.checked = false); journal.value = ''; saved.tasks = {}; saved.journal = ''; update(); });
document.querySelector('#answers').addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; const correct = button.dataset.correct === 'true'; document.querySelectorAll('#answers button').forEach(item => item.disabled = true); button.classList.add(correct ? 'correct' : 'wrong'); document.querySelector('#feedback').textContent = correct ? 'ถูกต้อง — ใช้ So, it’s …? เพื่อยืนยันสิ่งที่ได้ยิน' : 'ลองใหม่พรุ่งนี้: Where ถามสถานที่ แต่โจทย์ถามเรื่องวันครบกำหนด'; });
document.querySelector('#hear').addEventListener('click', () => { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance('Could you say that again, please?')); });
update();
