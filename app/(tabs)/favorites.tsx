import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { BrandHeader } from '@/components/BrandHeader';
import { Button, Screen } from '@/components/ui';
import { VenueCard } from '@/components/VenueCard';
import { listFavorites } from '@/services/account';
import { useAuth } from '@/contexts/AuthContext';
import type { Venue } from '@/types';
import { colors } from '@/theme';
export default function FavoritesScreen() {
  const { user } = useAuth(); const [venues, setVenues] = useState<Venue[]>([]); const [loading, setLoading] = useState(false);
  const load = useCallback(async () => { if (!user) { setVenues([]); return; } setLoading(true); setVenues(await listFavorites(user.id).catch(() => [])); setLoading(false); }, [user]);
  useEffect(() => { void load(); }, [load]); useFocusEffect(useCallback(() => { void load(); }, [load]));
  return <Screen><ScrollView contentContainerStyle={styles.container}><BrandHeader /><Text style={styles.title}>Tes spots favoris.</Text><Text style={styles.subtitle}>Garde sous la main les adresses que tu veux retrouver rapidement.</Text>{!user ? <View style={{ marginTop: 20 }}><Button label="Se connecter" onPress={() => router.push('/auth')} /></View> : loading ? <ActivityIndicator color={colors.fuchsia} style={{ marginTop: 30 }} /> : venues.length ? <View style={{ gap: 10, marginTop: 20 }}>{venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}</View> : <Text style={styles.empty}>Tu n’as pas encore ajouté de favori.</Text>}</ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 120 }, title: { color: colors.ivory, fontWeight: '900', fontSize: 31, marginTop: 8 }, subtitle: { color: colors.muted, lineHeight: 20, marginTop: 7 }, empty: { color: colors.muted, marginTop: 28, textAlign: 'center' } });
