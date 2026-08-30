import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme';
export function BrandHeader({ compact = false }: { compact?: boolean }) { return <View style={[styles.row, compact && { paddingVertical: 8 }]}><Image source={require('../../assets/icon.png')} style={styles.logo} /><View><Text style={styles.name}>QUEERSPOT YOU</Text>{!compact && <Text style={styles.tagline}>Notre communauté. Nos spots.</Text>}</View></View>; }
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 }, logo: { width: 42, height: 42, borderRadius: 12 }, name: { color: colors.ivory, fontWeight: '900', fontSize: 17, letterSpacing: 0.7 }, tagline: { color: colors.mint, marginTop: 2, fontWeight: '700', fontSize: 12 } });
