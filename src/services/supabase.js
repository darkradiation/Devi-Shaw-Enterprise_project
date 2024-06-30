import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nnfnobdpdtdimlugwmig.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZm5vYmRwZHRkaW1sdWd3bWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk3NTU2ODMsImV4cCI6MjAzNTMzMTY4M30.96qHPH5FLU17fNc8MX1k2FJ2wFt8ymtCPWDTrAtgsZs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
