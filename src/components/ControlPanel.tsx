'use client'

import React, { useRef } from 'react'
import { PackagingConfig } from '@/types/packaging'
import { ButtonGroup } from './control-panel/ButtonGroup'
import { BasicInfoPanel } from './control-panel/BasicInfoPanel'
import { ImagesLogosPanel } from './control-panel/ImagesLogosPanel'
import { TextContentPanel } from './control-panel/TextContentPanel'
import { NutritionPanel } from './control-panel/NutritionPanel'
import { BarcodePanel } from './control-panel/BarcodePanel'

interface ControlPanelProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
    editMode: boolean
    setEditMode: (mode: boolean) => void
    onUndo: () => void
    onRedo: () => void
    canUndo: boolean
    canRedo: boolean
    onExportToPng: () => void
    onExportToPdf: () => void
}

export function ControlPanel({
                                 config,
                                 setConfig,
                                 editMode,
                                 setEditMode,
                                 onUndo,
                                 onRedo,
                                 canUndo,
                                 canRedo,
                                 onExportToPng,
                                 onExportToPdf
                             }: ControlPanelProps) {
    const fileInputRefs = {
        brandLogo: useRef<HTMLInputElement>(null),
        flapLogo: useRef<HTMLInputElement>(null),
        background: useRef<HTMLInputElement>(null),
        certification: useRef<HTMLInputElement>(null)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'backgroundImage' | 'brandLogoImage' | 'flapLogoImage' | 'certificationImage') => {
        if (e.target.files && e.target.files[0]) {
            setConfig({ ...config, [type]: e.target.files[0] })
        }
    }

    const downloadDesign = () => {
        const designData = JSON.stringify(config, (key, value) => {
            // Convert File objects to null for JSON storage
            if (value instanceof File) return null
            return value
        })

        const blob = new Blob([designData], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `egg-design-${config.packagingSize}-${config.eggSize}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const loadDesign = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    if (event.target?.result) {
                        const loadedConfig = JSON.parse(event.target.result as string) as PackagingConfig;
                        setConfig({
                            ...loadedConfig,
                            // Preserve current files
                            backgroundImage: config.backgroundImage,
                            brandLogoImage: config.brandLogoImage,
                            flapLogoImage: config.flapLogoImage,
                            certificationImage: config.certificationImage
                        });
                    }
                } catch (error) {
                    console.error('Error loading design:', error);
                    alert('Failed to load design. The file might be corrupted.');
                }
            };
            reader.readAsText(e.target.files[0]);
        }
    };

    return (
            <div className="bg-gray-50 shadow-lg rounded-lg p-4 max-h-screen overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Design Controls</h2>

                {/* Top Control Buttons */}
                <ButtonGroup
                        editMode={editMode}
                        setEditMode={setEditMode}
                        onUndo={onUndo}
                        onRedo={onRedo}
                        canUndo={canUndo}
                        canRedo={canRedo}
                        onExportToPng={onExportToPng}
                        onExportToPdf={onExportToPdf}
                        onDownloadDesign={downloadDesign}
                        onLoadDesign={loadDesign}
                />

                <div className="border-t border-gray-300 pt-3 mt-2 mb-4">
                    <p className="text-sm text-gray-700">
                        {editMode ?
                                "You're in edit mode. Click and drag elements to reposition. Resize where available." :
                                "Enter edit mode to move and resize elements on the design."}
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Basic Information Panel */}
                    <BasicInfoPanel
                            config={config}
                            setConfig={setConfig}
                    />

                    {/* Images & Logos Panel */}
                    <ImagesLogosPanel
                            config={config}
                            setConfig={setConfig}
                            fileInputRefs={fileInputRefs}
                            handleFileChange={handleFileChange}
                    />

                    {/* Text & Content Panel */}
                    <TextContentPanel
                            config={config}
                            setConfig={setConfig}
                    />

                    {/* Nutritional Information Panel */}
                    <NutritionPanel
                            config={config}
                            setConfig={setConfig}
                    />

                    {/* Barcode Settings Panel */}
                    <BarcodePanel
                            config={config}
                            setConfig={setConfig}
                    />
                </div>
            </div>
    )
}