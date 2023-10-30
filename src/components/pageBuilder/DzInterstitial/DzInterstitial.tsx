import {useRouter} from 'next/router'

import {DzInterstitial as DzInterstitialMolecule} from '@/components/wrappers/DzInterstitialWrapper'
import {DzInterstitialTypeProps} from '@/sanity/types'

import {dzInterstitialOverrides, interstitialMap} from './interstitialMapper'

type DzInterstitialProps = {
  data: any
  componentProps?: DzInterstitialTypeProps
}

export const DzInterstitial = ({
  data,
  componentProps,
}: DzInterstitialProps & {notContentDependant: boolean}) => {
  const router = useRouter()
  const {_type} = data ?? {}
  const mappedData = (interstitialMap?.[_type] ?? ((a: any) => ({data: a})))(data, componentProps)
  const overrideData = componentProps ? dzInterstitialOverrides(componentProps, router) : {}

  return <DzInterstitialMolecule {...{...mappedData, ...overrideData}} />
}

DzInterstitial.notContentDependant = true

export default DzInterstitial
