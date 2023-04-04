import useSWR from 'swr'

import {client} from '@/common/api'

import {IFormInput} from '../types'
import {Params} from './types'

const BASE_URL = (path = '', queryParams: any = null) =>
  `https://zksx0lbaai.execute-api.us-east-1.amazonaws.com/default/FormsAPIPOC-Mailchimp/${path}${
    queryParams ? '?' + new URLSearchParams(queryParams).toString() : ''
  }`

export const useForms = (params: Params) => {
  const {data, error, isLoading} = useSWR(BASE_URL(params.digest))

  const addOrUpdate = async (form: IFormInput, token: string, digest = '') =>
    await client.post(BASE_URL(digest), {
      ...form,
      Email: form.email,
      interests: form.interests,
      token,
    })

  const getEmailToken = async (email: string) =>
    (await client.get(BASE_URL('token', {email})))?.data

  return {data, error, isLoading, addOrUpdate, getEmailToken}
}
