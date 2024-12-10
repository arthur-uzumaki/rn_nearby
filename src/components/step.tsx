import { Text, View } from 'react-native'
import type { IconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

interface StepProps {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}

export function Step({ description, title, icon: Icon }: StepProps) {
  return (
    <View className="w-full flex-row gap-4">
      {Icon && <Icon size={32} color={colors.red[400]} />}
      <View className="">
        <Text className="font-semiBold text-base text-gray-600">{title}</Text>
        <Text className="mt-1 font-regular text-gray-500 text-sm">
          {description}
        </Text>
      </View>
    </View>
  )
}
