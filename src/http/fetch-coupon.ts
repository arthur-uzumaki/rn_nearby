import { api } from '@/lib/axios'
import { Alert } from 'react-native'

export async function fetchCoupon(id: string) {
  try {
    const { data } = await api.patch(`/coupons/${id}`)
    Alert.alert('Cupom', data.coupon)
    return data
  } catch (error) {
    console.log(error)

    Alert.alert('Erro', 'Não foi possível utilizar o cupom')
  }
}
