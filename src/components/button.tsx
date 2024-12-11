import { twMerge } from 'tailwind-merge'
import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

import type { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

function Button({
  children,
  className,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={twMerge(
        'flex-row items-center justify-center gap-[14px] rounded-xl bg-green-300 px-6 py-5',
        className
      )}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-gray-100" size={'small'} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title({ children, ...rest }: TextProps) {
  return (
    <Text className="font-semiBold text-base text-gray-100" {...rest}>
      {children}
    </Text>
  )
}

interface IconProps {
  icon: React.ComponentType<TablerIconProps>
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
