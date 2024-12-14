import { useRef, useState } from 'react'
import { View, Modal, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { useCameraPermissions, CameraView } from 'expo-camera'

import { IconScan } from '@tabler/icons-react-native'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMarketDetails } from '@/http/fetch-market-details'

import { Loading } from '@/components/loading'
import { Cover } from '@/components/market/cover'
import { Details } from '@/components/market/details'
import { Coupon } from '@/components/market/coupon'
import { Button } from '@/components/button'
import { ScrollView } from 'react-native'
import { fetchCoupon } from '@/http/fetch-coupon'

export default function Market() {
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(null)
  const queClient = useQueryClient()

  const [_, requestPermission] = useCameraPermissions()

  const params = useLocalSearchParams<{ id: string }>()

  console.log(params.id)

  const qrLock = useRef(false)

  const { data: market, isLoading } = useQuery({
    queryKey: ['market'],
    queryFn: () => fetchMarketDetails(params.id),
    staleTime: 60 * 3,
  })

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()
      if (!granted) {
        qrLock.current = false
        return Alert.alert('Câmera', 'Você precisa habilitar o uso da câmera')
      }
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert('Câmera', 'Não foi possível utilizar a câmera ')
    }
  }

  const { mutateAsync: applyCoupon } = useMutation({
    mutationFn: (id: string) => fetchCoupon(id),
    onSuccess: data => {
      if (data.coupon) {
        setCoupon(data.coupon)
      }
      queClient.invalidateQueries({ queryKey: ['market'] })
    },
  })

  function handleUserCoupon(id: string) {
    setIsVisibleCameraModal(false)
    Alert.alert(
      'Coupon',
      'Não é possível reutilizar resgatado. Deja realmente o cupom?',
      [
        { style: 'cancel', text: 'Não' },
        { text: 'Sim', onPress: () => applyCoupon(id) },
      ]
    )
  }

  if (isLoading || !market) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href={'/home'} />
  }

  return (
    <View className="flex-1 ">
      <StatusBar style="light" backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View className="p-8">
        <Button onPress={handleOpenCamera}>
          <Button.Icon icon={IconScan} />
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal className="flex-1" visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUserCoupon(data), 500)
            }
          }}
        />

        <View className="absolute right-8 bottom-8 left-8">
          <Button onPress={() => setIsVisibleCameraModal(false)}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
