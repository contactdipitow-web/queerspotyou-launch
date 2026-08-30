import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button, Input, Pill, Screen } from '@/components/ui';
import { submitVenueReport } from '@/services/reports';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/theme';
const reasons = [['inaccurate_information', 'Infos incorrectes'], ['closed_or_moved', 'Fermé / déplacé'], ['unsafe_environment', 'Sécurité'], ['discrimination', 'Discrimination'], ['harassment', 'Harcèlement'], ['privacy', 'Vie privée'], ['other', 'Autre']] as const;
export default function ReportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); const { user } = useAuth(); const [reason, setReason] = useState<string>('other'); const [details, setDetails] = useState(''); const [sending, setSending] = useState(false);
  const submit = async () => { if (!user) { router.push('/auth'); return; } if (!id) return; setSending(true); try { await submitVenueReport(id, details, reason); Alert.alert('Signalement envoyé', 'Il reste confidentiel et sera examiné par la modération.'); router.back(); } catch (error: any) { Alert.alert('Erreur', error?.message ?? 'Envoi impossible.'); } finally { setSending(false); } };
  return <Screen><ScrollView contentContainerStyle={styles.container}><Text style={styles.title}>Signaler ce spot</Text><Text style={styles.subtitle}>Les signalements graves restent privés. Ils ne sont jamais publiés automatiquement.</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 12 }}>{reasons.map(([value, label]) => <Pill key={value} label={label} active={reason === value} onPress={() => setReason(value)} />)}</ScrollView><Input multiline value={details} onChangeText={setDetails} placeholder="Décris précisément le problème sans citer inutilement des personnes identifiables." /><Button label={sending ? 'Envoi…' : user ? 'Envoyer le signalement' : 'Se connecter pour signaler'} disabled={sending} onPress={() => void submit()} /></ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { padding: 18, paddingBottom: 80 }, title: { color: colors.ivory, fontWeight: '900', fontSize: 30 }, subtitle: { color: colors.muted, lineHeight: 20, marginTop: 8, marginBottom: 8 } });
