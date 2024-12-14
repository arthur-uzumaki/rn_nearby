import { api } from '@/lib/axios'
import { Alert } from 'react-native'

export interface FetchCategoriesResponse {
  id: string
  name: string
}

export async function fetchCategories() {
  try {
    const response = await api.get<FetchCategoriesResponse[]>('/categories')
    const data = response.data
    return data
  } catch (error) {
    Alert.alert('Categorias', 'Não foi possível carrega as categorias')
  }
}
