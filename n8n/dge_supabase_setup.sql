-- ==============================================================================
-- DISEÑO GRÁFICO EXPRESS (DGE)
-- Configuración de Memoria y CRM para Agente Sofía
-- ==============================================================================

-- 1. Tabla de Memoria a Corto Plazo (Para que Sofía recuerde el hilo de la charla)
CREATE TABLE IF NOT EXISTS dge_chat_memory (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL, -- El número de teléfono con código de país
    message JSONB NOT NULL,   -- El payload del mensaje (usuario o IA)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear un índice para búsquedas rápidas por sesión
CREATE INDEX IF NOT EXISTS idx_dge_chat_memory_session ON dge_chat_memory(session_id);

-- 2. Tabla CRM de Leads (Para capturar interesados de la Web)
CREATE TABLE IF NOT EXISTS dge_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT UNIQUE NOT NULL,
    name TEXT,
    interest TEXT,           -- Ej: "Web Pro & Brand"
    status TEXT DEFAULT 'nuevo',
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- trigger_update_timestamp para dge_leads (si no existe la función, la creamos)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_dge_leads_updated_at ON dge_leads;
CREATE TRIGGER trg_dge_leads_updated_at
BEFORE UPDATE ON dge_leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Opcional pero recomendado)
ALTER TABLE dge_chat_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE dge_leads ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para Service Role (API interna n8n)
DROP POLICY IF EXISTS "Service Role Full Access Memory" ON dge_chat_memory;
CREATE POLICY "Service Role Full Access Memory" ON dge_chat_memory USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service Role Full Access Leads" ON dge_leads;
CREATE POLICY "Service Role Full Access Leads" ON dge_leads USING (true) WITH CHECK (true);
