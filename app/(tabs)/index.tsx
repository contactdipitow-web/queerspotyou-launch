import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { BrandHeader } from '@/components/BrandHeader';
import { Input, Pill, Screen } from '@/components/ui';
import { VenueCard } from '@/components/VenueCard';
import { listCategories, listNearby, listVenues } from '@/services/venues';
import type { Category, Venue } from '@/types';
import { colors, radius } from '@/theme';
const faces = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
];
export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [nearby, setNearby] = useState<Venue[]>([]);
  const [mode, setMode] = useState<'list' | 'map'>('list');
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  useEffect(() => { void listCategories().then(setCategories).catch(() => setCategories([])); }, []);
  useEffect(() => { setLoading(true); void listVenues({ query, categoryId }).then(setVenues).catch(() => setVenues([])).finally(() => setLoading(false)); }, [query, categoryId]);
  useEffect(() => { void (async () => { const permission = await Location.requestForegroundPermissionsAsync(); if (permission.status !== 'granted') return; const current = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }); const next = { latitude: current.coords.latitude, longitude: current.coords.longitude }; setCoords(next); setNearby(await listNearby(next.latitude, next.longitude, 500).catch(() => [])); })(); }, []);
  const mapVenues = useMemo(() => (nearby.length ? nearby : venues).filter((v) => Number.isFinite(v.latitude) && Number.isFinite(v.longitude)), [nearby, venues]);
  const first = mapVenues[0];
  const region = coords ?? (first ? { latitude: first.latitude, longitude: first.longitude } : { latitude: 48.8566, longitude: 2.3522 });
  return <Screen><ScrollView contentContainerStyle={styles.container}>
    <BrandHeader />
    <View style={styles.hero}><View style={{ flex: 1 }}><Text style={styles.kicker}>PARIS · COMMUNAUTÉ</Text><Text style={styles.title}>Trouve les lieux où tu peux vraiment être toi.</Text><Text style={styles.subtitle}>Des spots LGBTQIA+, queer-owned vérifiés ou réellement queer-friendly, partagés par la communauté.</Text></View><View style={styles.faceStack}>{faces.map((uri, index) => <Image key={uri} source={{ uri }} style={[styles.face, { marginLeft: index ? -14 : 0, zIndex: 3 - index }]} />)}</View></View>
    {nearby.length > 0 && <View style={styles.nearbyBanner}><Text style={styles.nearbyTitle}>Autour de toi · 500 m</Text><Text style={styles.nearbyText}>{nearby.length} spot{nearby.length > 1 ? 's' : ''} trouvé{nearby.length > 1 ? 's' : ''} dans ton rayon immédiat.</Text></View>}
    <Input value={query} onChangeText={setQuery} placeholder="Nom, quartier, adresse…" />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 12 }}><Pill label="Tous" active={categoryId === null} onPress={() => setCategoryId(null)} />{categories.map((category) => <Pill key={category.id} label={category.label} active={categoryId === category.id} onPress={() => setCategoryId(category.id)} />)}</ScrollView>
    <View style={styles.switchRow}><Pill label="Liste" active={mode === 'list'} onPress={() => setMode('list')} /><Pill label="Carte" active={mode === 'map'} onPress={() => setMode('map')} /></View>
    {mode === 'map' ? <View style={styles.mapWrap}><MapView style={StyleSheet.absoluteFill} initialRegion={{ ...region, latitudeDelta: 0.035, longitudeDelta: 0.035 }} showsUserLocation={Boolean(coords)}>{mapVenues.map((venue) => <Marker key={venue.id} coordinate={{ latitude: venue.latitude, longitude: venue.longitude }} title={venue.name} description={venue.address_line} pinColor={colors.fuchsia} />)}</MapView></View> : loading ? <ActivityIndicator color={colors.fuchsia} style={{ marginTop: 30 }} /> : <View style={{ gap: 10 }}>{venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}</View>}
  </ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 120 }, hero: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, backgroundColor: colors.panel2, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.line, padding: 18, overflow: 'hidden' }, kicker: { color: colors.lime, fontWeight: '900', fontSize: 11, letterSpacing: 1.6 }, title: { color: colors.ivory, fontSize: 30, lineHeight: 33, fontWeight: '900', marginTop: 8 }, subtitle: { color: colors.muted, lineHeight: 20, marginTop: 10, maxWidth: 330 }, faceStack: { flexDirection: 'row', alignItems: 'center', paddingBottom: 4 }, face: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: colors.night }, nearbyBanner: { marginTop: 14, marginBottom: 12, borderRadius: radius.md, padding: 14, backgroundColor: colors.purple }, nearbyTitle: { color: colors.white, fontWeight: '900' }, nearbyText: { color: '#EEE8FF', marginTop: 3 }, switchRow: { flexDirection: 'row', marginBottom: 12 }, mapWrap: { height: 470, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.line } });
