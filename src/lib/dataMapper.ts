export function mapDailySeries(data: any) {
  const series = data["Time Series (Daily)"]
  if (!series) return null

  const mapped = Object.entries(series)
    .map(([date, values]: any) => ({
      date,
      open: Number(values["1. open"]),
      high: Number(values["2. high"]),
      low: Number(values["3. low"]),
      close: Number(values["4. close"]),
      volume: Number(values["5. volume"])
    }))
    .slice(0, 30) // use 30 most recent days

  const latest = mapped[0]

  return {
    latest,
    series: mapped.reverse(), // reverse for charts (oldest → newest)
  }
}
