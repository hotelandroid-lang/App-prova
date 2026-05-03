// ===========================
//   GESPETSOFT — app.js
//   Dades compartides i utils
// ===========================

// ---- BASE DE DADES LOCAL (substituir per Supabase) ----
const DB = {
  clients: [
    {id:'C001',nom:'Joan',cognoms:'Mas',email:'joan.mas@gmail.com',mobil:'638 212 445',localitat:'Barcelona',animals:['A001','A002','A019'],estat:'actiu',etiqueta:''},
    {id:'C002',nom:'Maria',cognoms:'García',email:'m.garcia@outlook.com',mobil:'612 334 556',localitat:'Gràcia',animals:['A003'],estat:'actiu',etiqueta:'VIP'},
    {id:'C003',nom:'Pere',cognoms:'López',email:'pere.lopez@gmail.com',mobil:'699 112 233',localitat:'Sants',animals:['A004','A005','A006'],estat:'actiu',etiqueta:''},
    {id:'C004',nom:'Anna',cognoms:'Sànchez',email:'anna.s@gmail.com',mobil:'677 445 667',localitat:'Eixample',animals:['A007'],estat:'actiu',etiqueta:'VIP'},
    {id:'C005',nom:'Jordi',cognoms:'Ferrer',email:'j.ferrer@yahoo.com',mobil:'655 778 990',localitat:'Horta',animals:['A008'],estat:'actiu',etiqueta:''},
    {id:'C006',nom:'Laura',cognoms:'Pons',email:'laura.pons@gmail.com',mobil:'634 556 778',localitat:'Sarrià',animals:['A009','A010'],estat:'actiu',etiqueta:''},
    {id:'C007',nom:'Miquel',cognoms:'Vidal',email:'m.vidal@gmail.com',mobil:'611 223 445',localitat:'Poblenou',animals:['A011'],estat:'actiu',etiqueta:''},
    {id:'C008',nom:'Núria',cognoms:'Puig',email:'nuria.puig@hotmail.com',mobil:'689 334 556',localitat:'Gràcia',animals:['A012'],estat:'inactiu',etiqueta:''},
    {id:'C009',nom:'Carles',cognoms:'Mas',email:'c.mas@gmail.com',mobil:'677 556 778',localitat:'Clot',animals:['A013'],estat:'actiu',etiqueta:''},
    {id:'C010',nom:'Rosa',cognoms:'Serra',email:'rosa.serra@gmail.com',mobil:'666 778 990',localitat:'Sant Andreu',animals:['A014'],estat:'actiu',etiqueta:''},
    {id:'C011',nom:'Toni',cognoms:'Bosch',email:'t.bosch@gmail.com',mobil:'644 990 112',localitat:'Gràcia',animals:['A015','A016','A018'],estat:'actiu',etiqueta:'VIP'},
    {id:'C012',nom:'Eva',cognoms:'Rius',email:'eva.rius@gmail.com',mobil:'633 112 334',localitat:'Horta',animals:['A017'],estat:'inactiu',etiqueta:''},
  ],
  animals: [
    {id:'A001',nom:'Coco',clientId:'C001',raca:'Caniche',tipus:'gos',sexe:'Femella',pes:4.2,microxip:'941000024187632',estat:'hotelat',alergies:'Pollastre',habitacio:'B03'},
    {id:'A002',nom:'Tobi',clientId:'C001',raca:'Golden Retriever',tipus:'gos',sexe:'Mascle',pes:28.5,microxip:'941000031298741',estat:'hotelat',alergies:'',habitacio:'A01'},
    {id:'A003',nom:'Luna',clientId:'C002',raca:'Persa',tipus:'gat',sexe:'Femella',pes:3.8,microxip:'941000019827364',estat:'hotelat',alergies:'',habitacio:'C01'},
    {id:'A004',nom:'Rocky',clientId:'C003',raca:'Bulldog Francès',tipus:'gos',sexe:'Mascle',pes:12.1,microxip:'941000027364821',estat:'hotelat',alergies:'',habitacio:'A02'},
    {id:'A005',nom:'Mia',clientId:'C003',raca:'Labrador',tipus:'gos',sexe:'Femella',pes:22.3,microxip:'941000038271645',estat:'actiu',alergies:'Vedella',habitacio:''},
    {id:'A006',nom:'Simba',clientId:'C003',raca:'Siamès',tipus:'gat',sexe:'Mascle',pes:4.5,microxip:'941000045672318',estat:'actiu',alergies:'',habitacio:''},
    {id:'A007',nom:'Max',clientId:'C004',raca:'Pastor Alemany',tipus:'gos',sexe:'Mascle',pes:31.2,microxip:'941000052736491',estat:'hotelat',alergies:'',habitacio:'A03'},
    {id:'A008',nom:'Lola',clientId:'C005',raca:'Chihuahua',tipus:'gos',sexe:'Femella',pes:2.1,microxip:'941000061827345',estat:'hotelat',alergies:'',habitacio:'B01'},
    {id:'A009',nom:'Nala',clientId:'C006',raca:'Beagle',tipus:'gos',sexe:'Femella',pes:9.8,microxip:'941000071236548',estat:'actiu',alergies:'',habitacio:''},
    {id:'A010',nom:'Bruno',clientId:'C006',raca:'Shih Tzu',tipus:'gos',sexe:'Mascle',pes:5.3,microxip:'941000082736451',estat:'hotelat',alergies:'Peix',habitacio:'B05'},
    {id:'A011',nom:'Duke',clientId:'C007',raca:'Labrador',tipus:'gos',sexe:'Mascle',pes:29.7,microxip:'941000091827364',estat:'hotelat',alergies:'',habitacio:'A05'},
    {id:'A012',nom:'Kitty',clientId:'C008',raca:'Maine Coon',tipus:'gat',sexe:'Femella',pes:5.1,microxip:'941000103647281',estat:'actiu',alergies:'',habitacio:''},
    {id:'A013',nom:'Pepa',clientId:'C009',raca:'Caniche',tipus:'gos',sexe:'Femella',pes:3.9,microxip:'941000112736485',estat:'hotelat',alergies:'',habitacio:'B02'},
    {id:'A014',nom:'Nina',clientId:'C010',raca:'Mestís',tipus:'gos',sexe:'Femella',pes:7.2,microxip:'941000123648271',estat:'hotelat',alergies:'',habitacio:'B04'},
    {id:'A015',nom:'Coco',clientId:'C011',raca:'Conill',tipus:'conill',sexe:'Mascle',pes:1.8,microxip:'',estat:'actiu',alergies:'',habitacio:''},
    {id:'A016',nom:'Fluffy',clientId:'C011',raca:'Conill',tipus:'conill',sexe:'Femella',pes:2.2,microxip:'',estat:'hotelat',alergies:'',habitacio:'D01'},
    {id:'A017',nom:'Tigre',clientId:'C012',raca:'Britànic pèl curt',tipus:'gat',sexe:'Mascle',pes:4.8,microxip:'941000134872615',estat:'actiu',alergies:'',habitacio:''},
    {id:'A018',nom:'Baldo',clientId:'C011',raca:'Mestís',tipus:'gos',sexe:'Mascle',pes:15.4,microxip:'941000145627381',estat:'hotelat',alergies:'',habitacio:'A06'},
    {id:'A019',nom:'Cotó',clientId:'C001',raca:'Conill',tipus:'conill',sexe:'Femella',pes:1.5,microxip:'',estat:'hotelat',alergies:'',habitacio:'D03'},
  ],
  reserves: [
    {id:'RES-2026-038',clientId:'C001',animalId:'A001',entrada:'2026-05-03',sortida:'2026-05-11',habitacio:'B03',estat:'confirmada',total:219},
    {id:'RES-2026-037',clientId:'C004',animalId:'A007',entrada:'2026-04-28',sortida:'2026-05-05',habitacio:'A03',estat:'completada',total:196},
    {id:'RES-2026-036',clientId:'C003',animalId:'A004',entrada:'2026-05-01',sortida:'2026-05-08',habitacio:'A02',estat:'confirmada',total:165},
    {id:'RES-2026-035',clientId:'C006',animalId:'A010',entrada:'2026-04-30',sortida:'2026-05-07',habitacio:'B05',estat:'confirmada',total:157},
  ],
  habitacions: [
    {id:'A01',zona:'Zona A — Gossos grans',tipus:'gos',preuDia:28,activa:true},
    {id:'A02',zona:'Zona A — Gossos grans',tipus:'gos',preuDia:28,activa:true},
    {id:'A03',zona:'Zona A — Gossos grans',tipus:'gos',preuDia:28,activa:true},
    {id:'A04',zona:'Zona A — Gossos grans',tipus:'gos',preuDia:28,activa:true},
    {id:'A05',zona:'Zona A — Gossos grans',tipus:'gos',preuDia:28,activa:true},
    {id:'A06',zona:'Zona A — Gossos grans',tipus:'gos',preuDia:28,activa:true},
    {id:'B01',zona:'Zona B — Gossos petits',tipus:'gos',preuDia:22,activa:true},
    {id:'B02',zona:'Zona B — Gossos petits',tipus:'gos',preuDia:22,activa:true},
    {id:'B03',zona:'Zona B — Gossos petits',tipus:'gos',preuDia:22,activa:true},
    {id:'B04',zona:'Zona B — Gossos petits',tipus:'gos',preuDia:22,activa:true},
    {id:'B05',zona:'Zona B — Gossos petits',tipus:'gos',preuDia:22,activa:true},
    {id:'C01',zona:'Zona C — Gats',tipus:'gat',preuDia:20,activa:true},
    {id:'C02',zona:'Zona C — Gats',tipus:'gat',preuDia:20,activa:true},
    {id:'C03',zona:'Zona C — Gats',tipus:'gat',preuDia:20,activa:true},
    {id:'C04',zona:'Zona C — Gats',tipus:'gat',preuDia:20,activa:true},
    {id:'C05',zona:'Zona C — Gats',tipus:'gat',preuDia:20,activa:true},
    {id:'D01',zona:'Zona D — Conills i altres',tipus:'conill',preuDia:15,activa:true},
    {id:'D02',zona:'Zona D — Conills i altres',tipus:'conill',preuDia:15,activa:true},
    {id:'D03',zona:'Zona D — Conills i altres',tipus:'conill',preuDia:15,activa:true},
  ],
};

// ---- UTILS ----
const TODAY = new Date(2026, 4, 3);
const MONTHS = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];
const DAYS   = ['Dl','Dm','Dx','Dj','Dv','Ds','Dg'];

function formatDate(d) {
  return d.toLocaleDateString('ca-ES', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
}
function addDays(d, n) {
  const r = new Date(d); r.setDate(r.getDate() + n); return r;
}
function sameDay(a, b) {
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}
function getClientById(id) { return DB.clients.find(c => c.id === id); }
function getAnimalById(id)  { return DB.animals.find(a => a.id === id); }
function getClientNom(c)    { return c ? `${c.nom} ${c.cognoms}` : '—'; }

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href').split('/').pop().split('?')[0];
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
});
