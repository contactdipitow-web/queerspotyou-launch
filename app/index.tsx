import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

type Venue = {
  id: string
  name: string
  city: string
  address_line: string
}

const SUPABASE_URL = 'https://cfyoruzazaorkalugske.supabase.co'
const SUPABASE_KEY = 'sb_publishable_SgWlcD44r3c27clUrgGT0Q_DLGmiVyG'

async function loadVenues(): Promise<Venue[]> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/published_venues?select=id,name,city,address_line&order=published_at.desc&limit=20`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Supabase ${response.status}`)
  }

  return (await response.json()) as Venue[]
}

export default function HomeScreen() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    loadVenues()
      .then(setVenues)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>QSY</Text>
          </View>
          <Text style={styles.kicker}>QUEERSPOT YOU</Text>
          <Text style={styles.title}>Les spots qui nous ressemblent.</Text>
          <Text style={styles.subtitle}>
            Découvre des lieux queer, queer-owned et queer-friendly sélectionnés par la communauté.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spots récents</Text>
          <Pressable onPress={() => Linking.openURL('https://queerspotyou.com')}>
            <Text style={styles.link}>Voir le site</Text>
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.state}>
            <ActivityIndicator />
            <Text style={styles.stateText}>Chargement des spots…</Text>
          </View>
        ) : error ? (
          <View style={styles.state}>
            <Text style={styles.stateTitle}>Connexion indisponible</Text>
            <Text style={styles.stateText}>Le shell iOS fonctionne. Réessaie plus tard pour charger les spots.</Text>
          </View>
        ) : venues.length === 0 ? (
          <View style={styles.state}>
            <Text style={styles.stateTitle}>Aucun spot publié</Text>
            <Text style={styles.stateText}>Les prochains spots apparaîtront ici.</Text>
          </View>
        ) : (
          venues.map((venue) => (
            <View key={venue.id} style={styles.card}>
              <Text style={styles.cardTitle}>{venue.name}</Text>
              <Text style={styles.cardMeta}>{venue.city}</Text>
              <Text style={styles.cardAddress}>{venue.address_line}</Text>
            </View>
          ))
        )}

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Projet communautaire indépendant</Text>
          <Text style={styles.footerText}>
            Cette première version iOS sécurise le lancement Expo avant l’ajout des fonctions natives avancées.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F4ED',
  },
  container: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#17131F',
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 34,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF4FA3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  kicker: {
    color: '#C7FF4A',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '900',
    marginTop: 10,
  },
  subtitle: {
    color: '#E7DFEA',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 14,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#17131F',
  },
  link: {
    color: '#7C3AED',
    fontWeight: '800',
  },
  card: {
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5DFE8',
  },
  cardTitle: {
    color: '#17131F',
    fontSize: 19,
    fontWeight: '900',
  },
  cardMeta: {
    color: '#7C3AED',
    fontWeight: '800',
    marginTop: 5,
  },
  cardAddress: {
    color: '#645C69',
    marginTop: 5,
    lineHeight: 20,
  },
  state: {
    marginHorizontal: 24,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: 10,
  },
  stateTitle: {
    color: '#17131F',
    fontWeight: '900',
    fontSize: 18,
  },
  stateText: {
    color: '#645C69',
    lineHeight: 21,
    textAlign: 'center',
  },
  footerCard: {
    margin: 24,
    marginTop: 28,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#17131F',
  },
  footerTitle: {
    color: '#C7FF4A',
    fontWeight: '900',
    fontSize: 16,
  },
  footerText: {
    color: '#E7DFEA',
    marginTop: 8,
    lineHeight: 21,
  },
})
