import { colors } from '@/styles/colors'
import { ActivityIndicator } from 'react-native'

export function Loading() {
  return (
    <ActivityIndicator
      className="flex-1 items-center justify-center bg-gray-100"
      color={colors.green[300]}
    />
  )
}
