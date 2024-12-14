import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import MapView, { Marker, Callout } from 'react-native-maps'
import * as Location from 'expo-location'

import { useQuery } from '@tanstack/react-query'

import { Categories } from '@/components/categories'
import { Loading } from '@/components/loading'

import { fetchMarkets } from '@/http/fetch-markets'
import { fetchCategories } from '@/http/fetch-categories'
import { Places } from '@/components/places'

import { router } from 'expo-router'

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [category, setCategory] = useState('')

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (granted) {
        const location = await Location.getCurrentPositionAsync()
      }
    } catch (error) {
      console.error(error)
    }
  }

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
    <View className="flex-1 ">
      {categories.length > 0 && (
        <Categories
          data={categories}
          selected={category}
          onSelect={setCategory}
        />
      )}

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />

        {markets.map(item => {
          return (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude || currentLocation.latitude,
                longitude: item.longitude || currentLocation.longitude,
              }}
              image={require('@/assets/pin.png')}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                <View>
                  <Text className="font-medium text-gray-600 text-sm">
                    {item.name}
                  </Text>

                  <Text className="font-regular text-gray-600 text-xs">
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      {markets.length > 0 && <Places data={markets} />}
    </View>
  )
}
