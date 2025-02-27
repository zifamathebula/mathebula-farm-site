'use client'

import React from 'react'
import { PackagingConfig, EggSize } from '@/types/packaging'

interface ColorPickerProps {
    config: PackagingConfig
    handleEggSizeColorChange: (size: EggSize, color: string) => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ColorPicker({
                                config,
                                handleEggSizeColorChange,
                                handleInputChange
                            }: ColorPickerProps) {
    return (
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Color Settings</label>
                <div className="grid grid-cols-2 gap-2">
                    {(['S', 'M', 'L', 'XL', 'JUMBO'] as EggSize[]).map((size) => (
                            <div key={size} className="flex items-center">
                                <label className="block text-xs text-gray-800 mr-2 w-16">{size} Color:</label>
                                <input
                                        type="color"
                                        value={config.colorBySize[size]}
                                        onChange={(e) => handleEggSizeColorChange(size, e.target.value)}
                                        className="block w-full h-8"
                                />
                            </div>
                    ))}
                    <div className="flex items-center">
                        <label className="block text-xs text-gray-800 mr-2 w-16">Grade Color:</label>
                        <input
                                type="color"
                                name="gradeColor"
                                value={config.gradeColor}
                                onChange={handleInputChange}
                                className="block w-full h-8"
                        />
                    </div>
                </div>
            </div>
    )
}