"use client"

import { useState } from "react"
import Modal from "../ui/Modal"
import { useWidgetsStore } from "@/src/store/widgetsStore"

export default function AddWidgetModal({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const addWidget = useWidgetsStore((s) => s.addWidget)

  const [type, setType] = useState<"card" | "chart" | "table">("card")
  const [symbol, setSymbol] = useState("AAPL")

  function handleAdd() {
    addWidget({
      type,
      title: `${symbol} ${type.toUpperCase()}`,
      symbol,
      endpoint: "TIME_SERIES_DAILY",
      refresh: 60,
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Add Widget</h2>

      {/* Widget Type */}
      <label className="font-medium">Widget Type</label>
      <select
        className="w-full mt-1 mb-4 border p-2 rounded"
        value={type}
        onChange={(e) => setType(e.target.value as any)}
      >
        <option value="card">Finance Card</option>
        <option value="chart">Line Chart</option>
        <option value="table">Table</option>
      </select>

      {/* Stock Symbol */}
      <label className="font-medium">Stock Symbol</label>
      <input
        className="w-full mt-1 mb-4 border p-2 rounded"
        placeholder="AAPL, TSLA, TCS, INFY"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />

      <button
        onClick={handleAdd}
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Add Widget
      </button>
    </Modal>
  )
}
