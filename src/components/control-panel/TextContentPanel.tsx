'use client'

import React from 'react'
import { PackagingConfig, TextStyle } from '@/types/packaging'
import { TextEditor } from '../TextEditor'

interface TextContentPanelProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
}

export function TextContentPanel({
                                     config,
                                     setConfig
                                 }: TextContentPanelProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setConfig({ ...config, [name]: value })
    }

    const handleTextStyleChange = (styleField: 'mainTextStyle' | 'sizeTextStyle' | 'countTextStyle' | 'weightTextStyle', newStyle: TextStyle) => {
        setConfig({
            ...config,
            [styleField]: newStyle
        })
    }

    const handleStorageInstructionsChange = (htmlContent: string, textStyle: TextStyle) => {
        setConfig({
            ...config,
            storageInstructions: htmlContent,
        });
    }

    const handleProducerInfoChange = (htmlContent: string, textStyle: TextStyle) => {
        setConfig({
            ...config,
            producerInfo: {
                ...config.producerInfo,
                content: htmlContent,
                textStyle
            }
        });
    }

    return (
            <details>
                <summary className="text-md font-medium text-gray-800 cursor-pointer py-2 hover:bg-gray-100 px-2 rounded">
                    Text & Content
                </summary>
                <div className="pl-4 space-y-3 pt-2">
                    <TextEditor
                            label="Size Text Styling"
                            htmlContent="Sample Size Text"
                            textStyle={config.sizeTextStyle}
                            onChange={(_, style) => handleTextStyleChange('sizeTextStyle', style)}
                    />

                    <TextEditor
                            label="Count Text Styling"
                            htmlContent="12" // Sample count
                            textStyle={config.countTextStyle}
                            onChange={(_, style) => handleTextStyleChange('countTextStyle', style)}
                    />

                    <TextEditor
                            label="Weight Text Styling"
                            htmlContent="Sample Weight"
                            textStyle={config.weightTextStyle}
                            onChange={(_, style) => handleTextStyleChange('weightTextStyle', style)}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Egg Size Text (Auto-set)</label>
                        <input
                                type="text"
                                value={config.eggSizeText}
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                        <p className="text-xs text-gray-700 mt-1">Automatically set based on selected egg size</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Weight Text (Auto-set)</label>
                        <input
                                type="text"
                                value={config.weightText}
                                readOnly
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                        <p className="text-xs text-gray-700 mt-1">Automatically set based on selected egg size</p>
                    </div>

                    <TextEditor
                            label="Grade Text"
                            htmlContent={config.gradeText}
                            textStyle={config.mainTextStyle} // Use a dedicated style if needed
                            onChange={(content, _) => {
                                setConfig({
                                    ...config,
                                    gradeText: content
                                });
                            }}
                    />

                    <TextEditor
                            label="Storage Instructions"
                            htmlContent={config.storageInstructions}
                            textStyle={config.mainTextStyle} // Use a dedicated style if needed
                            onChange={(content, _) => handleStorageInstructionsChange(content, config.mainTextStyle)}
                    />

                    <TextEditor
                            label="Producer Information"
                            htmlContent={config.producerInfo.content}
                            textStyle={config.producerInfo.textStyle}
                            onChange={(content, style) => handleProducerInfoChange(content, style)}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Registration Number</label>
                        <input
                                type="text"
                                name="regNumber"
                                value={config.regNumber}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                        />
                    </div>
                </div>
            </details>
    )
}