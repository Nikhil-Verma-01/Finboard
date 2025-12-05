"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { useStockData } from "@/src/hooks/useStockData"

export default function LineChartWidget({
  symbol,
  refresh
}: {
  symbol: string
  refresh: number
}) {
  const { data, loading, error } = useStockData(symbol, refresh)

  if (loading) {
    return (
      <div className="p-4 text-gray-400 animate-pulse">
        Loading chart...
      </div>
    )
  }

  if (error || !data?.series) {
    return (
      <div className="p-4 text-red-500">
        Failed to load chart data.
      </div>
    )
  }

  const series = data.series.map((d: any) => ({
    date: d.date.slice(5), // show only MM-DD for simplicity
    close: d.close,
  }))

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
