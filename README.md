# 🐾 GespetSoft — Hotel de Mascotes

App de gestió completa per a hotels de mascotes.

## Estructura de fitxers

```
gespetsoft/
├── index.html              ← Dashboard principal
├── css/
│   └── style.css           ← Estils globals
├── js/
│   ├── app.js              ← Dades i utilitats compartides
│   └── dashboard.js        ← Lògica del dashboard
└── pages/
    ├── clients.html        ← Llista de clients
    ├── animals.html        ← Llista d'animals
    ├── reserves.html       ← Reserves
    ├── planning.html       ← Planning visual
    ├── vendes.html         ← Vendes i facturació
    ├── eines.html          ← Tasques i alertes
    └── configuracio.html   ← Configuració
```

## 🚀 Desplegar a Netlify (10 minuts)

### Pas 1 — Pujar el codi a GitHub
1. Ves a https://github.com i crea un compte si no en tens
2. Crea un nou repositori: "New repository" → nom: `gespetsoft` → Public → Create
3. Fes clic a "uploading an existing file"
4. Arrossega TOTA la carpeta `gespetsoft` aquí
5. Fes clic a "Commit changes"

### Pas 2 — Connectar Netlify
1. Ves a https://netlify.com i crea un compte (pots usar el de GitHub)
2. Fes clic a "Add new site" → "Import an existing project"
3. Tria "GitHub" i selecciona el repositori `gespetsoft`
4. Deixa tot per defecte → "Deploy site"
5. En 2 minuts tens una URL tipus: `https://gespetsoft-abc123.netlify.app`

### Pas 3 — Domini personalitzat (opcional)
- A Netlify pots canviar la URL a: `https://gespetsoft.netlify.app`
- O connectar un domini propi si en tens un

## 🔄 Com actualitzar l'app

Quan vulguis fer canvis:
1. Demana els canvis a Claude
2. Descarrega els fitxers actualitzats
3. A GitHub, ves al fitxer corresponent → edita → guarda
4. Netlify actualitza automàticament en 1 minut

## 🗄️ Base de dades (Supabase) — Pas opcional

Actualment les dades estan al fitxer `js/app.js`.
Per tenir dades reals persistents:
1. Crea compte a https://supabase.com
2. Crea un nou projecte
3. Demana a Claude que connecti l'app a Supabase

## 📱 Accés mòbil

L'app és responsive. Accedeix des de qualsevol dispositiu amb la URL de Netlify.

## 🛠️ Mòduls implementats

- ✅ Dashboard (agenda diària, mètriques, cerca)
- ✅ Planning (vista per habitacions i dies)
- ✅ Clients (llista, fitxa, nou, editar)
- ✅ Animals (llista, fitxa, nou, editar)
- ✅ Reserves (nova reserva, entrades, sortides)
- ✅ Vendes i Despeses
- ✅ Eines (tasques, alertes, recordatoris)
- ✅ Configuració (habitacions, usuaris, serveis, etc.)
- ✅ Importació Excel de clients

---
Construït amb Claude · GespetSoft 2026
