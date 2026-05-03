// ===========================
//   GESPETSOFT — dashboard.js
// ===========================

const dayNames  = ['Dl','Dm','Dx','Dj','Dv','Ds','Dg'];
const monthNames = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
let curCal = new Date(2026, 4, 1);

const mockEntries = [
  {client:'Joan Mas', animal:'Coco (Caniche)', type:'in', time:'10:30', hab:'B03'},
  {client:'Pere López', animal:'Rocky (Bulldog)', type:'in', time:'11:00', hab:'A02'},
  {client:'Anna Sànchez', animal:'Max (Pastor Alemany)', type:'out', time:'12:00', hab:'A03'},
  {client:'Laura Pons', animal:'Bruno (Shih Tzu)', type:'out', time:'14:00', hab:'B05'},
  {client:'Miquel Vidal', animal:'Duke (Labrador)', type:'out', time:'16:00', hab:'A05'},
];

function renderCalendar() {
  const cal   = document.getElementById('cal');
  const title = document.getElementById('cal-title');
  if (!cal) return;
  title.textContent = monthNames[curCal.getMonth()];
  cal.innerHTML = dayNames.map(d => `<div class="cal-head">${d}</div>`).join('');
  const first   = new Date(curCal.getFullYear(), curCal.getMonth(), 1);
  let startDay  = first.getDay(); startDay = startDay === 0 ? 6 : startDay - 1;
  const daysInM = new Date(curCal.getFullYear(), curCal.getMonth() + 1, 0).getDate();
  const prevD   = new Date(curCal.getFullYear(), curCal.getMonth(), 0).getDate();
  for (let i = startDay - 1; i >= 0; i--)
    cal.innerHTML += `<div class="cal-day other">${prevD - i}</div>`;
  for (let d = 1; d <= daysInM; d++) {
    const isToday  = d === 3 && curCal.getMonth() === 4 && curCal.getFullYear() === 2026;
    const dow      = (startDay + d - 1) % 7;
    const isWknd   = dow === 5 || dow === 6;
    let cls = 'cal-day';
    if (isToday)      cls += ' today';
    else if (isWknd)  cls += ' weekend';
    cal.innerHTML += `<div class="${cls}">${d}</div>`;
  }
  const filled = startDay + daysInM;
  const rem    = filled % 7 === 0 ? 0 : 7 - (filled % 7);
  for (let i = 1; i <= rem; i++) cal.innerHTML += `<div class="cal-day other">${i}</div>`;
}

function changeMonth(dir) {
  curCal = new Date(curCal.getFullYear(), curCal.getMonth() + dir, 1);
  renderCalendar();
}

function renderDate() {
  const bd = document.getElementById('big-day');
  const df = document.getElementById('date-full');
  if (bd) bd.textContent = '03';
  if (df) df.textContent = 'diumenge, 03 maig 2026';
}

function renderEntries(list) {
  const el = document.getElementById('entries-list');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;font-size:12px;color:#9ca3af">No existeixen dades actualment</div>';
    return;
  }
  el.innerHTML = list.map(e => `
    <div class="entry-row">
      <div>
        <span class="entry-name">${e.client}</span>
        <span class="entry-animal"> · ${e.animal}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="entry-meta">${e.time} · Hab. ${e.hab}</span>
        <span class="tag ${e.type === 'in' ? 'tag-in' : 'tag-out'}">${e.type === 'in' ? 'Entrada' : 'Sortida'}</span>
      </div>
    </div>`).join('');
}

function filterEntries() {
  const c = (document.getElementById('search-client')?.value || '').toLowerCase();
  const a = (document.getElementById('search-animal')?.value || '').toLowerCase();
  const filtered = mockEntries.filter(e =>
    e.client.toLowerCase().includes(c) && e.animal.toLowerCase().includes(a)
  );
  renderEntries(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderDate();
  renderCalendar();
  renderEntries(mockEntries);
  document.getElementById('search-client')?.addEventListener('input', filterEntries);
  document.getElementById('search-animal')?.addEventListener('input', filterEntries);
});
