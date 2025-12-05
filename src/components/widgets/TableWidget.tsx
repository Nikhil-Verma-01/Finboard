"use client"

import { useEffect, useState } from "react"
import { fetchMultipleStocks } from "@/src/lib/fetchMultipleStocks"

const DEFAULT_STOCKS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA"]

export default function TableWidget({ refresh }: { refresh: number }) {
  const [stocks, setStocks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  async function load() {
    setLoading(true)
    const data = await fetchMultipleStocks(DEFAULT_STOCKS)
    setStocks(data as any[])
    setLoading(false)
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, refresh * 1000)
    return () => clearInterval(interval)
  }, [])

  const filtered = stocks.filter((s) =>
    s.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search symbol..."
        className="mb-3 p-2 border w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-gray-400">Loading table...</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-2 border">Symbol</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Change %</th>
              <th className="p-2 border">Volume</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.symbol} className="text-sm hover:bg-gray-50">
                <td className="p-2 border font-semibold">{s.symbol}</td>
                <td className="p-2 border">${s.price.toFixed(2)}</td>
                <td
                  className={`p-2 border font-medium ${
                    s.change >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {s.change.toFixed(2)}%
                </td>
                <td className="p-2 border">
                  {s.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
