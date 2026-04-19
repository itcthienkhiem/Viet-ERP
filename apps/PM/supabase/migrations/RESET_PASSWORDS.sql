-- ═══════════════════════════════════════════════════════════
-- Reset passwords cho tất cả users @rtr.vn
-- Chạy trong Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════

-- Reset admin password
UPDATE auth.users 
SET 
  encrypted_password = crypt('Admin@RTR2026!', gen_salt('bf')),
  updated_at = NOW()
WHERE email = 'admin@rtr.vn';

-- Reset tất cả users còn lại
UPDATE auth.users 
SET 
  encrypted_password = crypt('RTR@2026!', gen_salt('bf')),
  updated_at = NOW()
WHERE email LIKE '%@rtr.vn' AND email != 'admin@rtr.vn';

-- Verify — kiểm tra users đã tồn tại
SELECT 
  email,
  email_confirmed_at IS NOT NULL AS email_confirmed,
  created_at
FROM auth.users 
WHERE email LIKE '%@rtr.vn'
ORDER BY email;
