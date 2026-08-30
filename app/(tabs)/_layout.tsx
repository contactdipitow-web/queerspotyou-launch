import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '@/theme';
const Icon = ({ value }: { value: string }) => <Text style={{ fontSize: 20 }}>{value}</Text>;
export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.fuchsia, tabBarInactiveTintColor: colors.muted, tabBarStyle: { height: 84, paddingTop: 7, backgroundColor: colors.panel, borderTopColor: colors.line } }}>
    <Tabs.Screen name="index" options={{ title: 'Explorer', tabBarIcon: () => <Icon value="⌕" /> }} />
    <Tabs.Screen name="spotlight" options={{ title: 'À la une', tabBarIcon: () => <Icon value="✦" /> }} />
    <Tabs.Screen name="add" options={{ title: 'Ajouter', tabBarIcon: () => <Icon value="＋" /> }} />
    <Tabs.Screen name="favorites" options={{ title: 'Favoris', tabBarIcon: () => <Icon value="♥" /> }} />
    <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: () => <Icon value="●" /> }} />
  </Tabs>;
}
