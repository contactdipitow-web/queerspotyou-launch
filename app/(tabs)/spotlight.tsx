import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BrandHeader } from '@/components/BrandHeader';
import { Button, Screen } from '@/components/ui';
import { listSpotlight } from '@/services/spotlight';
import type { SpotlightItem } from '@/types';
import { colors, radius } from '@/theme';
export default function SpotlightScreen() {
  const [items, setItems] = useState<SpotlightItem[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => { setLoading(true); setItems(await listSpotlight().catch(() => [])); setLoading(false); }, []);
  useEffect(() => { void load(); }, [load]);
  return <Screen><ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.fuchsia} />} contentContainerStyle={styles.container}>
    <BrandHeader /><Text style={styles.kicker}>À LA UNE</Text><Text style={styles.title}>Ce qui fait bouger notre écosystème.</Text><Text style={styles.subtitle}>Événements, partenaires, collaborations et spots sélectionnés par l’équipe.</Text>
    {loading && !items.length ? <ActivityIndicator color={colors.fuchsia} /> : <View style={{ gap: 14, marginTop: 18 }}>{items.map((item, index) => <View key={item.id} style={[styles.card, item.is_priority && styles.priority]}>
      {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.image} /> : <View style={[styles.image, styles.placeholder]}><Text style={{ fontSize: 34 }}>{item.kind === 'event' ? '✦' : item.kind === 'partner' ? '↗' : '♥'}</Text></View>}
      <View style={{ padding: 16 }}><Text style={styles.eyebrow}>{item.eyebrow ?? (item.kind === 'event' ? 'ÉVÉNEMENT' : item.kind === 'partner' ? 'PARTENAIRE' : 'SÉLECTION')}</Text><Text style={styles.cardTitle}>{item.title}</Text>{item.partner_name && <Text style={styles.partner}>{item.partner_name}</Text>}{item.summary && <Text style={styles.summary}>{item.summary}</Text>}{item.is_sponsored && <Text style={styles.sponsored}>Contenu partenaire</Text>}{item.link_url && <View style={{ marginTop: 14 }}><Button label={item.cta_label ?? 'Découvrir'} onPress={() => void Linking.openURL(item.link_url!)} variant={index === 0 ? 'primary' : 'secondary'} /></View>}</View>
    </View>)}</View>}
  </ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 120 }, kicker: { color: colors.mint, fontWeight: '900', letterSpacing: 2, marginTop: 4 }, title: { color: colors.ivory, fontWeight: '900', fontSize: 31, lineHeight: 34, marginTop: 8 }, subtitle: { color: colors.muted, lineHeight: 20, marginTop: 8 }, card: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.line }, priority: { borderColor: colors.fuchsia, borderWidth: 1.5 }, image: { width: '100%', height: 154 }, placeholder: { backgroundColor: colors.panel2, alignItems: 'center', justifyContent: 'center' }, eyebrow: { color: colors.lime, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }, cardTitle: { color: colors.ivory, fontSize: 23, lineHeight: 26, fontWeight: '900', marginTop: 6 }, partner: { color: colors.fuchsia, fontWeight: '900', marginTop: 5 }, summary: { color: colors.muted, lineHeight: 20, marginTop: 9 }, sponsored: { color: colors.mint, fontSize: 11, marginTop: 8, fontWeight: '800' } });
