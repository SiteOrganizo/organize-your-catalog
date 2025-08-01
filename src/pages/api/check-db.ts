// This file won't work as an API endpoint in a Vite/React project
// For API functionality, use Supabase Edge Functions instead

import { supabase } from '@/integrations/supabase/client';

export const checkDatabase = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Database connection error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};