import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BrandHeader } from '@/components/BrandHeader';
import { Button, Card, Screen } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { getCoinBalance } from '@/services/account';
import { colors, radius } from '@/theme';
export default function ProfileScreen() {
  const { user, role, signOut } = useAuth(); const [coins, setCoins] = useState({ balance: 0, lifetimeEarned: 0 });
  useEffect(() => { if (user) void getCoinBalance(user.id).then(setCoins).catch(() => setCoins({ balance: 0, lifetimeEarned: 0 })); }, [user]);
  return <Screen><ScrollView contentContainerStyle={styles.container}><BrandHeader /><Text style={styles.title}>Ton espace QSY.</Text>{user ? <><Card><Text style={styles.email}>{user.email}</Text><Text style={styles.role}>Rôle : {role === 'admin' ? 'Administrateur' : role === 'moderator' ? 'Modérateur' : 'Membre'}</Text></Card><View style={styles.coinCard}><Text style={styles.coinLabel}>COINS</Text><Text style={styles.coinValue}>{coins.balance}</Text><Text style={styles.coinSub}>Gagnés depuis ton arrivée : {coins.lifetimeEarned}</Text><Text style={styles.coinHelp}>Même logique communautaire que BlackSpot You : 25 coins pour un lieu validé et 10 pour une contribution validée.</Text></View>{(role === 'admin' || role === 'moderator') && <Button label={role === 'admin' ? 'Ouvrir l’administration' : 'Ouvrir la modération'} onPress={() => router.push('/admin')} />}<Button label="Se déconnecter" onPress={() => void signOut()} variant="secondary" /></> : <><Text style={styles.subtitle}>Connecte-toi pour gérer tes favoris, tes contributions et tes coins.</Text><Button label="Connexion / inscription" onPress={() => router.push('/auth')} /></>}</ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 120, gap: 14 }, title: { color: colors.ivory, fontSize: 31, fontWeight: '900', marginVertical: 8 }, subtitle: { color: colors.muted, lineHeight: 20, marginBottom: 6 }, email: { color: colors.ivory, fontWeight: '900', fontSize: 18 }, role: { color: colors.mint, marginTop: 5, fontWeight: '800' }, coinCard: { borderRadius: radius.lg, padding: 18, backgroundColor: colors.purple }, coinLabel: { color: colors.lime, letterSpacing: 2, fontWeight: '900' }, coinValue: { color: colors.white, fontWeight: '900', fontSize: 48, marginTop: 4 }, coinSub: { color: '#EEE8FF', fontWeight: '800' }, coinHelp: { color: '#D9D0F1', lineHeight: 18, marginTop: 8, fontSize: 12 } });
