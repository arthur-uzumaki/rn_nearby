import { ImageBackground, View } from 'react-native'
import { IconArrowLeft } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { Button } from '@/components/button'

interface CoverProps {
  uri: string
}

export function Cover({ uri }: CoverProps) {
  return (
    <ImageBackground
      className="-mb-8 h-[232px] w-full bg-gray-200"
      source={{ uri }}
      alt="cover"
    >
      <View className="p-6 pt-14">
        <Button className="h-10 w-10" onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}
