import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/contexts/AuthContext';
import { colors } from '@/theme';
export default function RootLayout() { return <SafeAreaProvider><AuthProvider><StatusBar style="light" /><Stack screenOptions={{ headerStyle: { backgroundColor: colors.night }, headerTintColor: colors.ivory, contentStyle: { backgroundColor: colors.night } }}><Stack.Screen name="index" options={{ headerShown: false }} /><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="auth" options={{ title: 'Connexion' }} /><Stack.Screen name="reset-password" options={{ title: 'Nouveau mot de passe' }} /><Stack.Screen name="admin" options={{ title: 'Administration' }} /><Stack.Screen name="place/[id]" options={{ title: 'Le spot' }} /><Stack.Screen name="report/[id]" options={{ title: 'Signaler' }} /></Stack></AuthProvider></SafeAreaProvider>; }
