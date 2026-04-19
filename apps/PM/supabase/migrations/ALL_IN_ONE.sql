-- ═══════════════════════════════════════════════════════════════════
-- PM App — ALL-IN-ONE Migration
-- Paste vào: Supabase Dashboard → SQL Editor → New Query → Run
-- Thứ tự: Schema → RLS → Triggers → Business Tables → Seed Data
-- ═══════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════
-- PART 1: SCHEMA (18 core tables)
-- ══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  full_name_vi TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'pm', 'engineer', 'viewer')),
  avatar_initials TEXT,
  phone TEXT,
  department TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $func$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 'viewer')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_vi TEXT,
  description TEXT,
  description_vi TEXT,
  phase TEXT NOT NULL CHECK (phase IN ('CONCEPT', 'EVT', 'DVT', 'PVT', 'MP')),
  phase_index INTEGER NOT NULL DEFAULT 0,
  phase_owner_id UUID REFERENCES public.profiles(id),
  phase_owner_name TEXT,
  start_date DATE,
  target_mp DATE,
  health TEXT CHECK (health IN ('ON_TRACK', 'AT_RISK', 'DELAYED', 'BLOCKED')) DEFAULT 'ON_TRACK',
  cascade_alerts INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase TEXT NOT NULL CHECK (phase IN ('CONCEPT', 'EVT', 'DVT', 'PVT', 'MP')),
  target_date DATE,
  actual_date DATE,
  status TEXT CHECK (status IN ('PLANNED', 'IN_PROGRESS', 'DONE', 'DELAYED')) DEFAULT 'PLANNED',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, phase)
);

CREATE TABLE IF NOT EXISTS public.project_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role_in_project TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.issues (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_vi TEXT,
  description TEXT,
  description_vi TEXT,
  status TEXT NOT NULL CHECK (status IN ('DRAFT', 'OPEN', 'IN_PROGRESS', 'BLOCKED', 'CLOSED')) DEFAULT 'DRAFT',
  severity TEXT NOT NULL CHECK (severity IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')),
  source TEXT CHECK (source IN ('INTERNAL', 'EXTERNAL', 'CROSS_TEAM')) DEFAULT 'INTERNAL',
  owner_id UUID REFERENCES public.profiles(id),
  owner_name TEXT,
  phase TEXT,
  root_cause TEXT,
  root_cause_vi TEXT,
  due_date DATE,
  closed_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_by_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issues_project ON public.issues(project_id);
CREATE INDEX IF NOT EXISTS idx_issues_status ON public.issues(status);
CREATE INDEX IF NOT EXISTS idx_issues_severity ON public.issues(severity);
CREATE INDEX IF NOT EXISTS idx_issues_owner ON public.issues(owner_id);

CREATE TABLE IF NOT EXISTS public.issue_impacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id TEXT NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  affected_phase TEXT NOT NULL,
  delay_weeks INTEGER DEFAULT 0,
  description TEXT,
  description_vi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.issue_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_id TEXT NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  content_vi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issue_updates_issue ON public.issue_updates(issue_id);

CREATE TABLE IF NOT EXISTS public.gate_conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase TEXT NOT NULL,
  category TEXT,
  label TEXT NOT NULL,
  label_vi TEXT,
  is_required BOOLEAN DEFAULT false,
  is_checked BOOLEAN DEFAULT false,
  checked_by UUID REFERENCES public.profiles(id),
  checked_at TIMESTAMPTZ,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gates_project_phase ON public.gate_conditions(project_id, phase);

CREATE TABLE IF NOT EXISTS public.suppliers (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_vi TEXT,
  country TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  quality_rating NUMERIC(3,1),
  delivery_on_time_rate NUMERIC(5,2),
  defect_rate NUMERIC(5,2),
  total_orders INTEGER DEFAULT 0,
  late_deliveries INTEGER DEFAULT 0,
  qualification_status TEXT CHECK (qualification_status IN ('QUALIFIED', 'PENDING', 'PROBATION', 'DISQUALIFIED')) DEFAULT 'PENDING',
  certifications TEXT[],
  last_audit_date DATE,
  next_audit_date DATE,
  payment_terms TEXT,
  currency TEXT DEFAULT 'USD',
  notes TEXT,
  notes_vi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bom_parts (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  parent_id TEXT REFERENCES public.bom_parts(id),
  name TEXT NOT NULL,
  name_vi TEXT,
  part_number TEXT,
  category TEXT,
  level INTEGER DEFAULT 0,
  quantity INTEGER DEFAULT 1,
  unit_cost NUMERIC(12,2),
  total_cost NUMERIC(12,2),
  currency TEXT DEFAULT 'USD',
  supplier_id TEXT REFERENCES public.suppliers(id),
  lifecycle TEXT CHECK (lifecycle IN ('ACTIVE', 'NRND', 'EOL', 'OBSOLETE')) DEFAULT 'ACTIVE',
  lead_time_days INTEGER,
  weight_grams NUMERIC(10,2),
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bom_project ON public.bom_parts(project_id);
CREATE INDEX IF NOT EXISTS idx_bom_parent ON public.bom_parts(parent_id);
CREATE INDEX IF NOT EXISTS idx_bom_supplier ON public.bom_parts(supplier_id);

CREATE TABLE IF NOT EXISTS public.delivery_records (
  id TEXT PRIMARY KEY,
  supplier_id TEXT NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  bom_part_id TEXT REFERENCES public.bom_parts(id),
  bom_part_name TEXT,
  order_date DATE,
  promised_date DATE,
  actual_date DATE,
  quantity INTEGER,
  unit_price NUMERIC(12,2),
  status TEXT CHECK (status IN ('ORDERED', 'IN_TRANSIT', 'DELIVERED_ON_TIME', 'DELIVERED_LATE', 'CANCELLED')) DEFAULT 'ORDERED',
  delay_days INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_delivery_supplier ON public.delivery_records(supplier_id);

CREATE TABLE IF NOT EXISTS public.flight_tests (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  test_number INTEGER,
  date DATE NOT NULL,
  location TEXT,
  location_vi TEXT,
  pilot_id UUID REFERENCES public.profiles(id),
  pilot_name TEXT,
  drone_unit TEXT,
  test_type TEXT CHECK (test_type IN ('STABILITY', 'ENDURANCE', 'SPEED', 'PAYLOAD', 'ENVIRONMENTAL', 'RANGE', 'INTEGRATION')),
  test_phase TEXT,
  result TEXT CHECK (result IN ('PASS', 'FAIL', 'PARTIAL', 'ABORTED')) NOT NULL,
  duration_seconds INTEGER,
  sensor_data JSONB,
  notes TEXT,
  notes_vi TEXT,
  auto_issue_id TEXT REFERENCES public.issues(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_flights_project ON public.flight_tests(project_id);
CREATE INDEX IF NOT EXISTS idx_flights_result ON public.flight_tests(result);

CREATE TABLE IF NOT EXISTS public.flight_anomalies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flight_test_id TEXT NOT NULL REFERENCES public.flight_tests(id) ON DELETE CASCADE,
  timestamp_seconds INTEGER,
  description TEXT NOT NULL,
  description_vi TEXT,
  severity TEXT CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.flight_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flight_test_id TEXT NOT NULL REFERENCES public.flight_tests(id) ON DELETE CASCADE,
  file_type TEXT CHECK (file_type IN ('VIDEO', 'LOG', 'PHOTO', 'DOCUMENT')),
  file_name TEXT NOT NULL,
  file_url TEXT,
  file_size_bytes BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.decisions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  title_vi TEXT,
  date DATE,
  decision_maker_id UUID REFERENCES public.profiles(id),
  decision_maker_name TEXT,
  phase TEXT,
  options JSONB,
  chosen_option TEXT,
  rationale TEXT,
  rationale_vi TEXT,
  impact_phase TEXT,
  impact_description TEXT,
  cost_impact TEXT,
  status TEXT CHECK (status IN ('PROPOSED', 'APPROVED', 'SUPERSEDED', 'REJECTED')) DEFAULT 'PROPOSED',
  linked_issue_ids TEXT[],
  linked_flight_test_ids TEXT[],
  linked_gate_condition_ids UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_decisions_project ON public.decisions(project_id);

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  user_name TEXT,
  user_role TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  entity_title TEXT,
  old_value TEXT,
  new_value TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_user ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON public.audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_log(created_at DESC);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  title_vi TEXT,
  body TEXT,
  project_id TEXT REFERENCES public.projects(id),
  entity_type TEXT,
  entity_id TEXT,
  is_read BOOLEAN DEFAULT false,
  is_emailed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON public.notifications(created_at DESC);

CREATE TABLE IF NOT EXISTS public.email_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  email_enabled BOOLEAN DEFAULT true,
  in_app_enabled BOOLEAN DEFAULT true,
  frequency TEXT CHECK (frequency IN ('REALTIME', 'DIGEST')) DEFAULT 'REALTIME',
  UNIQUE(user_id, event_type)
);

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $func$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS set_updated_at ON public.projects;
DROP TRIGGER IF EXISTS set_updated_at ON public.issues;
DROP TRIGGER IF EXISTS set_updated_at ON public.suppliers;
DROP TRIGGER IF EXISTS set_updated_at ON public.bom_parts;
DROP TRIGGER IF EXISTS set_updated_at ON public.flight_tests;
DROP TRIGGER IF EXISTS set_updated_at ON public.decisions;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.issues FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.bom_parts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.flight_tests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.decisions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════════════════════
-- PART 2: RLS POLICIES
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_impacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bom_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_anomalies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_preferences ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $func$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$func$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Profiles
DROP POLICY IF EXISTS "Profiles: viewable by authenticated users" ON public.profiles;
CREATE POLICY "Profiles: viewable by authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Profiles: users can update own profile" ON public.profiles;
CREATE POLICY "Profiles: users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Projects
DROP POLICY IF EXISTS "Projects: viewable by authenticated" ON public.projects;
CREATE POLICY "Projects: viewable by authenticated" ON public.projects FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Projects: admin/pm can insert" ON public.projects;
CREATE POLICY "Projects: admin/pm can insert" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.get_user_role() IN ('admin', 'pm'));
DROP POLICY IF EXISTS "Projects: admin/pm can update" ON public.projects;
CREATE POLICY "Projects: admin/pm can update" ON public.projects FOR UPDATE TO authenticated USING (public.get_user_role() IN ('admin', 'pm'));

-- Issues
DROP POLICY IF EXISTS "Issues: viewable by authenticated" ON public.issues;
CREATE POLICY "Issues: viewable by authenticated" ON public.issues FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Issues: authenticated can create" ON public.issues;
CREATE POLICY "Issues: authenticated can create" ON public.issues FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Issues: owner/pm/admin can update" ON public.issues;
CREATE POLICY "Issues: owner/pm/admin can update" ON public.issues FOR UPDATE TO authenticated USING (owner_id = auth.uid() OR created_by = auth.uid() OR public.get_user_role() IN ('admin', 'pm'));

-- Gate conditions
DROP POLICY IF EXISTS "Gates: viewable by authenticated" ON public.gate_conditions;
CREATE POLICY "Gates: viewable by authenticated" ON public.gate_conditions FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Gates: engineer/pm/admin can update" ON public.gate_conditions;
CREATE POLICY "Gates: engineer/pm/admin can update" ON public.gate_conditions FOR UPDATE TO authenticated USING (public.get_user_role() IN ('admin', 'pm', 'engineer'));

-- Read-all policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'milestones' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.milestones FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'project_members' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.project_members FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'issue_impacts' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.issue_impacts FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'issue_updates' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.issue_updates FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'suppliers' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.suppliers FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'bom_parts' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.bom_parts FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'delivery_records' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.delivery_records FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'flight_tests' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.flight_tests FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'flight_anomalies' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.flight_anomalies FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'flight_attachments' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.flight_attachments FOR SELECT TO authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'decisions' AND policyname = 'select_all') THEN
    CREATE POLICY "select_all" ON public.decisions FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- Audit log
DROP POLICY IF EXISTS "Audit: admin can read" ON public.audit_log;
CREATE POLICY "Audit: admin can read" ON public.audit_log FOR SELECT TO authenticated USING (public.get_user_role() = 'admin');
DROP POLICY IF EXISTS "Audit: authenticated can insert" ON public.audit_log;
CREATE POLICY "Audit: authenticated can insert" ON public.audit_log FOR INSERT TO authenticated WITH CHECK (true);

-- Notifications
DROP POLICY IF EXISTS "Notifications: user sees own" ON public.notifications;
CREATE POLICY "Notifications: user sees own" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Notifications: system can insert" ON public.notifications;
CREATE POLICY "Notifications: system can insert" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Notifications: user can update own (mark read)" ON public.notifications;
CREATE POLICY "Notifications: user can update own (mark read)" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Email preferences
DROP POLICY IF EXISTS "Email prefs: user sees own" ON public.email_preferences;
CREATE POLICY "Email prefs: user sees own" ON public.email_preferences FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Email prefs: user manages own" ON public.email_preferences;
CREATE POLICY "Email prefs: user manages own" ON public.email_preferences FOR ALL TO authenticated USING (user_id = auth.uid());

-- ══════════════════════════════════════════════════════════════
-- DONE ✅
-- Sau khi chạy xong:
-- 1. Vào Authentication → Users → Add user → tạo tài khoản
-- 2. Chạy sql-03-update-profiles.sql để set roles
-- ══════════════════════════════════════════════════════════════


-- ══════════════════════════════════════════════════════════════
-- PART 3: TẠO USERS — insert trực tiếp vào auth.users
-- Password được hash bằng bcrypt (cost=10)
-- Password mặc định: Admin@RTR2026! cho admin, RTR@2026! cho còn lại
-- ══════════════════════════════════════════════════════════════

INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, role, aud
)
SELECT
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  u.email,
  crypt(u.password, gen_salt('bf', 10)),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  jsonb_build_object('full_name', u.full_name),
  false, 'authenticated', 'authenticated'
FROM (VALUES
  ('admin@rtr.vn',      'Admin@RTR2026!', 'Quỳnh Anh'),
  ('minhtuan@rtr.vn',   'RTR@2026!',      'Minh Tuấn'),
  ('thutrang@rtr.vn',   'RTR@2026!',      'Thu Trang'),
  ('hongphuc@rtr.vn',   'RTR@2026!',      'Hồng Phúc'),
  ('ducanh@rtr.vn',     'RTR@2026!',      'Đức Anh'),
  ('thanhha@rtr.vn',    'RTR@2026!',      'Thanh Hà'),
  ('minhkhoa@rtr.vn',   'RTR@2026!',      'Minh Khoa'),
  ('thiphuong@rtr.vn',  'RTR@2026!',      'Thị Phương'),
  ('hainam@rtr.vn',     'RTR@2026!',      'Hải Nam'),
  ('dinhtoan@rtr.vn',   'RTR@2026!',      'Đình Toàn'),
  ('hoangson@rtr.vn',   'RTR@2026!',      'Hoàng Sơn'),
  ('quocviet@rtr.vn',   'RTR@2026!',      'Quốc Việt'),
  ('vanhung@rtr.vn',    'RTR@2026!',      'Văn Hùng'),
  ('lehuong@rtr.vn',    'RTR@2026!',      'Lệ Hương'),
  ('thanhmai@rtr.vn',   'RTR@2026!',      'Thanh Mai')
) AS u(email, password, full_name)
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = u.email);

-- Tạo identity records (cần cho email/password login)
INSERT INTO auth.identities (
  id, user_id, provider_id, provider,
  identity_data, created_at, updated_at, last_sign_in_at
)
SELECT
  gen_random_uuid(),
  au.id,
  au.email,
  'email',
  jsonb_build_object('sub', au.id::text, 'email', au.email),
  NOW(), NOW(), NOW()
FROM auth.users au
WHERE au.email LIKE '%@rtr.vn'
  AND NOT EXISTS (
    SELECT 1 FROM auth.identities ai
    WHERE ai.user_id = au.id AND ai.provider = 'email'
  );

-- ══════════════════════════════════════════════════════════════
-- PART 4: UPDATE PROFILES (roles, departments)
-- Chạy sau khi users đã được tạo và trigger đã tạo profiles
-- ══════════════════════════════════════════════════════════════

UPDATE public.profiles SET role = 'admin', full_name = 'Quỳnh Anh', avatar_initials = 'QA', department = 'AI' WHERE email = 'admin@rtr.vn';
UPDATE public.profiles SET role = 'pm', full_name = 'Minh Tuấn', avatar_initials = 'MT', department = 'R&D' WHERE email = 'minhtuan@rtr.vn';
UPDATE public.profiles SET role = 'pm', full_name = 'Thu Trang', avatar_initials = 'TT', department = 'R&D' WHERE email = 'thutrang@rtr.vn';
UPDATE public.profiles SET role = 'pm', full_name = 'Hồng Phúc', avatar_initials = 'HP', department = 'Operations' WHERE email = 'hongphuc@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Đức Anh', avatar_initials = 'DA', department = 'Mechanical' WHERE email = 'ducanh@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Thanh Hà', avatar_initials = 'TH', department = 'Electrical' WHERE email = 'thanhha@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Minh Khoa', avatar_initials = 'MK', department = 'Software' WHERE email = 'minhkhoa@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Thị Phương', avatar_initials = 'TP', department = 'Avionics' WHERE email = 'thiphuong@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Hải Nam', avatar_initials = 'HN', department = 'Flight Test' WHERE email = 'hainam@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Đình Toàn', avatar_initials = 'DT', department = 'Mechanical' WHERE email = 'dinhtoan@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Hoàng Sơn', avatar_initials = 'HS', department = 'Quality' WHERE email = 'hoangson@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Quốc Việt', avatar_initials = 'QV', department = 'Software' WHERE email = 'quocviet@rtr.vn';
UPDATE public.profiles SET role = 'engineer', full_name = 'Văn Hùng', avatar_initials = 'VH', department = 'Electrical' WHERE email = 'vanhung@rtr.vn';
UPDATE public.profiles SET role = 'viewer', full_name = 'Lệ Hương', avatar_initials = 'LH', department = 'Finance' WHERE email = 'lehuong@rtr.vn';
UPDATE public.profiles SET role = 'viewer', full_name = 'Thanh Mai', avatar_initials = 'TM', department = 'HR' WHERE email = 'thanhmai@rtr.vn';

-- Verify
SELECT email, full_name, role, department FROM public.profiles ORDER BY role, full_name;

-- ══════════════════════════════════════════════════════════════
-- ✅ HOÀN TẤT — Tài khoản đăng nhập:
--   Admin:    admin@rtr.vn     / Admin@RTR2026!
--   PM/Eng/Viewer: *@rtr.vn   / RTR@2026!
-- ══════════════════════════════════════════════════════════════
