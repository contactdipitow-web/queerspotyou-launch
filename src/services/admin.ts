import { supabase } from '@/lib/supabase';
import type { AdminStats } from '@/types';
export async function getAdminStats() { const { data, error } = await supabase.rpc('admin_dashboard_stats'); if (error) throw error; const row = Array.isArray(data) ? data[0] : data; return (row ?? { pending_venues: 0, published_venues: 0, members: 0, open_reports: 0, suspended_members: 0 }) as AdminStats; }
export async function adminListVenues() { const { data, error } = await supabase.rpc('admin_list_venues', { search_text: null, max_rows: 100 }); if (error) throw error; return (data ?? []) as any[]; }
export async function moderateVenue(id: string, action: 'publish' | 'reject' | 'hide' | 'restore') { const { error } = await supabase.rpc('admin_moderate_venue', { target_venue_id: id, moderation_action: action, internal_note: null }); if (error) throw error; }
export async function adminListReports() { const { data, error } = await supabase.rpc('admin_list_reports', { include_closed: false, max_rows: 100 }); if (error) throw error; return (data ?? []) as any[]; }
export async function handleReport(id: string, action: 'take' | 'resolve' | 'dismiss') { const { error } = await supabase.rpc('admin_handle_report', { target_report_id: id, report_action: action, internal_note: null }); if (error) throw error; }
