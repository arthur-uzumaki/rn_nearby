import { Text, View } from 'react-native'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

interface CouponProps {
  code: string
}

export function Coupon({ code }: CouponProps) {
  return (
    <View className="px-8 ">
      <Text className="mb-3 font-medium text-gray-500 text-sm">
        Utilize esse cupom
      </Text>
      <View className="flex-row items-center gap-[10] rounded-lg bg-green-100 px-2 py-[10px]">
        <IconTicket size={24} color={colors.green[200]} />
        <Text className="font-semiBold text-base text-gray-600 uppercase ">
          {code}
        </Text>
      </View>
    </View>
  )
}
