"use client"

import { useState } from "react"
import { useWidgetsStore } from "@/src/store/widgetsStore"

export default function WidgetConfigPanel({ widget, onClose }: any) {
  const updateWidget = useWidgetsStore((s) => s.updateWidget)
  const removeWidget = useWidgetsStore((s) => s.removeWidget)

  const [title, setTitle] = useState(widget.title)
  const [symbol, setSymbol] = useState(widget.symbol)
  const [refresh, setRefresh] = useState(widget.refresh)

  function handleSave() {
    updateWidget(widget.id, { title, symbol, refresh })
    onClose()
  }

  function handleDelete() {
    removeWidget(widget.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-[2000]">
      <div className="w-80 bg-white h-full p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Widget Settings</h2>

        {/* Title */}
        <label className="font-medium">Title</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Symbol */}
        <label className="font-medium">Stock Symbol</label>
        <input
          className="w-full border p-2 rounded mb-4"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />

        {/* Refresh */}
        <label className="font-medium">Refresh (seconds)</label>
        <input
          type="number"
          className="w-full border p-2 rounded mb-4"
          value={refresh}
          onChange={(e) => setRefresh(Number(e.target.value))}
        />

        <button
          onClick={handleSave}
          className="w-full py-2 bg-indigo-600 text-white rounded mb-3"
        >
          Save Changes
        </button>

        <button
          onClick={handleDelete}
          className="w-full py-2 bg-red-500 text-white rounded"
        >
          Delete Widget
        </button>

        <button onClick={onClose} className="mt-4 underline w-full text-gray-600">
          Close
        </button>
      </div>
    </div>
  )
}
