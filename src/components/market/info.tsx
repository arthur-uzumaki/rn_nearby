import { Text, View } from 'react-native'
import type { IconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

interface InfoProps {
  description: string
  icon: React.ComponentType<IconProps>
}

export function Info({ description, icon: Icon }: InfoProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Icon size={16} color={colors.gray[400]} />
      <Text className="flex-1 font-regular text-gray-500 text-sm leading-5">
        {description}
      </Text>
    </View>
  )
}
