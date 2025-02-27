'use client'

import React from 'react'
import { PackagingConfig, TextStyle } from '@/types/packaging'
import { TextEditor } from '../TextEditor'

interface NutritionPanelProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
}

export function NutritionPanel({ config, setConfig }: NutritionPanelProps) {
    const handleNutritionalInfoChange = (htmlContent: string, textStyle: TextStyle) => {
        setConfig({
            ...config,
            nutritionalInfo: {
                ...config.nutritionalInfo,
                htmlContent,
                textStyle
            }
        });
    }

    return (
            <details>
                <summary className="text-md font-medium text-gray-800 cursor-pointer py-2 hover:bg-gray-100 px-2 rounded">
                    Nutritional Information
                </summary>
                <div className="pl-4 space-y-3 pt-2">
                    <TextEditor
                            label="Nutritional Information"
                            htmlContent={config.nutritionalInfo.htmlContent}
                            textStyle={config.nutritionalInfo.textStyle}
                            onChange={handleNutritionalInfoChange}
                            darkMode={true}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Background Color & Opacity</label>
                        <input
                                type="color"
                                value={config.nutritionalInfo.backgroundColor.includes('rgba')
                                        ? '#' + config.nutritionalInfo.backgroundColor.match(/rgba\((\d+), (\d+), (\d+)/)?.[1].toString(16).padStart(2, '0') +
                                        config.nutritionalInfo.backgroundColor.match(/rgba\((\d+), (\d+), (\d+)/)?.[2].toString(16).padStart(2, '0') +
                                        config.nutritionalInfo.backgroundColor.match(/rgba\((\d+), (\d+), (\d+)/)?.[3].toString(16).padStart(2, '0')
                                        : config.nutritionalInfo.backgroundColor}
                                onChange={(e) => {
                                    const hexColor = e.target.value;
                                    const r = parseInt(hexColor.slice(1, 3), 16);
                                    const g = parseInt(hexColor.slice(3, 5), 16);
                                    const b = parseInt(hexColor.slice(5, 7), 16);
                                    const alpha = config.nutritionalInfo.backgroundColor.includes('rgba')
                                            ? parseFloat(config.nutritionalInfo.backgroundColor.match(/rgba\(\d+, \d+, \d+, ([\d.]+)\)/)?.[1] || '0.95')
                                            : 0.95;

                                    setConfig({
                                        ...config,
                                        nutritionalInfo: {
                                            ...config.nutritionalInfo,
                                            backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`
                                        }
                                    });
                                }}
                                className="mt-1 block w-full"
                        />
                        <div className="flex items-center mt-1">
                            <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={config.nutritionalInfo.backgroundColor.includes('rgba')
                                            ? parseFloat(config.nutritionalInfo.backgroundColor.match(/rgba\(\d+, \d+, \d+, ([\d.]+)\)/)?.[1] || '0.95')
                                            : 0.95}
                                    onChange={(e) => {
                                        const currentBg = config.nutritionalInfo.backgroundColor;
                                        let r, g, b;

                                        if (currentBg.includes('rgba')) {
                                            const match = currentBg.match(/rgba\((\d+), (\d+), (\d+)/)
                                            if (match) {
                                                [, r, g, b] = match.map(Number);
                                            } else {
                                                r = 255;
                                                g = 255;
                                                b = 255;
                                            }
                                        } else if (currentBg.startsWith('#')) {
                                            r = parseInt(currentBg.slice(1, 3), 16);
                                            g = parseInt(currentBg.slice(3, 5), 16);
                                            b = parseInt(currentBg.slice(5, 7), 16);
                                        } else {
                                            r = 255;
                                            g = 255;
                                            b = 255;
                                        }

                                        setConfig({
                                            ...config,
                                            nutritionalInfo: {
                                                ...config.nutritionalInfo,
                                                backgroundColor: `rgba(${r}, ${g}, ${b}, ${e.target.value})`
                                            }
                                        });
                                    }}
                                    className="w-full"
                            />
                            <span className="ml-2 text-sm">Opacity</span>
                        </div>
                    </div>
                </div>
            </details>
    )
}