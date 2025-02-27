'use client'

import React from 'react'
import { PackagingConfig, PackagingSize } from '@/types/packaging'

interface BarcodePanelProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
}

export function BarcodePanel({ config, setConfig }: BarcodePanelProps) {
    const handleBarcodeChange = (size: PackagingSize, value: string) => {
        setConfig({
            ...config,
            barcode: {
                ...config.barcode,
                values: {
                    ...config.barcode.values,
                    [size]: value
                }
            }
        });
    }

    return (
            <details>
                <summary className="text-md font-medium text-gray-800 cursor-pointer py-2 hover:bg-gray-100 px-2 rounded">
                    Barcode Settings
                </summary>
                <div className="pl-4 space-y-3 pt-2">
                    <div>
                        <p className="text-sm font-medium text-gray-800 mb-2">
                            Configure barcodes for different packaging sizes:
                        </p>

                        {(['30', '18', '12', '6'] as PackagingSize[]).map(size => (
                                <div key={size} className="mb-2">
                                    <label className="block text-sm text-gray-800">
                                        {size}-Egg Barcode
                                    </label>
                                    <input
                                            type="text"
                                            value={config.barcode.values[size] || ''}
                                            onChange={(e) => handleBarcodeChange(size, e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                                            placeholder="Enter barcode..."
                                    />
                                    <p className="text-xs text-gray-700 mt-1">
                                        Current size: {config.packagingSize === size ? '✓' : ''}
                                    </p>
                                </div>
                        ))}
                    </div>
                </div>
            </details>
    )
}