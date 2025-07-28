-- Fix OTP security warning by setting shorter expiry times
-- This improves security by reducing the time window for OTP attacks

-- Update auth configuration to use shorter OTP expiry (5 minutes instead of default 1 hour)
INSERT INTO auth.config (parameter, value) 
VALUES ('OTP_EXPIRY', '300') 
ON CONFLICT (parameter) 
DO UPDATE SET value = '300';