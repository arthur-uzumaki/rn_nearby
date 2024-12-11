import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { Categories } from '@/components/categories'
import { Loading } from '@/components/loading'

import { fetchMarkets } from '@/http/fetch-markets'
import { fetchCategories } from '@/http/fetch-categories'
import { Places } from '@/components/places'

export default function Home() {
  const [category, setCategory] = useState('')

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 60 * 3,
  })

  const { data: markets, isLoading: isLoadingMarkets } = useQuery({
    queryKey: ['markets', category],
    queryFn: () => fetchMarkets(category),
    enabled: !!category,
    staleTime: 60 * 3,
  })

  useEffect(() => {
    if (categories && categories?.length > 0) {
      setCategory(categories[0].id)
    }
  }, [categories])

  if (isLoadingCategories || !categories) {
    return <Loading />
  }

  if (isLoadingMarkets || !markets) {
    return <Loading />
  }

  return (
    <View className="flex-1 pt-10">
      {categories.length > 0 && (
        <Categories
          data={categories}
          selected={category}
          onSelect={setCategory}
        />
      )}

      {markets.length > 0 && <Places data={markets} />}
    </View>
  )
}
