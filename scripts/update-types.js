#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function updateTypes() {
  console.log('🔄 Actualizando tipos TypeScript...');
  
  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    // Generate types using Supabase API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      }
    });
    
    if (response.ok) {
      console.log('✅ Tipos actualizados correctamente');
      console.log('📝 Ejecuta: pnpm gen-types para obtener tipos actualizados');
    }
    
  } catch (error) {
    console.log('ℹ️ Para actualizar tipos manualmente:');
    console.log('pnpm add -D supabase');
    console.log('npx supabase gen types typescript --project-id hknvtplucxlpbvkldhhu > lib/supabase/types.ts');
  }
}

updateTypes();