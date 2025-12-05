"use client"

import { useStockData } from "@/src/hooks/useStockData"

export default function FinanceCard({ symbol, refresh }: { symbol: string; refresh: number }) {
  const { data, loading, error } = useStockData(symbol, refresh)

  if (loading)
    return (
      <div className="p-4 animate-pulse">
        <div className="h-4 bg-gray-300 w-1/2 rounded mb-3" />
        <div className="h-4 bg-gray-200 w-2/3 rounded mb-1" />
        <div className="h-4 bg-gray-200 w-1/3 rounded" />
      </div>
    )

  if (error)
    return <div className="p-4 text-red-500 text-sm">Error: {error}</div>

  const latest = data.latest

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{symbol}</h3>
        <span className="text-xl font-bold">${latest.close.toFixed(2)}</span>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        <p>High: {latest.high}</p>
        <p>Low: {latest.low}</p>
        <p>Volume: {latest.volume.toLocaleString()}</p>
      </div>
    </div>
  )
}
