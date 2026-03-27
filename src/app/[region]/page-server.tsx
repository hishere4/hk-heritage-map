import HongKongPageClient from './HongKongPageClient';
import { supabase, HeritageItem } from '@/lib/supabase';

async function getHeritageItems(): Promise<HeritageItem[]> {
  const { data, error } = await supabase
    .from('heritage_items')
    .select('*')
    .eq('is_published', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching heritage items:', error);
    return [];
  }
  
  return data || [];
}

export default async function HongKongPage() {
  const items = await getHeritageItems();
  
  return <HongKongPageClient items={items} />;
}
