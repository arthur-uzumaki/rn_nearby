import { api } from '@/lib/axios'
import { router } from 'expo-router'
import { Alert } from 'react-native'

interface FetchMarketDetails {
  id: string
  name: string
  description: string
  coupons: number
  latitude: number
  longitude: number
  address: string
  phone: string
  cover: string
  categoryId: string
  rules: {
    id: string
    description: string
    marketId: string
  }[]
}

export async function fetchMarketDetails(marketId: string) {
  try {
    const { data } = await api.get<FetchMarketDetails>(`/markets/${marketId}`)
    return data
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível carregar os dados', [
      { text: 'Ok', onPress: () => router.back() },
    ])
  }
}
