'use client'

import React from 'react'

interface ButtonGroupProps {
    editMode: boolean
    setEditMode: (mode: boolean) => void
    onUndo: () => void
    onRedo: () => void
    canUndo: boolean
    canRedo: boolean
    onExportToPng: () => void
    onExportToPdf: () => void
    onDownloadDesign: () => void
    onLoadDesign: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ButtonGroup({
                                editMode,
                                setEditMode,
                                onUndo,
                                onRedo,
                                canUndo,
                                canRedo,
                                onExportToPng,
                                onExportToPdf,
                                onDownloadDesign,
                                onLoadDesign
                            }: ButtonGroupProps) {
    return (
            <>
                <div className="flex items-center gap-2 mb-4">
                    <button
                            onClick={() => setEditMode(!editMode)}
                            className={`px-3 py-1 rounded-md text-sm ${editMode
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-300 text-gray-800'}`}
                    >
                        {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                    </button>

                    <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Undo
                    </button>

                    <button
                            onClick={onRedo}
                            disabled={!canRedo}
                            className="px-3 py-1 rounded-md bg-gray-300 text-gray-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Redo
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                            onClick={onExportToPng}
                            className="px-3 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
                    >
                        Export PNG
                    </button>

                    <button
                            onClick={onExportToPdf}
                            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                        Export PDF
                    </button>

                    <button
                            onClick={onDownloadDesign}
                            className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                    >
                        Save Design
                    </button>

                    <label className="px-3 py-1 rounded-md bg-purple-600 text-white text-sm cursor-pointer hover:bg-purple-700">
                        Load Design
                        <input
                                type="file"
                                accept=".json"
                                onChange={onLoadDesign}
                                className="hidden"
                        />
                    </label>
                </div>
            </>
    )
}