import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Categories } from '@/components/categories'
import { Loading } from '@/components/loading'
import { fetchCategories } from '@/http/fetch-categories'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const [category, setCategory] = useState('')

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  if (isLoading || !categories) {
    return <Loading />
  }

  useEffect(() => {
    if (categories?.length > 0) {
      setCategory(categories[0].id)
    }
  }, [categories])

  return (
    <View className="flex-1 pt-10">
      {categories.length > 0 && (
        <Categories
          data={categories}
          selected={category}
          onSelect={setCategory}
        />
      )}
    </View>
  )
}
