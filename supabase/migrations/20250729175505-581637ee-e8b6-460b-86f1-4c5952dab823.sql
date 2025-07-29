-- Step 1: Fix the critical RLS policy conflict on products table
-- Remove the conflicting policy that allows everyone to view all products
DROP POLICY IF EXISTS "Products are viewable by everyone when shared" ON public.products;

-- Add is_public column to products table for controlled sharing
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;

-- Create a proper policy for public product access only when explicitly shared
CREATE POLICY "Public products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (is_public = TRUE);

-- Update the user's own products policy to be more specific
DROP POLICY IF EXISTS "Users can view their own products" ON public.products;
CREATE POLICY "Users can view their own products" 
ON public.products 
FOR SELECT 
USING (auth.uid() = user_id);

-- Ensure profiles can be viewed for public catalog display
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow public read access to profiles for catalog display names
CREATE POLICY "Public profiles are viewable for catalog display" 
ON public.profiles 
FOR SELECT 
USING (TRUE);

-- Add audit logging table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only allow users to view their own audit logs
CREATE POLICY "Users can view their own audit logs" 
ON public.security_audit_log 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create security definer function for logging (allows system to write logs)
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id, 
    action, 
    resource_type, 
    resource_id, 
    ip_address, 
    user_agent
  ) VALUES (
    auth.uid(), 
    p_action, 
    p_resource_type, 
    p_resource_id, 
    p_ip_address, 
    p_user_agent
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;