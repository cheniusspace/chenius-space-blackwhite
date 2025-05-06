// Configuration file for environment variables
export const config = {
  adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || 'dobinhan', // Fallback for development
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
}; 