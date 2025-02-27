'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'

interface FlapSettingsProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FlapSettings({
                                 config,
                                 setConfig,
                                 handleCheckboxChange
                             }: FlapSettingsProps) {
    const handleFlapConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericValue = name === 'logoScale' || name === 'logoRotation'
                ? parseFloat(value)
                : value;

        setConfig({
            ...config,
            flapConfig: {
                ...config.flapConfig,
                [name]: numericValue
            }
        });
    }

    return (
            <div className="flex flex-col space-y-2 bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center">
                    <input
                            type="checkbox"
                            id="showSideFlaps"
                            name="showSideFlaps"
                            checked={config.showSideFlaps}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                    />
                    <label htmlFor="showSideFlaps" className="text-sm font-medium text-gray-800">
                        Show Flaps for Shop Shelf Visibility
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                            type="checkbox"
                            id="showFoldingLines"
                            name="showFoldingLines"
                            checked={config.showFoldingLines}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                    />
                    <label htmlFor="showFoldingLines" className="text-sm font-medium text-gray-800">
                        Show Folding Lines
                    </label>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-800">Flap Position</label>
                    <select
                            name="position"
                            value={config.flapConfig.position}
                            onChange={handleFlapConfigChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                            disabled={config.packagingSize === '30'} // Auto-set for 30
                    >
                        <option value="sides">Side Flaps</option>
                        <option value="topbottom">Top & Bottom Flaps</option>
                    </select>
                    <p className="text-xs text-gray-700 mt-1">
                        {config.packagingSize === '30'
                                ? 'Side flaps automatically used for 30-egg cartons'
                                : 'Top/bottom flaps recommended for smaller cartons'}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Logo Scale</label>
                        <input
                                type="number"
                                name="logoScale"
                                value={config.flapConfig.logoScale}
                                onChange={handleFlapConfigChange}
                                step="0.1"
                                min="0.1"
                                max="2"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Logo Rotation</label>
                        <input
                                type="number"
                                name="logoRotation"
                                value={config.flapConfig.logoRotation}
                                onChange={handleFlapConfigChange}
                                step="15"
                                min="0"
                                max="360"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                </div>
            </div>
    )
}