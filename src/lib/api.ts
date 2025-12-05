// src/lib/api.ts
import axios from "axios"

const BASE = "https://www.alphavantage.co/query"

/**
 * Unified AlphaVantage fetcher used everywhere.
 * Handles query params, API key, errors, and returns JSON.
 */
export async function getAlphaData(params: Record<string, string | number>) {
  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY

  if (!apiKey) {
    throw new Error("Missing AlphaVantage API Key (NEXT_PUBLIC_ALPHA_VANTAGE_KEY)")
  }

  const searchParams = new URLSearchParams({
    ...params,
    apikey: apiKey,
  })

  const url = `${BASE}?${searchParams.toString()}`

  try {
    const res = await axios.get(url, { timeout: 12000 })
    return res.data
  } catch (err: any) {
    console.error("AlphaVantage fetch error:", err)
    throw new Error("Failed to fetch data from AlphaVantage")
  }
}
