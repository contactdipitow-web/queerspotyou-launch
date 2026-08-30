import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Input, Screen } from '@/components/ui';
import { BrandHeader } from '@/components/BrandHeader';
import { supabase } from '@/lib/supabase';
import { colors } from '@/theme';
export default function AuthScreen() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false);
  const signIn = async () => { setLoading(true); const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password }); setLoading(false); if (error) Alert.alert('Connexion impossible', error.message); else router.replace('/(tabs)/profile'); };
  const signUp = async () => { setLoading(true); const { error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: 'queerspotyou://auth-callback' } }); setLoading(false); if (error) Alert.alert('Inscription impossible', error.message); else Alert.alert('Compte créé', 'Vérifie ton e-mail si une confirmation est demandée.'); };
  const reset = async () => { if (!email.trim()) return Alert.alert('E-mail requis', 'Entre ton adresse e-mail.'); const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: 'queerspotyou://reset-password' }); Alert.alert(error ? 'Erreur' : 'E-mail envoyé', error?.message ?? 'Consulte ta boîte mail pour réinitialiser ton mot de passe.'); };
  return <Screen><ScrollView contentContainerStyle={styles.container}><BrandHeader /><Text style={styles.title}>Bienvenue dans la communauté.</Text><Text style={styles.subtitle}>Un seul compte pour enregistrer tes favoris, ajouter des spots et suivre tes contributions.</Text><View style={{ gap: 10, marginTop: 20 }}><Input autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="E-mail" /><Input secureTextEntry value={password} onChangeText={setPassword} placeholder="Mot de passe" /><Button label={loading ? 'Connexion…' : 'Se connecter'} disabled={loading} onPress={() => void signIn()} /><Button label="Créer un compte" variant="secondary" disabled={loading} onPress={() => void signUp()} /><Button label="Mot de passe oublié" variant="secondary" onPress={() => void reset()} /></View></ScrollView></Screen>;
}
const styles = StyleSheet.create({ container: { padding: 18, paddingBottom: 80 }, title: { color: colors.ivory, fontSize: 31, lineHeight: 34, fontWeight: '900', marginTop: 18 }, subtitle: { color: colors.muted, marginTop: 8, lineHeight: 20 } });
