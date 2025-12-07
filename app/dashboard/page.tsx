"use client"

import React, { useState } from "react"
import { useWidgetsStore } from "@/src/store/widgetsStore"
import AddWidgetModal from "@/src/components/widgets/AddWidgetModal"

import LineChartWidget from "@/src/components/widgets/LineChartWidget"
import TableWidget from "@/src/components/widgets/TableWidget"

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import DraggableWrapper from "@/src/components/widgets/DraggableWrapper"
import { FiSettings } from "react-icons/fi"
import WidgetConfigPanel from "@/src/components/widgets/WidgetConfigPanel"
import FinanceCard from "@/src/components/widgets/FinanceCard"

export default function DashboardPage() {
  const widgets = useWidgetsStore((s) => s.widgets)
  const [open, setOpen] = useState(false)
  const [configWidget, setConfigWidget] = useState(null)

  return (
    <main className="min-h-screen p-6 bg-gray-50 text-black">
      {/* Header */}
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

      {configWidget && (
        <WidgetConfigPanel
          widget={configWidget}
          onClose={() => setConfigWidget(null)}
        />
      )}

      {/* If no widgets */}
      {widgets.length === 0 ? (
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 p-8 border-2 border-dashed border-gray-300 rounded text-center">
            No widgets yet — click “Add Widget” to create one.
          </div>
        </section>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event
            if (!over || active.id === over.id) return

            const reorderWidgets = useWidgetsStore.getState().reorderWidgets

            const oldIndex = widgets.findIndex((w) => w.id === active.id)
            const newIndex = widgets.findIndex((w) => w.id === over.id)

            reorderWidgets(arrayMove(widgets, oldIndex, newIndex))
          }}
        >
          <SortableContext
            items={widgets.map((w) => w.id)}
            strategy={verticalListSortingStrategy}
          >
            <section className="grid grid-cols-12 gap-6">
              {widgets.map((w) => (
                <div
                  key={w.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <DraggableWrapper id={w.id}>
                    <div className="bg-white rounded-lg shadow p-4 cursor-grab active:cursor-grabbing">

                      {/* Widget header */}
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-semibold">{w.title}</h3>
                          <p className="text-sm text-gray-500">
                            {w.symbol}
                          </p>
                        </div>

                        {/* Settings Button */}
                        <button
                          onClick={() => setConfigWidget(w)}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          <FiSettings size={18} />
                        </button>
                      </div>

                      {/* Widget Content */}
                      {w.type === "card" && (
                        <FinanceCard symbol={w.symbol} refresh={w.refresh} />
                      )}

                      {w.type === "chart" && (
                        <LineChartWidget
                          symbol={w.symbol}
                          refresh={w.refresh}
                        />
                      )}

                      {w.type === "table" && (
                        <TableWidget refresh={w.refresh} />
                      )}
                    </div>
                  </DraggableWrapper>
                </div>
              ))}
            </section>
          </SortableContext>
        </DndContext>
      )}
    </main>
  )
}
