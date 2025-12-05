// src/components/ui/Modal.tsx
"use client"

import React from "react"

export default function Modal({ open, onClose, children }: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
        {children}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}
