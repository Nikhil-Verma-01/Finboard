"use client"

import { useEffect, useState } from "react"
import { getAlphaData } from "@/src/lib/api"
import { mapDailySeries } from "@/src/lib/dataMapper"

export function useStockData(symbol: string, refresh: number) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    try {
      setLoading(true)
      const raw = await getAlphaData({
        function: "TIME_SERIES_DAILY",
        symbol,
      })
      const mapped = mapDailySeries(raw)

      if (!mapped) throw new Error("Invalid API response")

      setData(mapped)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, refresh * 1000)
    return () => clearInterval(interval)
  }, [symbol, refresh])

  return { data, loading, error }
}
