// ===========================
//   GESPETSOFT — nav.js
//   Navegació compartida
// ===========================

function renderNav() {
  const isRoot = !window.location.pathname.includes('/pages/');
  const base = isRoot ? '' : '../';

  const navHTML = `
  <style>
    .nav-top{background:#5a8e87;display:flex;align-items:center;justify-content:center;padding:0 6px;height:36px;gap:0;position:relative}
    .nav-top a{color:#e8f5f4;font-size:13px;padding:0 11px;line-height:36px;text-decoration:none;white-space:nowrap}
    .nav-top a:hover{background:rgba(255,255,255,0.15);color:#fff}
    .nav-right{position:absolute;right:6px;display:flex}
    .nav-right button{color:#e8f5f4;font-size:14px;background:none;border:none;cursor:pointer;padding:0 8px;line-height:36px}
    .nav-right button:hover{background:rgba(255,255,255,0.15)}
    .dd{position:relative;display:inline-block}
    .dd-toggle{color:#e8f5f4 !important;font-size:13px;padding:0 11px;line-height:36px;text-decoration:none;display:block;white-space:nowrap;cursor:pointer}
    .dd-toggle:hover,.dd:hover>.dd-toggle{background:rgba(255,255,255,0.15)!important;color:#fff!important}
    .dd-menu{display:none;position:absolute;top:36px;left:0;background:#5a8e87;min-width:195px;z-index:1000;box-shadow:2px 4px 8px rgba(0,0,0,0.25)}
    .dd:hover>.dd-menu{display:block}
    .dd-menu>a,.dd-menu>.dd-sub>.dd-sub-toggle{display:block;color:#e8f5f4;font-size:13px;padding:7px 14px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.1)}
    .dd-menu>a:hover{background:#6a9e97;color:#fff}
    .dd-sub{position:relative}
    .dd-sub>.dd-sub-toggle{display:block;color:#e8f5f4;font-size:13px;padding:7px 14px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.1);cursor:pointer;background:#5a8e87}
    .dd-sub>.dd-sub-toggle:hover,.dd-sub:hover>.dd-sub-toggle{background:#6a9e97;color:#fff}
    .dd-sub-menu{display:none;position:absolute;top:0;left:100%;background:#6a9e97;min-width:210px;z-index:1001;box-shadow:2px 4px 8px rgba(0,0,0,0.25)}
    .dd-sub:hover>.dd-sub-menu{display:block}
    .dd-sub-menu>a{display:block;color:#e8f5f4;font-size:13px;padding:7px 14px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.1)}
    .dd-sub-menu>a:hover{background:#7ab0a9;color:#fff}
    .mobile-menu{display:none;background:#fff;border-bottom:1px solid #c8dedd}
    .mobile-menu select{width:100%;padding:7px 10px;font-size:13px;border:none;border-bottom:1px solid #c8dedd;background:#fff;outline:none}
    @media(max-width:800px){
      .nav-top{display:none}
      .mobile-menu{display:block}
    }
  </style>

  <div class="nav-top">
    <span style="color:#e8f5f4;padding:0 8px;font-size:15px">⊞</span>

    <a href="${base}index.html" style="color:#e8f5f4;font-size:13px;padding:0 11px;line-height:36px;text-decoration:none;white-space:nowrap">🏠 HOTEL</a>

    <div class="dd">
      <a class="dd-toggle">NOU</a>
      <div class="dd-menu">
        <a href="${base}pages/nova-reserva.html">Reserva</a>
        <a href="${base}pages/nova-reserva.html">Entrada</a>
        <a href="${base}pages/nova-reserva.html">Sortida</a>
        <a href="${base}pages/nou-client.html">Client</a>
        <a href="${base}pages/nou-animal.html">Animal</a>
        <a href="#">Proveïdor</a><a href="#">Veterinari</a><a href="#">Gasto</a>
      </div>
    </div>

    <div class="dd">
      <a class="dd-toggle">VEURE</a>
      <div class="dd-menu">
        <a href="${base}pages/planning.html">Planning</a>
        <a href="#">Mapa d'ocupació</a>
        <a href="${base}pages/reserves.html">Reserves</a>
        <a href="${base}pages/reserves.html">Reserves Online</a>
        <a href="${base}pages/reserves.html">Entrades</a>
        <a href="${base}pages/reserves.html">Sortides</a>
        <a href="${base}pages/clients.html">Clients</a>
        <a href="${base}pages/animals.html">Animals</a>
        <a href="#">Proveïdors</a><a href="#">Veterinaris</a>
        <a href="${base}pages/vendes.html">Vendes</a>
        <a href="${base}pages/vendes.html">Despeses</a>
        <a href="#">Recordatoris automàtics</a>
      </div>
    </div>

    <div class="dd">
      <a class="dd-toggle">INFORMES I GRÀFICS</a>
      <div class="dd-menu">
        <a href="#">Resultat financer</a>
        <a href="#">Despeses</a>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Facturació »</a>
          <div class="dd-sub-menu">
            <a href="#">Facturació</a><a href="#">Factures Impagades</a><a href="#">Pendent facturar</a>
          </div>
        </div>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Clients »</a>
          <div class="dd-sub-menu">
            <a href="#">Clients</a><a href="#">Adreces</a>
          </div>
        </div>
        <a href="#">Animals</a>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Rendibilitat »</a>
          <div class="dd-sub-menu">
            <a href="#">Clients Rendibles</a><a href="#">Animals Rendibles</a><a href="#">Serveis i Productes Rendibles</a>
          </div>
        </div>
        <a href="#">Facturació de Productes i Serveis</a>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Ocupació »</a>
          <div class="dd-sub-menu">
            <a href="#">Ocupació Hotel</a><a href="#">Habitacions més utilitzades</a>
          </div>
        </div>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Estimació »</a>
          <div class="dd-sub-menu">
            <a href="#">Estimació vendes</a><a href="#">Estimació Reserves</a>
          </div>
        </div>
      </div>
    </div>

    <div class="dd">
      <a class="dd-toggle">EINES</a>
      <div class="dd-menu">
        <a href="${base}pages/eines.html">Tasques</a>
        <a href="${base}pages/eines.html">Avisos i Alertes</a>
        <a href="#">Documents i Contractes</a>
        <a href="#">Instal·lacions</a>
        <a href="#">Mailing - Mailchimp</a>
        <a href="#">Ajuda</a>
      </div>
    </div>

    <div class="dd">
      <a class="dd-toggle">CONFIGURACIÓ</a>
      <div class="dd-menu">
        <div class="dd-sub">
          <a class="dd-sub-toggle">Configuració Bàsica »</a>
          <div class="dd-sub-menu">
            <a href="#">Idioma / Moneda</a><a href="#">Dades d'empresa</a><a href="#">Races</a>
            <a href="#">Formes de pagament</a><a href="#">Facturació electrònica</a><a href="#">Nombre de factures</a>
          </div>
        </div>
        <a href="#">Empleats</a>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Hotel »</a>
          <div class="dd-sub-menu">
            <a href="#">Serveis Hotel</a><a href="#">Habitacions</a><a href="#">Hora de Sortida</a>
          </div>
        </div>
        <a href="#">Planning</a>
        <a href="#">Reserves Online</a>
        <a href="#">Recordatoris automàtics</a>
        <div class="dd-sub">
          <a class="dd-sub-toggle">Usuaris »</a>
          <div class="dd-sub-menu">
            <a href="#">Usuaris</a><a href="#">Permisos</a><a href="#">Control d'accessos</a>
          </div>
        </div>
        <a href="#">Gestió de Dades</a>
        <a href="#">Consums</a>
        <a href="${base}pages/configuracio.html">Configuració avançada</a>
      </div>
    </div>

    <a href="#" style="color:#e8f5f4;font-size:13px;padding:0 10px;line-height:36px;text-decoration:none">❓ GUIA D'ÚS</a>

    <div class="nav-right">
      <button title="Alertes">⚠</button>
      <button title="Sortir">⏻</button>
    </div>
  </div>

  <div class="mobile-menu">
    <select onchange="if(this.value)window.location=this.value">
      <option value="">--- MENU ---</option>
      <option value="${base}index.html">🏠 Dashboard</option>
      <optgroup label="── NOU ──">
        <option value="${base}pages/nova-reserva.html">Nova Reserva</option>
        <option value="${base}pages/nova-reserva.html">Nova Entrada</option>
        <option value="${base}pages/nova-reserva.html">Nova Sortida</option>
        <option value="${base}pages/nou-client.html">Nou Client</option>
        <option value="${base}pages/nou-animal.html">Nou Animal</option>
      </optgroup>
      <optgroup label="── VEURE ──">
        <option value="${base}pages/planning.html">Planning</option>
        <option value="${base}pages/reserves.html">Reserves</option>
        <option value="${base}pages/reserves.html">Reserves Online</option>
        <option value="${base}pages/reserves.html">Entrades</option>
        <option value="${base}pages/reserves.html">Sortides</option>
        <option value="${base}pages/clients.html">Clients</option>
        <option value="${base}pages/animals.html">Animals</option>
        <option value="${base}pages/vendes.html">Vendes</option>
        <option value="${base}pages/vendes.html">Despeses</option>
      </optgroup>
      <optgroup label="── EINES ──">
        <option value="${base}pages/eines.html">Tasques</option>
        <option value="${base}pages/eines.html">Avisos i Alertes</option>
      </optgroup>
      <optgroup label="── CONFIGURACIÓ ──">
        <option value="${base}pages/configuracio.html">Configuració</option>
      </optgroup>
    </select>
  </div>`;

  document.getElementById('nav-placeholder').innerHTML = navHTML;
}

document.addEventListener('DOMContentLoaded', renderNav);
