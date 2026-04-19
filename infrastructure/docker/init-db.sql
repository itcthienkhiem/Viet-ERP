-- Auto-create databases for each app on first container initialization
-- This script runs only once when the volume is fresh

\gset

SELECT 'CREATE DATABASE erp OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'erp')\gexec
SELECT 'CREATE DATABASE crm_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'crm_dev')\gexec
SELECT 'CREATE DATABASE hrm_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hrm_dev')\gexec
SELECT 'CREATE DATABASE mrp_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mrp_dev')\gexec
SELECT 'CREATE DATABASE accounting_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'accounting_dev')\gexec
SELECT 'CREATE DATABASE ecommerce_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ecommerce_dev')\gexec
SELECT 'CREATE DATABASE liphoco_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'liphoco_dev')\gexec
SELECT 'CREATE DATABASE hrm_ai_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hrm_ai_dev')\gexec
SELECT 'CREATE DATABASE hrm_unified_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hrm_unified_dev')\gexec
SELECT 'CREATE DATABASE tpm_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tpm_dev')\gexec
SELECT 'CREATE DATABASE vierp_dev OWNER erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'vierp_dev')\gexec
