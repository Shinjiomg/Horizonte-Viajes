-- Horizonte Viajes — Proyecto Final (CRUD integrado como reservas)
-- Proyecto Supabase: horizonte (smhrftrapxedxlqqmroc)
-- URL: https://smhrftrapxedxlqqmroc.supabase.co

CREATE TABLE IF NOT EXISTS public.horizonte_reservas (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  paquete VARCHAR(50) NOT NULL,
  fecha_salida DATE NOT NULL,
  fecha_regreso DATE NOT NULL,
  viajeros VARCHAR(10),
  presupuesto VARCHAR(20),
  comentarios TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_horizonte_reservas_email
  ON public.horizonte_reservas (email);

CREATE INDEX IF NOT EXISTS idx_horizonte_reservas_created
  ON public.horizonte_reservas (created_at DESC);

ALTER TABLE public.horizonte_reservas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hr_anon_select" ON public.horizonte_reservas
  FOR SELECT TO anon USING (true);

CREATE POLICY "hr_anon_insert" ON public.horizonte_reservas
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "hr_anon_update" ON public.horizonte_reservas
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "hr_anon_delete" ON public.horizonte_reservas
  FOR DELETE TO anon USING (true);

CREATE OR REPLACE FUNCTION public.horizonte_reservas_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_horizonte_reservas_updated_at
  BEFORE UPDATE ON public.horizonte_reservas
  FOR EACH ROW EXECUTE FUNCTION public.horizonte_reservas_set_updated_at();
