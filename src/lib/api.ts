// src/lib/api.ts
import axios from 'axios'

const BASE = 'https://www.alphavantage.co/query'

export async function fetchAlphaVantage(params: Record<string, string | number>) {
  const apikey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY
  if (!apikey) throw new Error('Missing API key: NEXT_PUBLIC_ALPHA_VANTAGE_KEY')
  const q = new URLSearchParams({ ...params, apikey: apikey as string })
  const url = `${BASE}?${q.toString()}`
  const res = await axios.get(url)
  return res.data
}
