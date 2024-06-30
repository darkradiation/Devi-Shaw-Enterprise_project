import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://btudmhxamelonucdbupr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0dWRtaHhhbWVsb251Y2RidXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwNzYzNzAsImV4cCI6MjAyNzY1MjM3MH0.AIym-yLxKvbCnehCwW2fsXHT3uXJSJkf3o3_JhDNU6s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
