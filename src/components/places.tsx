import { useRef } from 'react'

import { Text, useWindowDimensions } from 'react-native'
import { type PlaceProps, Place } from './place'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { colors } from '@/styles/colors'
import { router } from 'expo-router'

interface PlacesProps {
  data: PlaceProps[]
}

export function Places({ data }: PlacesProps) {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={{
        width: 80,
        height: 4,
        backgroundColor: colors.gray[300],
      }}
      backgroundStyle={{ backgroundColor: colors.gray[100] }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerClassName={'gap-2 p-6 pb-[100px]'}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        ListHeaderComponent={() => (
          <Text className="mb-4 font-regular text-base text-gray-600">
            Explore locais perto de você
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
