// ===========================
//   HOTEL GESTIÓ — config.js
//   Connexió a Supabase
// ===========================

const SUPABASE_URL = 'https://lawpgdnzxmdutzrastfr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhd3BnZG56eG1kdXR6cmFzdGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDU0ODcsImV4cCI6MjA5MzQ4MTQ4N30.cIvBDxDjmZ0Otb2Q_5K0R_eIP_ucGovRmlcUUECEMFM';

// ---- CLIENT SUPABASE ----
// Fem servir la llibreria oficial via CDN (sense npm)
// Afegeix aquesta línia al <head> de cada pàgina:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let dbClient;

function initSupabase() {
  if (typeof window.supabase !== 'undefined') {
    dbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase connectat correctament'); window.dbClient = dbClient;
  } else {
    console.error('❌ Supabase no carregat');
  }
  return dbClient;
}

// ---- FUNCIONS GENERALS ----

// CLIENTS
async function getClients(filters = {}) {
  let query = dbClient.from('clients').select('*').order('cognoms');
  if (filters.estat) query = query.eq('estat', filters.estat);
  if (filters.cerca) query = query.or(`nom.ilike.%${filters.cerca}%,cognoms.ilike.%${filters.cerca}%,email.ilike.%${filters.cerca}%`);
  const { data, error } = await query;
  if (error) console.error('Error clients:', error);
  return data || [];
}

async function getClient(id) {
  const { data, error } = await dbClient.from('clients').select('*').eq('id', id).single();
  if (error) console.error('Error client:', error);
  return data;
}

async function saveClient(client) {
  client.updated_at = new Date().toISOString();
  if (client.id) {
    const { data, error } = await dbClient.from('clients').update(client).eq('id', client.id).select().single();
    if (error) console.error('Error update client:', error);
    return data;
  } else {
    const { data, error } = await dbClient.from('clients').insert(client).select().single();
    if (error) console.error('Error insert client:', error);
    return data;
  }
}

async function deleteClient(id) {
  const { error } = await dbClient.from('clients').delete().eq('id', id);
  if (error) console.error('Error delete client:', error);
  return !error;
}

// ANIMALS
async function getAnimals(filters = {}) {
  let query = dbClient.from('animals').select(`*, clients(nom, cognoms)`).order('nom');
  if (filters.client_id) query = query.eq('client_id', filters.client_id);
  if (filters.tipus) query = query.eq('tipus', filters.tipus);
  if (filters.estat) query = query.eq('estat', filters.estat);
  if (filters.cerca) query = query.ilike('nom', `%${filters.cerca}%`);
  const { data, error } = await query;
  if (error) console.error('Error animals:', error);
  return data || [];
}

async function getAnimal(id) {
  const { data, error } = await dbClient.from('animals').select(`*, clients(nom, cognoms, tel_mobil, email)`).eq('id', id).single();
  if (error) console.error('Error animal:', error);
  return data;
}

async function saveAnimal(animal) {
  animal.updated_at = new Date().toISOString();
  if (animal.id) {
    const { data, error } = await dbClient.from('animals').update(animal).eq('id', animal.id).select().single();
    if (error) console.error('Error update animal:', error);
    return data;
  } else {
    const { data, error } = await dbClient.from('animals').insert(animal).select().single();
    if (error) console.error('Error insert animal:', error);
    return data;
  }
}

// RESERVES
async function getReserves(filters = {}) {
  let query = dbClient.from('reserves')
    .select(`*, clients(nom, cognoms, tel_mobil), animals(nom, raca, tipus), habitacions(id, zona, tipus)`)
    .order('data_entrada', { ascending: false });
  if (filters.estat) query = query.eq('estat', filters.estat);
  if (filters.data_from) query = query.gte('data_entrada', filters.data_from);
  if (filters.data_to) query = query.lte('data_entrada', filters.data_to);
  const { data, error } = await query;
  if (error) console.error('Error reserves:', error);
  return data || [];
}

async function getReservesAvui() {
  const avui = new Date().toISOString().split('T')[0];
  const { data: entrades } = await dbClient.from('reserves')
    .select(`*, clients(nom, cognoms), animals(nom, raca), habitacions(id)`)
    .gte('data_entrada', avui + 'T00:00:00')
    .lte('data_entrada', avui + 'T23:59:59')
    .in('estat', ['confirmada', 'pendent']);
  const { data: sortides } = await dbClient.from('reserves')
    .select(`*, clients(nom, cognoms), animals(nom, raca), habitacions(id)`)
    .gte('data_sortida', avui + 'T00:00:00')
    .lte('data_sortida', avui + 'T23:59:59')
    .in('estat', ['confirmada', 'pendent']);
  return { entrades: entrades || [], sortides: sortides || [] };
}

async function saveReserva(reserva) {
  // Generar número de reserva
  if (!reserva.numero) {
    const any = new Date().getFullYear();
    const { count } = await dbClient.from('reserves').select('*', { count: 'exact', head: true });
    reserva.numero = `RES-${any}-${String((count || 0) + 1).padStart(4, '0')}`;
  }
  reserva.updated_at = new Date().toISOString();
  if (reserva.id) {
    const { data, error } = await dbClient.from('reserves').update(reserva).eq('id', reserva.id).select().single();
    if (error) console.error('Error update reserva:', error);
    return data;
  } else {
    const { data, error } = await dbClient.from('reserves').insert(reserva).select().single();
    if (error) console.error('Error insert reserva:', error);
    return data;
  }
}

// HABITACIONS
async function getHabitacions() {
  const { data, error } = await dbClient.from('habitacions').select('*').order('id');
  if (error) console.error('Error habitacions:', error);
  return data || [];
}

async function getHabitacionsDisponibles(dataEntrada, dataSortida) {
  // Busca habitacions ocupades en aquell rang de dates
  const { data: ocupades } = await dbClient.from('reserves')
    .select('habitacio_id')
    .in('estat', ['confirmada', 'pendent'])
    .lt('data_entrada', dataSortida)
    .gt('data_sortida', dataEntrada);
  const idsOcupades = (ocupades || []).map(r => r.habitacio_id).filter(Boolean);
  const { data, error } = await dbClient.from('habitacions')
    .select('*').eq('activa', true).order('id');
  if (error) console.error('Error habitacions disponibles:', error);
  return (data || []).map(h => ({ ...h, lliure: !idsOcupades.includes(h.id) }));
}

// ESTADÍSTIQUES DASHBOARD
async function getStatsAvui() {
  const avui = new Date().toISOString().split('T')[0];
  const { data: estades } = await dbClient.from('reserves')
    .select('id', { count: 'exact' })
    .in('estat', ['confirmada', 'pendent'])
    .lte('data_entrada', avui + 'T23:59:59')
    .gte('data_sortida', avui + 'T00:00:00');
  const { count: totalAnimals } = await dbClient.from('animals')
    .select('*', { count: 'exact', head: true });
  const { count: totalHab } = await dbClient.from('habitacions')
    .select('*', { count: 'exact', head: true }).eq('activa', true);
  const estadesCnt = (estades || []).length;
  const lliures = (totalHab || 0) - estadesCnt;
  const ocupacio = totalHab ? Math.round((estadesCnt / totalHab) * 100) : 0;
  return {
    estades: estadesCnt,
    animals: totalAnimals || 0,
    lliures: lliures,
    ocupades: estadesCnt,
    ocupacio: ocupacio,
    totalHabitacions: totalHab || 0
  };
}

// VENDES
async function getVendes(filters = {}) {
  let query = dbClient.from('vendes')
    .select(`*, clients(nom, cognoms)`)
    .order('data_factura', { ascending: false });
  if (filters.estat) query = query.eq('estat', filters.estat);
  const { data, error } = await query;
  if (error) console.error('Error vendes:', error);
  return data || [];
}

// TASQUES
async function getTasques() {
  const { data, error } = await dbClient.from('tasques')
    .select('*').order('data_limit').order('created_at');
  if (error) console.error('Error tasques:', error);
  return data || [];
}

async function toggleTasca(id, completada) {
  const { error } = await dbClient.from('tasques').update({ completada }).eq('id', id);
  if (error) console.error('Error toggle tasca:', error);
}

async function saveTasca(tasca) {
  if (tasca.id) {
    const { data, error } = await dbClient.from('tasques').update(tasca).eq('id', tasca.id).select().single();
    if (error) console.error('Error update tasca:', error);
    return data;
  } else {
    const { data, error } = await dbClient.from('tasques').insert(tasca).select().single();
    if (error) console.error('Error insert tasca:', error);
    return data;
  }
}

document.addEventListener('DOMContentLoaded', initSupabase);
