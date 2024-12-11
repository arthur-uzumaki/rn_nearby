import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native'
import { colors } from '@/styles/colors'
import { IconTicket } from '@tabler/icons-react-native'

export interface PlaceProps {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

interface Props extends TouchableOpacityProps {
  data: PlaceProps
}

export function Place({ data, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="h-[120px] w-full flex-row items-center gap-4 rounded-xl border-[1px] border-gray-200 p-2"
      {...rest}
    >
      <Image
        className="h-[104] w-[116] rounded-lg bg-gray-200"
        source={{ uri: data.cover }}
      />

      <View className="flex-1 gap-1">
        <Text className="font-medium text-gray-600 text-sm">{data.name}</Text>

        <Text className="font-regular text-gray-500 text-xs" numberOfLines={2}>
          {data.description}
        </Text>

        <View className="mt-2.5 flex-row gap-1.5">
          <IconTicket size={16} color={colors.red[400]} />
          <Text className="font-regular text-g text-xs ">
            {data.coupons} cupons disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
