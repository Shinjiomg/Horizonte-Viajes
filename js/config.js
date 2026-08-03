const SUPABASE_URL = 'https://smhrftrapxedxlqqmroc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaHJmdHJhcHhlZHhscXFtcm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3Nzg1ODAsImV4cCI6MjEwMTM1NDU4MH0.Q8juElDzOj7rngnNhd3m69EBPazGGrW7SGpJraAVRzw';

function getSupabaseClient() {
  if (!window.__horizonteSupabase) {
    window.__horizonteSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return window.__horizonteSupabase;
}
