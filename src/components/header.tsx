import { Image, Text, View } from 'react-native'

export function Header() {
  return (
    <View className="mt-16">
      <Image
        className="mb-7 h-12 w-12"
        source={require('@/assets/logo.png')}
        alt="Logo nearby"
      />
      <Text className="font-bold text-2xl text-gray-600 ">
        Boas vindas ao Nearby!
      </Text>
      <Text className="mt-3 font-regular text-base text-gray-500 ">
        Tenha cupons de vantagem para usar em {'\n'}
        seus estabelecimentos favoritos.
      </Text>
    </View>
  )
}
