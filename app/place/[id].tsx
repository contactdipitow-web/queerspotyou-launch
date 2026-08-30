import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { BrandHeader } from '@/components/BrandHeader';
import { Button, Card, Screen } from '@/components/ui';
import { getVenue } from '@/services/venues';
import { isFavorite, setFavorite } from '@/services/account';
import { useAuth } from '@/contexts/AuthContext';
import type { Venue } from '@/types';
import { colors, radius } from '@/theme';
export default function VenueDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); const { user } = useAuth(); const [venue, setVenue] = useState<Venue | null>(null); const [favorite, setFavoriteState] = useState(false);
  useEffect(() => { if (id) void getVenue(id).then(setVenue).catch(() => setVenue(null)); }, [id]);
  useEffect(() => { if (user && id) void isFavorite(user.id, id).then(setFavoriteState); }, [user, id]);
  if (!venue) return <Screen><ActivityIndicator color={colors.fuchsia} style={{ marginTop: 80 }} /></Screen>;
  const toggleFavorite = async () => { if (!user) { router.push('/auth'); return; } const next = !favorite; try { await setFavorite(user.id, venue.id, next); setFavoriteState(next); } catch (error: any) { Alert.alert('Favori', error?.message ?? 'Action impossible.'); } };
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name} ${venue.address_line} ${venue.city}`)}`;
  return <Screen><ScrollView contentContainerStyle={styles.container}><BrandHeader compact /><View style={styles.hero}><Text style={styles.badge}>SPOT DE LA COMMUNAUTÉ</Text><Text style={styles.title}>{venue.name}</Text><Text style={styles.address}>{venue.address_line}{venue.postal_code ? ` · ${venue.postal_code}` : ''} {venue.city}</Text></View><Card><Text style={styles.sectionTitle}>Pourquoi ce spot ?</Text><Text style={styles.body}>{venue.queer_context || venue.description || 'Ce lieu est référencé par la communauté QUEERSPOT YOU.'}</Text></Card><View style={styles.actions}><Button label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} onPress={() => void toggleFavorite()} /><Button label="Itinéraire" variant="secondary" onPress={() => void Linking.openURL(mapsUrl)} />{venue.website_url && <Button label="Site web" variant="secondary" onPress={() => void Linking.openURL(venue.website_url!)} />}<Button label="Signaler un problème" variant="secondary" onPress={() => router.push({ pathname: '/report/[id]', params: { id: venue.id } })} /></View><Text style={styles.disclaimer}>Les expériences de la communauté sont informatives et ne garantissent pas la sécurité en temps réel.</Text></ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { padding: 18, paddingBottom: 80, gap: 14 }, hero: { minHeight: 190, borderRadius: radius.lg, padding: 18, justifyContent: 'flex-end', backgroundColor: colors.purple }, badge: { color: colors.lime, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }, title: { color: colors.white, fontWeight: '900', fontSize: 34, lineHeight: 37, marginTop: 6 }, address: { color: '#EEE8FF', marginTop: 7, lineHeight: 19 }, sectionTitle: { color: colors.mint, fontWeight: '900' }, body: { color: colors.ivory, lineHeight: 21, marginTop: 7 }, actions: { gap: 9 }, disclaimer: { color: colors.muted, fontSize: 12, lineHeight: 18 } });
