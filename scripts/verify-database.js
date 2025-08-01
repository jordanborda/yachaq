#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function verifyDatabase() {
  console.log('🔍 Verificando base de datos...');
  
  const tables = [
    'profiles', 'courses', 'lessons', 'enrollments', 
    'lesson_progress', 'ai_agents', 'chat_sessions', 
    'chat_messages', 'assignments', 'assignment_submissions',
    'virtual_sessions', 'session_participants'
  ];
  
  let allGood = true;
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ Tabla ${table}: ${error.message}`);
        allGood = false;
      } else {
        console.log(`✅ Tabla ${table}: OK`);
      }
    } catch (err) {
      console.log(`❌ Tabla ${table}: ${err.message}`);
      allGood = false;
    }
  }
  
  // Check AI agent
  try {
    const { data: agents } = await supabase
      .from('ai_agents')
      .select('name')
      .limit(1);
    
    if (agents && agents.length > 0) {
      console.log(`✅ Agente IA: ${agents[0].name}`);
    } else {
      console.log('ℹ️ No hay agentes IA configurados');
    }
  } catch (err) {
    console.log('ℹ️ No se pudieron verificar agentes IA');
  }
  
  if (allGood) {
    console.log('\n🎉 ¡Base de datos completamente funcional!');
    console.log('🌐 Tu aplicación está lista en: http://localhost:3000');
  } else {
    console.log('\n⚠️ Hay problemas con algunas tablas');
    console.log('📝 Aplica manualmente: database/APLICAR_DIRECTO_SUPABASE.sql');
  }
}

verifyDatabase();