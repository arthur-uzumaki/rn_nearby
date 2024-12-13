import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Redirect, useLocalSearchParams } from 'expo-router'

import { useQuery } from '@tanstack/react-query'
import { fetchMarketDetails } from '@/http/fetch-market-details'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  const { data: market, isLoading } = useQuery({
    queryKey: ['market'],
    queryFn: () => fetchMarketDetails(params.id),
    staleTime: 60 * 3,
  })

  if (isLoading || !market) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href={'/home'} />
  }

  return (
    <View className="flex-1 ">
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Cover uri={market.cover} />
      <Details data={market} />
      <Coupon code="fssfsdds" />
    </View>
  )
}
