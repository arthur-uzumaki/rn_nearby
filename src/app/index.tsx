import { Header } from '@/components/header'
import { Steps } from '@/components/steps'
import { Text, View } from 'react-native'
export default function Home() {
  return (
    <View className="flex-1 gap-10 p-10 ">
      <Header />

      <Steps />
    </View>
  )
}
