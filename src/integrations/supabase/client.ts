// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ehbyrimxjvuhrxddpwow.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYnlyaW14anZ1aHJ4ZGRwd293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4MzE3NjgsImV4cCI6MjA1MDQwNzc2OH0._qjFAEq4kR3en5H9C9CIboPLzmXCcN26z07HK21Eawo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);