// ===========================
//   HOTEL GESTIÓ — dashboard.js
// ===========================

const MN=['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
const DN=['Dl','Dm','Dx','Dj','Dv','Ds','Dg'];
let curCal = new Date();

// ---- CALENDARI ----
function renderCal() {
  const g = document.getElementById('cal');
  const titleEl = document.getElementById('cal-title');
  if (!g) return;
  titleEl.textContent = MN[curCal.getMonth()];
  g.innerHTML = DN.map(d => `<div class="ch">${d}</div>`).join('');
  const first = new Date(curCal.getFullYear(), curCal.getMonth(), 1);
  let s = first.getDay(); s = s === 0 ? 6 : s - 1;
  const dim = new Date(curCal.getFullYear(), curCal.getMonth() + 1, 0).getDate();
  const prev = new Date(curCal.getFullYear(), curCal.getMonth(), 0).getDate();
  const today = new Date();
  for (let i = s - 1; i >= 0; i--) g.innerHTML += `<div class="cd oth">${prev - i}</div>`;
  for (let d = 1; d <= dim; d++) {
    const isT = d === today.getDate() && curCal.getMonth() === today.getMonth() && curCal.getFullYear() === today.getFullYear();
    const dow = (s + d - 1) % 7;
    const isW = dow === 5 || dow === 6;
    g.innerHTML += `<div class="cd${isT ? ' today' : ''}${isW ? ' wknd' : ''}">${d}</div>`;
  }
  const f = s + dim; const r = f % 7 === 0 ? 0 : 7 - (f % 7);
  for (let i = 1; i <= r; i++) g.innerHTML += `<div class="cd oth">${i}</div>`;
}

function chM(d) { curCal = new Date(curCal.getFullYear(), curCal.getMonth() + d, 1); renderCal(); }

function toggleCal() {
  const b = document.getElementById('cal-body');
  const btn = document.getElementById('cal-btn');
  const open = b.classList.toggle('open');
  const dateStr = formatDateCat(new Date());
  btn.textContent = '📅 ' + dateStr + (open ? ' ▲' : ' ▼');
}

function formatDateCat(d) {
  const dies = ['diumenge','dilluns','dimarts','dimecres','dijous','divendres','dissabte'];
  const mesos = ['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
  return `${dies[d.getDay()]}, ${d.getDate()} ${mesos[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateTime(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function isEndarrerit(dataSortida) {
  return new Date(dataSortida) < new Date();
}

// ---- RENDER DATA ----
function renderDate() {
  const today = new Date();
  const bd = document.getElementById('big-d');
  const df = document.getElementById('date-lbl');
  const btn = document.getElementById('cal-btn');
  const dateStr = formatDateCat(today);
  if (bd) bd.textContent = today.getDate();
  if (df) df.textContent = dateStr;
  if (btn) btn.textContent = '📅 ' + dateStr + ' ▼';
}

// ---- RENDER STATS ----
function renderStats(stats, reservesAvui) {
  const el = id => document.getElementById(id);
  if (el('s-entrades')) el('s-entrades').textContent = reservesAvui.entrades.length;
  if (el('s-sortides')) el('s-sortides').textContent = reservesAvui.sortides.length;
  if (el('s-estades')) el('s-estades').textContent = stats.estades;
  if (el('s-animals')) el('s-animals').textContent = stats.animals;
  if (el('m-ocu')) el('m-ocu').textContent = stats.ocupacio + ' %';
  if (el('m-lliu')) el('m-lliu').textContent = stats.lliures;
  if (el('m-ocu2')) el('m-ocu2').textContent = stats.ocupades;
}

// ---- RENDER TAULES ----
function renderRows(data, tbodyId, isSortida) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:1.5rem;color:#888">No hi ha dades per avui</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(r => {
    const client = r.clients ? `${r.clients.nom} ${r.clients.cognoms}` : '—';
    const animal = r.animals ? r.animals.nom : '—';
    const raca = r.animals ? r.animals.raca || '' : '';
    const hab = r.habitacions ? r.habitacions.id : r.habitacio_id || '—';
    const entStr = formatDateTime(r.data_entrada);
    const sorStr = formatDateTime(r.data_sortida);
    const retard = isSortida && isEndarrerit(r.data_sortida);
    return `<tr>
      <td><span class="bk">🔖</span></td>
      <td>${client}</td>
      <td><div class="anom">${animal}</div>${raca ? `<div class="asub">(${raca})</div>` : ''}</td>
      <td style="color:#555;white-space:nowrap">${entStr}</td>
      <td style="white-space:nowrap">
        <span style="color:#555">${sorStr}</span>
        ${retard ? '<br><span class="retard">Endarrerit</span>' : ''}
      </td>
      <td style="white-space:nowrap"><span class="dot dot-g"></span>${hab}</td>
      <td><div class="abts">
        <button class="abt" title="Editar" onclick="window.location='pages/reserves.html'">✏</button>
        <button class="abt" title="Check-in/out">🏠</button>
        <button class="abt" title="Alarma">🔔</button>
        <button class="abt r" title="Calendari">📅</button>
      </div></td>
    </tr>`;
  }).join('');
}

// ---- BUSCADOR ----
function setupSearch() {
  const sc = document.getElementById('sc');
  const sa = document.getElementById('sa');
  if (sc) sc.addEventListener('keypress', async e => {
    if (e.key === 'Enter' && sc.value.trim()) {
      window.location = `pages/clients.html?cerca=${encodeURIComponent(sc.value.trim())}`;
    }
  });
  if (sa) sa.addEventListener('keypress', async e => {
    if (e.key === 'Enter' && sa.value.trim()) {
      window.location = `pages/animals.html?cerca=${encodeURIComponent(sa.value.trim())}`;
    }
  });
}

// ---- INIT ----
async function initDashboard() {
  renderDate();
  renderCal();
  setupSearch();

  // Mostrar loading
  document.getElementById('et').innerHTML = '<tr><td colspan="7" style="text-align:center;padding:1rem;color:#888">Carregant...</td></tr>';
  document.getElementById('st').innerHTML = '<tr><td colspan="7" style="text-align:center;padding:1rem;color:#888">Carregant...</td></tr>';

  try {
    // Carregar dades reals de Supabase
    const [stats, reservesAvui] = await Promise.all([
      getStatsAvui(),
      getReservesAvui()
    ]);

    renderStats(stats, reservesAvui);
    renderRows(reservesAvui.entrades, 'et', false);
    renderRows(reservesAvui.sortides, 'st', true);

  } catch (err) {
    console.error('Error carregant dashboard:', err);
    document.getElementById('et').innerHTML = '<tr><td colspan="7" style="text-align:center;padding:1rem;color:#c00">Error de connexió</td></tr>';
    document.getElementById('st').innerHTML = '<tr><td colspan="7" style="text-align:center;padding:1rem;color:#c00">Error de connexió</td></tr>';
  }
}

document.addEventListener('DOMContentLoaded', initDashboard);
