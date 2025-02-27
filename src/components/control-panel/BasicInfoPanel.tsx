'use client'

import React from 'react'
import { PackagingConfig, EggSize, PackagingSize } from '@/types/packaging'
import { TextEditor } from '../TextEditor'
import { ColorPicker } from './ColorPicker'
import { FlapSettings } from './FlapSettings'
import { StripSettings } from './StripSettings'

interface BasicInfoPanelProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
}

export function BasicInfoPanel({ config, setConfig }: BasicInfoPanelProps) {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setConfig({ ...config, [name]: value })
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setConfig({ ...config, [name]: checked })
    }

    const handleEggSizeColorChange = (size: EggSize, color: string) => {
        setConfig({
            ...config,
            colorBySize: {
                ...config.colorBySize,
                [size]: color
            }
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setConfig({ ...config, [name]: value })
    }

    return (
            <details open>
                <summary className="text-md font-medium text-gray-800 cursor-pointer py-2 hover:bg-gray-100 px-2 rounded">
                    Basic Information
                </summary>
                <div className="pl-4 space-y-3 pt-2">
                    <TextEditor
                            label="Company Name"
                            htmlContent={config.companyName}
                            textStyle={config.mainTextStyle}
                            onChange={(content, style) => {
                                setConfig({
                                    ...config,
                                    companyName: content,
                                    mainTextStyle: style
                                })
                            }}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-800">Packaging Size</label>
                            <select
                                    name="packagingSize"
                                    value={config.packagingSize}
                                    onChange={handleSelectChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                            >
                                <option value="30">30 Eggs</option>
                                <option value="18">18 Eggs</option>
                                <option value="12">12 Eggs</option>
                                <option value="6">6 Eggs</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-800">Egg Size</label>
                            <select
                                    name="eggSize"
                                    value={config.eggSize}
                                    onChange={handleSelectChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                            >
                                <option value="S">Small (S)</option>
                                <option value="M">Medium (M)</option>
                                <option value="L">Large (L)</option>
                                <option value="XL">Extra Large (XL)</option>
                                <option value="JUMBO">Jumbo</option>
                            </select>
                        </div>
                    </div>

                    {/* Color Settings */}
                    <ColorPicker
                            config={config}
                            handleEggSizeColorChange={handleEggSizeColorChange}
                            handleInputChange={handleInputChange}
                    />

                    {/* Central Strip Settings */}
                    <StripSettings
                            config={config}
                            setConfig={setConfig}
                    />

                    {/* Flap Settings */}
                    <FlapSettings
                            config={config}
                            setConfig={setConfig}
                            handleCheckboxChange={handleCheckboxChange}
                    />
                </div>
            </details>
    )
}