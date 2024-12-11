import { View } from 'react-native'
import { router } from 'expo-router'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Steps } from '@/components/steps'

export default function Index() {
  return (
    <View className="flex-1 gap-10 p-10 ">
      <Header />

      <Steps />

      <Button onPress={() => router.navigate('/home')}>
        <Button.Title>Começa</Button.Title>
      </Button>
    </View>
  )
}
