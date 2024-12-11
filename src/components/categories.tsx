import { FlatList } from 'react-native'
import { Category } from './category'

interface CategoriesProps {
  id: string
  name: string
}

interface Props {
  data: CategoriesProps[]
  selected?: string
  onSelect: (id: string) => void
}

export function Categories({ data, onSelect, selected }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === selected}
        />
      )}
      horizontal
      className="absolute top-16 z-10 max-h-9"
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-6"
    />
  )
}
