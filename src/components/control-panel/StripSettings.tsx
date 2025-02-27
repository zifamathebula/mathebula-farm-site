'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'

interface StripSettingsProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
}

export function StripSettings({ config, setConfig }: StripSettingsProps) {
    const handleCentralStripChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numericValue = parseFloat(value);

        setConfig({
            ...config,
            centralStripConfig: {
                ...config.centralStripConfig,
                [name]: numericValue
            }
        });
    }

    return (
            <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Central Strip Settings</label>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs text-gray-800">Width</label>
                        <input
                                type="number"
                                name="width"
                                value={config.centralStripConfig.width}
                                onChange={handleCentralStripChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-800">Height</label>
                        <input
                                type="number"
                                name="height"
                                value={config.centralStripConfig.height}
                                onChange={handleCentralStripChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-800">Border Radius</label>
                        <input
                                type="number"
                                name="borderRadius"
                                value={config.centralStripConfig.borderRadius}
                                onChange={handleCentralStripChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                </div>
            </div>
    )
}