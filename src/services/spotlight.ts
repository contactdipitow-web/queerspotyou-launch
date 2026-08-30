import { supabase } from '@/lib/supabase';
import type { SpotlightItem } from '@/types';
const fields = 'id,slug,kind,title,eyebrow,summary,image_url,link_url,cta_label,establishment_id,partner_name,is_priority,is_sponsored,is_published,sort_order,starts_at,ends_at';
export async function listSpotlight() { const { data, error } = await supabase.from('spotlight_items').select(fields).eq('is_published', true).order('sort_order').order('created_at'); if (error) throw error; const now = Date.now(); return (data ?? []).filter((item) => (!item.starts_at || new Date(item.starts_at).getTime() <= now) && (!item.ends_at || new Date(item.ends_at).getTime() > now)) as SpotlightItem[]; }
export async function adminListSpotlight() { const { data, error } = await supabase.from('spotlight_items').select(fields).order('sort_order').order('created_at'); if (error) throw error; return (data ?? []) as SpotlightItem[]; }
export async function adminUpdateSpotlight(id: string, patch: Partial<SpotlightItem>) { const { error } = await supabase.from('spotlight_items').update(patch).eq('id', id); if (error) throw error; }
export async function adminDeleteSpotlight(id: string) { const { error } = await supabase.from('spotlight_items').delete().eq('id', id); if (error) throw error; }
export async function adminCreateSpotlight(input: Pick<SpotlightItem, 'slug' | 'kind' | 'title'> & Partial<SpotlightItem>) { const { error } = await supabase.from('spotlight_items').insert(input); if (error) throw error; }
