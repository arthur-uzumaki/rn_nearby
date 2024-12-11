import { colors } from '@/styles/colors'
import { categoriesIcons } from '@/utils/categories-icons'
import clsx from 'clsx'
import { Pressable, type PressableProps, Text } from 'react-native'

interface CategoryProps extends PressableProps {
  name: string
  iconId: string
  isSelected?: boolean
}

export function Category({
  name,
  iconId,
  isSelected = false,
  ...rest
}: CategoryProps) {
  const Icon = categoriesIcons[iconId]

  return (
    <Pressable
      className={clsx(
        'h-9 flex-row items-center justify-center gap-[10px] rounded-lg border border-gray-300 bg-gray-100 px-3 ',
        {
          'border-gray-300 bg-gray-100': !isSelected,
          'border-green-500 bg-green-300': isSelected,
        }
      )}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text
        className={clsx('font-regular text-sm ', {
          'text-gray-100': isSelected,
          'text-gray-500': !isSelected,
        })}
      >
        {name}
      </Text>
    </Pressable>
  )
}
