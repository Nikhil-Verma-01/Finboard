// src/store/widgetsStore.ts
import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export type WidgetType = 'card' | 'chart' | 'table'

export type Widget = {
  id: string
  type: WidgetType
  title: string
  symbol: string
  endpoint: string
  refresh: number // seconds
  layout?: { x?: number; y?: number; w?: number; h?: number }
  config?: Record<string, any>
}

type WidgetsState = {
  widgets: Widget[]
  addWidget: (w: Omit<Widget, 'id'>) => void
  updateWidget: (id: string, patch: Partial<Widget>) => void
  removeWidget: (id: string) => void
  clearAll: () => void
}

export const useWidgetsStore = create<WidgetsState>()(
  persist(
    (set, get) => ({
      widgets: [],
      addWidget: (w) =>
        set((s) => ({ widgets: [...s.widgets, { ...w, id: nanoid() }] })),
      updateWidget: (id, patch) =>
        set((s) => ({ widgets: s.widgets.map(w => w.id === id ? { ...w, ...patch } : w) })),
      removeWidget: (id) =>
        set((s) => ({ widgets: s.widgets.filter(w => w.id !== id) })),
      clearAll: () => set({ widgets: [] }),
    }),
    {
      name: 'finboard-widgets', // localStorage key
      // optional: serialize/deserialize hooks
    }
  )
)
