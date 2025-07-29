-- Fix remaining security warnings from the linter

-- Fix 1: Set proper search_path for security definer function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;