import { Text, View } from 'react-native'
import { Step } from './step'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'

export function Steps() {
  return (
    <View className="flex-1 gap-6">
      <Text className="font-regular text-base text-gray-500">
        Veja como funciona:
      </Text>

      <Step
        icon={IconMapPin}
        title="Encontre estabelecimentos"
        description={'Veja locais perto de você que são \n parceiros Nearby'}
      />

      <Step
        icon={IconQrcode}
        title="Ative o cupom com QR Code"
        description={
          'Escaneie o código no estabelecimento \n para usar o benefício'
        }
      />

      <Step
        icon={IconTicket}
        title="Garanta vantagens perto de você"
        description={
          'Ative cupons onde estiver, em \n diferentes tipos de estabelecimento '
        }
      />
    </View>
  )
}
