import { useEffect, useState } from 'react'
import { View, Alert, Text } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { router } from 'expo-router'

import { api } from '@/lib/axios'

import { Places } from '@/components/places'
import type { PlaceProps } from '@/components/place'
import { Categories, type CategoriesProps } from '@/components/categories'

type MarketsProps = PlaceProps & {
  latitude: number
  longitude: number
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps[]>([])
  const [category, setCategory] = useState('')
  const [markets, setMarkets] = useState<MarketsProps[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get(`/markets/category/${category}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais.')
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const location = await Location.getCurrentPositionAsync()
        console.log(location)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchCategories()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: '#CECECE' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

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

        {markets.map(item => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
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
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
