const $ = (selector) => document.querySelector(selector);
const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

document.querySelectorAll('.meal-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.meal-tab').forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.meal-content').forEach(item => item.classList.add('hidden'));
  tab.classList.add('active');
  $(`#${tab.dataset.tab}`).classList.remove('hidden');
  const recipes = {
    morning: ['Овсяная каша с ягодами · 1 порция', 'Продукты: овсяные хлопья 45 г, молоко 1,5% 180 мл, черника 60 г, грецкий орех 10 г.', 'Как приготовить: сварите хлопья в молоке 5–7 минут. Добавьте ягоды и орехи перед подачей.'],
    day: ['Курица с овощами и киноа · 1 порция', 'Продукты: филе курицы 130 г, киноа сухая 45 г, кабачок 120 г, перец 80 г, оливковое масло 5 мл.', 'Как приготовить: отварите киноа 15 минут. Курицу и овощи потушите 12–15 минут, смешайте с крупой.'],
    evening: ['Овощное рагу с рыбой · 1 порция', 'Продукты: филе белой рыбы 140 г, брокколи 150 г, кабачок 120 г, томат 80 г, оливковое масло 5 мл.', 'Как приготовить: запеките рыбу 15 минут при 180 °C. Овощи потушите 10 минут и подайте рядом.']
  };
  const [title, ingredients, method] = recipes[tab.dataset.tab];
  $('#recipeTitle').textContent = title;
  $('#recipeIngredients').innerHTML = `<b>Продукты:</b> ${ingredients.replace('Продукты: ', '')}`;
  $('#recipeMethod').innerHTML = `<b>Как приготовить:</b> ${method.replace('Как приготовить: ', '')}`;
}));

let water = 5;
$('#addWater').addEventListener('click', () => {
  if (water < 8) { water += 1; $('#waterValue').textContent = water; showToast('Стакан воды добавлен. Отлично!'); }
  else showToast('Дневная цель по воде уже достигнута!');
});

$('#medicineDone').addEventListener('click', event => {
  event.currentTarget.textContent = 'Выполнено ✓';
  event.currentTarget.style.background = '#8caf87';
  showToast('Напоминание отмечено как выполненное');
});

$('#reminder').addEventListener('click', () => showToast('Напомним вам о следующем приёме пищи.'));
$('#fullMenu').addEventListener('click', event => { event.preventDefault(); showToast('Полное меню на 30 дней будет доступно в следующем разделе.'); });

const modal = $('#modal');
document.querySelectorAll('#startWorkout, .modal-close').forEach(button => button.addEventListener('click', () => modal.classList.toggle('hidden')));
$('.modal-start').addEventListener('click', () => { modal.classList.add('hidden'); showToast('Тренировка началась. Двигайтесь в комфортном темпе!'); });
modal.addEventListener('click', event => { if (event.target === modal) modal.classList.add('hidden'); });

$('.menu-btn').addEventListener('click', () => $('.sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
  document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
  link.classList.add('active');
  $('.sidebar').classList.remove('open');
}));
