"use client"

import React, { useState } from 'react'
import { useWidgetsStore } from '@/src/store/widgetsStore'
import AddWidgetModal from '@/src/components/widgets/AddWidgetModal'
import FinanceCard from '@/src/components/widgets/FinanaceCard'
import LineChartWidget from "@/src/components/widgets/LineChartWidget"
import TableWidget from "@/src/components/widgets/TableWidget"

export default function DashboardPage() {
  const widgets = useWidgetsStore((s) => s.widgets)
  const [open, setOpen] = useState(false)

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-black">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">FinBoard — Dashboard</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Add Widget
        </button>
      </header>

      <AddWidgetModal open={open} onClose={() => setOpen(false)} />

      <section className="grid grid-cols-12 gap-4">
        {widgets.length === 0 ? (
          <div className="col-span-12 p-8 border-2 border-dashed border-gray-300 rounded text-center">
            No widgets yet — click “Add Widget” to create one.
          </div>
        ) : (
          widgets.map((w) => (
            <div key={w.id} className="col-span-4">
              <div className="p-4 bg-white rounded shadow">
                
                <h3 className="font-medium">{w.title}</h3>
                <p className="text-sm text-gray-500">
                  {w.type} • {w.symbol}
                </p>

                {w.type === "card" && (
                    <FinanceCard symbol={w.symbol} refresh={w.refresh} />
                )}

                {w.type === "chart" && (
                    <LineChartWidget symbol={w.symbol} refresh={w.refresh} />
                )}

                {w.type === "table" && (
                    <TableWidget refresh={w.refresh} />
                )}

              </div>
            </div>
          ))
        )}
      </section>
    </main>
  )
}
