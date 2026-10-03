/* =====================================================================
   FLOR DE MENINA SEMIJOIAS - SUPABASE INTEGRATION CONFIG
   =====================================================================
   Instruções:
   1. Acesse seu painel no Supabase (https://supabase.com).
   2. Vá em Project Settings > API.
   3. Cole sua "Project URL" e sua "anon public key" abaixo:
   ===================================================================== */

const SUPABASE_CONFIG = {
  // Substitua pelas chaves do seu projeto Supabase:
  url: '',      // Ex: 'https://xyzcompany.supabase.co'
  anonKey: '',  // Ex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  tableName: 'produtos',
  whatsappNumber: '5563999111818'
};

// Inicialização do cliente Supabase via CDN oficial
let supabaseClient = null;

if (typeof window.supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✦ Conectado com sucesso ao Supabase da Flor de Menina!');
  } catch (err) {
    console.warn('Erro ao conectar com o Supabase:', err);
  }
}

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.supabaseClient = supabaseClient;
