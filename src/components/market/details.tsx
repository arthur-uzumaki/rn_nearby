import { Text, View } from 'react-native'
import { Info } from './info'
import { IconPhone, IconMapPin, IconTicket } from '@tabler/icons-react-native'

interface DetailsProps {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

interface Props {
  data: DetailsProps
}

export function Details({ data }: Props) {
  return (
    <View className="rounded-tl-[20px] rounded-tr-[20px] bg-gray-100 p-8 pb-0">
      <Text className="font-bold text-gray-600 text-xl">{data.name}</Text>
      <Text className="mt-3 mb-8 font-regular text-base text-gray-500 leading-5">
        {data.description}
      </Text>

      <View className=" mb-4 w-full border-b-[1px] border-b-gray-200 pb-4">
        <Text className=" mb-3 font-medium text-gray-500 text-sm">
          Informações
        </Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />

        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View className="mb-4 w-full border-b-[1px] border-b-gray-200 pb-4">
        <Text className="mb-3 font-medium text-gray-500 text-sm">
          Regulamento
        </Text>
        {data.rules.map(item => (
          <Text key={item.id}>{`\u2022 ${item.description}`}</Text>
        ))}
      </View>
    </View>
  )
}
