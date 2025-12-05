import { getAlphaData } from "./api"
import { mapDailySeries } from "./dataMapper"

export async function fetchMultipleStocks(symbols: string[]) {
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const raw = await getAlphaData({
          function: "TIME_SERIES_DAILY",
          symbol,
        })

        const mapped = mapDailySeries(raw)

        if (!mapped) return null

        return {
          symbol,
          price: mapped.latest.close,
          change: mapped.series[1]
            ? ((mapped.latest.close - mapped.series[1].close) / mapped.series[1].close) * 100
            : 0,
          volume: mapped.latest.volume,
        }
      } catch {
        return null
      }
    })
  )

  return results.filter(Boolean) // remove nulls
}
