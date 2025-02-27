'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'
import { TextEditor } from '../TextEditor'

interface ImagesLogosPanelProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
    fileInputRefs: {
        brandLogo: React.RefObject<HTMLInputElement>
        flapLogo: React.RefObject<HTMLInputElement>
        background: React.RefObject<HTMLInputElement>
        certification: React.RefObject<HTMLInputElement>
    }
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'backgroundImage' | 'brandLogoImage' | 'flapLogoImage' | 'certificationImage') => void
}

export function ImagesLogosPanel({
                                     config,
                                     setConfig,
                                     fileInputRefs,
                                     handleFileChange
                                 }: ImagesLogosPanelProps) {
    const handleBackgroundOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({
            ...config,
            backgroundOpacity: parseFloat(e.target.value)
        })
    }

    return (
            <details>
                <summary className="text-md font-medium text-gray-800 cursor-pointer py-2 hover:bg-gray-100 px-2 rounded">
                    Images & Logos
                </summary>
                <div className="pl-4 space-y-3 pt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-800">Brand Logo</label>
                        <input
                                type="file"
                                ref={fileInputRefs.brandLogo}
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'brandLogoImage')}
                                className="mt-1 block w-full text-sm text-gray-800 bg-white p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Flap Logo (Optional)</label>
                        <input
                                type="file"
                                ref={fileInputRefs.flapLogo}
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'flapLogoImage')}
                                className="mt-1 block w-full text-sm text-gray-800 bg-white p-2 border border-gray-300 rounded"
                        />
                        <p className="text-xs text-gray-700 mt-1">If not provided, the main logo will be used</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Background Image</label>
                        <input
                                type="file"
                                ref={fileInputRefs.background}
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'backgroundImage')}
                                className="mt-1 block w-full text-sm text-gray-800 bg-white p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Background Opacity ({config.backgroundOpacity})</label>
                        <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={config.backgroundOpacity}
                                onChange={handleBackgroundOpacityChange}
                                className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-800">Certification Logo</label>
                        <input
                                type="file"
                                ref={fileInputRefs.certification}
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'certificationImage')}
                                className="mt-1 block w-full text-sm text-gray-800 bg-white p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <TextEditor
                            label="Certification Text"
                            htmlContent={config.certificationText}
                            textStyle={config.mainTextStyle}
                            onChange={(content, style) => {
                                setConfig({
                                    ...config,
                                    certificationText: content
                                });
                            }}
                    />
                </div>
            </details>
    )
}