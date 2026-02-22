const loginPanel = document.getElementById('loginPanel');
const dashboard = document.getElementById('dashboard');
const welcomeTitle = document.getElementById('welcomeTitle');
const logoutBtn = document.getElementById('logoutBtn');

const bookingForm = document.getElementById('bookingForm');
const bookingList = document.getElementById('bookingList');
const maintenanceForm = document.getElementById('maintenanceForm');
const maintenanceList = document.getElementById('maintenanceList');
const visitorForm = document.getElementById('visitorForm');
const qrBox = document.getElementById('qrBox');
const qrImg = document.getElementById('qrImg');
const qrText = document.getElementById('qrText');
const newsList = document.getElementById('newsList');

const communityNews = [
  'Nuevo horario del GYM: 5:00 a. m. - 11:00 p. m.',
  'Mantenimiento preventivo de ascensores este sábado.',
  'Cine al aire libre para residentes el próximo viernes.',
];

communityNews.forEach((item) => {
  const li = document.createElement('li');
  li.textContent = item;
  newsList.append(li);
});

function enterDashboard(username) {
  loginPanel.hidden = true;
  dashboard.hidden = false;
  logoutBtn.hidden = false;
  welcomeTitle.textContent = `Bienvenido/a, ${username}`;
}

function appendSuccess(target, text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.className = 'success-item';
  target.prepend(li);
}

function readJwtName(token) {
  if (!token || token.split('.').length < 2) return 'Residente';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.name || payload.email || 'Residente';
}

window.onGoogleCredential = (response) => {
  const name = readJwtName(response.credential);
  enterDashboard(name);
};

document.getElementById('demoLogin').addEventListener('click', () => {
  enterDashboard('Residente Demo');
});

logoutBtn.addEventListener('click', () => {
  dashboard.hidden = true;
  logoutBtn.hidden = true;
  loginPanel.hidden = false;
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  appendSuccess(
    bookingList,
    `Reserva creada: ${formData.get('facility')} el ${formData.get('date')} a las ${formData.get('time')}`
  );
  bookingForm.reset();
});

maintenanceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(maintenanceForm);
  appendSuccess(
    maintenanceList,
    `Cita solicitada para ${formData.get('issue')} en ${formData.get('location')}`
  );
  maintenanceForm.reset();
});

visitorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(visitorForm);
  const visitor = formData.get('visitor');
  const visitDate = formData.get('visitDate');
  const qrPayload = `Ingreso autorizado | Visitante: ${visitor} | Fecha: ${visitDate}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrPayload)}`;

  qrImg.src = qrUrl;
  qrText.textContent = qrPayload;
  qrBox.hidden = false;

  visitorForm.reset();
});
