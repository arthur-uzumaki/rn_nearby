import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Steps } from '@/components/steps'
import { View } from 'react-native'
export default function Home() {
  return (
    <View className="flex-1 gap-10 p-10 ">
      <Header />

      <Steps />

      <Button>
        <Button.Title>Começa</Button.Title>
      </Button>
    </View>
  )
}
