import { Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <View className="flex-1">
      <Text>{params.id}</Text>
    </View>
  )
}
