'use client'

import React, { useEffect, useState } from 'react'
import { PackagingConfig } from '@/types/packaging'
import { DraggableComponent } from './DraggableComponent'
import { FlapComponent } from './FlapComponent'
import { CentralStripComponent } from './CentralStripComponent'
import { NutritionalInfoComponent } from './NutritionalInfoComponent'
import { CanvasBackground } from './canvas/CanvasBackground'
import { BrandLogoSection } from './canvas/BrandLogoSection'
import { CertificationSection } from './canvas/CertificationSection'
import { StorageInstructionsSection } from './canvas/StorageInstructionsSection'
import { ProducerInfoSection } from './canvas/ProducerInfoSection'

interface PackagingCanvasProps {
    config: PackagingConfig
    setConfig: (config: PackagingConfig) => void
    canvasRef: React.RefObject<HTMLDivElement>
    editMode: boolean
    dimensions: { width: number, height: number }
}

export function PackagingCanvas({
                                    config,
                                    setConfig,
                                    canvasRef,
                                    editMode,
                                    dimensions
                                }: PackagingCanvasProps) {
    const [scale, setScale] = useState(1)
    const [isClient, setIsClient] = useState(false)

    // Set client-side rendering flag
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Set scale based on dimensions
    useEffect(() => {
        if (config.packagingSize === '30') {
            setScale(1)
        } else if (config.packagingSize === '18') {
            setScale(0.83) // 500/600
        } else if (config.packagingSize === '12') {
            setScale(0.66) // 400/600
        } else if (config.packagingSize === '6') {
            setScale(0.5) // 300/600
        }
    }, [config.packagingSize])

    // Get the current color based on egg size
    const currentColor = config.colorBySize[config.eggSize]

    // Get current barcode based on packaging size
    const currentBarcode = config.barcode.values[config.packagingSize] || ''

    // Handle component position or size update
    const handleComponentUpdate = (
            key: keyof PackagingConfig,
            newComponentConfig: any
    ) => {
        setConfig({
            ...config,
            [key]: {
                ...config[key],
                componentConfig: newComponentConfig
            }
        });
    };

    // For components at top level
    const handleTopLevelComponentUpdate = (
            key: keyof PackagingConfig,
            newComponentConfig: any
    ) => {
        setConfig({
            ...config,
            [key]: newComponentConfig
        });
    };

    // Handle central strip update
    const handleCentralStripUpdate = (newConfig: any) => {
        setConfig({
            ...config,
            centralStripConfig: {
                ...config.centralStripConfig,
                ...newConfig
            }
        });
    };

    // Handle flap logo click for scale/rotation adjustment
    const handleFlapLogoClick = () => {
        if (editMode) {
            // Open a scale/rotation editor popup
            const scale = prompt('Enter logo scale (0.1-2.0):', config.flapConfig.logoScale.toString());
            if (scale !== null) {
                setConfig({
                    ...config,
                    flapConfig: {
                        ...config.flapConfig,
                        logoScale: parseFloat(scale) || config.flapConfig.logoScale
                    }
                });
            }

            const rotation = prompt('Enter logo rotation (0-360):', config.flapConfig.logoRotation.toString());
            if (rotation !== null) {
                setConfig({
                    ...config,
                    flapConfig: {
                        ...config.flapConfig,
                        logoRotation: parseFloat(rotation) || config.flapConfig.logoRotation
                    }
                });
            }
        }
    };

    return (
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                    Preview {editMode && <span className="text-blue-600">(Edit Mode)</span>}
                </h2>

                <div
                        ref={canvasRef}
                        className="relative border-2 border-gray-300 rounded overflow-hidden bg-white"
                        style={{
                            width: `${dimensions.width}px`,
                            height: `${dimensions.height}px`,
                            margin: '0 auto'
                        }}
                >
                    {/* Background */}
                    <CanvasBackground
                            backgroundImage={config.backgroundImage}
                            backgroundOpacity={config.backgroundOpacity}
                            isClient={isClient}
                    />

                    {/* Add flaps */}
                    {config.showSideFlaps && (
                            <FlapComponent
                                    position={config.flapConfig.position}
                                    color={currentColor}
                                    logoScale={config.flapConfig.logoScale}
                                    logoRotation={config.flapConfig.logoRotation}
                                    brandLogoImage={config.brandLogoImage}
                                    flapLogoImage={config.flapLogoImage}
                                    eggCount={config.eggCount}
                                    eggSizeText={config.eggSizeText}
                                    showFoldingLines={config.showFoldingLines}
                                    scale={scale}
                                    dimensions={dimensions}
                                    editMode={editMode}
                                    onLogoClick={handleFlapLogoClick}
                                    barcodeText={currentBarcode}
                            />
                    )}

                    {/* Brand logo section */}
                    <BrandLogoSection
                            config={config}
                            handleTopLevelComponentUpdate={handleTopLevelComponentUpdate}
                            scale={scale}
                            canvasRef={canvasRef}
                            editMode={editMode}
                            isClient={isClient}
                    />

                    {/* Nutritional Information - Draggable with auto-scaling text */}
                    <DraggableComponent
                            componentConfig={config.nutritionalInfo.componentConfig}
                            onUpdate={(newConfig) => handleComponentUpdate('nutritionalInfo', newConfig)}
                            scale={scale}
                            canvasRef={canvasRef}
                            editMode={editMode}
                            style={{
                                backgroundColor: config.nutritionalInfo.backgroundColor,
                                padding: `${3 * scale}px`,
                                borderRadius: `${4 * scale}px`,
                                overflow: 'hidden'
                            }}
                    >
                        <NutritionalInfoComponent
                                htmlContent={config.nutritionalInfo.htmlContent}
                                textStyle={config.nutritionalInfo.textStyle}
                                backgroundColor={config.nutritionalInfo.backgroundColor}
                                textColor={config.nutritionalInfo.textColor}
                                componentWidth={config.nutritionalInfo.componentConfig.size?.width || 80}
                                scale={scale}
                        />
                    </DraggableComponent>

                    {/* Central Strip - Positioned and styled like the Eggs Fresh branding */}
                    <DraggableComponent
                            componentConfig={{
                                position: {
                                    x: (dimensions.width - config.centralStripConfig.width) / 2,
                                    y: (dimensions.height - config.centralStripConfig.height) / 2,
                                },
                                size: {
                                    width: config.centralStripConfig.width,
                                    height: config.centralStripConfig.height
                                },
                                isDraggable: true,
                                isResizable: true
                            }}
                            onUpdate={(newConfig) => {
                                const { position, size } = newConfig;
                                handleCentralStripUpdate({
                                    position,
                                    width: size?.width || config.centralStripConfig.width,
                                    height: size?.height || config.centralStripConfig.height
                                });
                            }}
                            scale={scale}
                            canvasRef={canvasRef}
                            editMode={editMode}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: `${config.centralStripConfig.borderRadius * scale}px`
                            }}
                    >
                        <CentralStripComponent
                                color={currentColor}
                                eggCount={config.eggCount}
                                eggSizeText={config.eggSizeText}
                                weightText={config.weightText}
                                countTextStyle={config.countTextStyle}
                                sizeTextStyle={config.sizeTextStyle}
                                weightTextStyle={config.weightTextStyle}
                                mainTextStyle={config.mainTextStyle}
                                scale={scale}
                        />
                    </DraggableComponent>

                    {/* Certification Image */}
                    <CertificationSection
                            config={config}
                            dimensions={dimensions}
                            scale={scale}
                            canvasRef={canvasRef}
                            editMode={editMode}
                            isClient={isClient}
                    />

                    {/* Storage Instructions */}
                    <StorageInstructionsSection
                            config={config}
                            currentColor={currentColor}
                            scale={scale}
                            canvasRef={canvasRef}
                            editMode={editMode}
                            handleTopLevelComponentUpdate={handleTopLevelComponentUpdate}
                    />

                    {/* Producer Info */}
                    <ProducerInfoSection
                            config={config}
                            scale={scale}
                            canvasRef={canvasRef}
                            editMode={editMode}
                            handleComponentUpdate={handleComponentUpdate}
                    />
                </div>

                <div className="mt-4 text-sm text-gray-700 text-center">
                    {dimensions.width} x {dimensions.height}px ({config.packagingSize}-egg carton)
                </div>
            </div>
    )
}