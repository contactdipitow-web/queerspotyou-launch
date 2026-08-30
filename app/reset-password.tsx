import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Input, Screen } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { colors } from '@/theme';
export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const save = async () => { if (password.length < 8) return Alert.alert('Mot de passe trop court', 'Utilise au moins 8 caractères.'); const { error } = await supabase.auth.updateUser({ password }); if (error) Alert.alert('Erreur', error.message); else { Alert.alert('Mot de passe modifié'); router.replace('/(tabs)/profile'); } };
  return <Screen><View style={styles.container}><Text style={styles.title}>Nouveau mot de passe</Text><Input secureTextEntry value={password} onChangeText={setPassword} placeholder="8 caractères minimum" /><Button label="Enregistrer" onPress={() => void save()} /></View></Screen>;
}
const styles = StyleSheet.create({ container: { padding: 18, gap: 14 }, title: { color: colors.ivory, fontWeight: '900', fontSize: 28 } });
