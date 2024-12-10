import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import '@/styles/global.css'
import { colors } from '@/styles/colors'

import {
  useFonts,
  Rubik_700Bold,
  Rubik_500Medium,
  Rubik_400Regular,
  Rubik_600SemiBold,
} from '@expo-google-fonts/rubik'

import { Loading } from '@/components/loading'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Rubik_700Bold,
    Rubik_500Medium,
    Rubik_400Regular,
    Rubik_600SemiBold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[100] },
        }}
      />
      <StatusBar style="dark" />
    </>
  )
}
