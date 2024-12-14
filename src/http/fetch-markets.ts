import { api } from '@/lib/axios'
import { Alert } from 'react-native'

interface FetchMarketsResponse {
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
}

export async function fetchMarkets(marketId: string) {
  try {
    if (!marketId) {
      return
    }

    const { data } = await api.get<FetchMarketsResponse[]>(
      `/markets/category/${marketId}`
    )
    return data
  } catch (error) {
    Alert.alert('Locais', 'Não foi possível carrega os locais')
  }
}
