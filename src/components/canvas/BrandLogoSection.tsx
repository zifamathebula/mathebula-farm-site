'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'
import { DraggableComponent } from '../DraggableComponent'

interface BrandLogoSectionProps {
    config: PackagingConfig
    handleTopLevelComponentUpdate: (key: keyof PackagingConfig, newConfig: any) => void
    scale: number
    canvasRef: React.RefObject<HTMLDivElement>
    editMode: boolean
    isClient: boolean
}

export function BrandLogoSection({
                                     config,
                                     handleTopLevelComponentUpdate,
                                     scale,
                                     canvasRef,
                                     editMode,
                                     isClient
                                 }: BrandLogoSectionProps) {
    return (
            <DraggableComponent
                    componentConfig={config.logoComponentConfig}
                    onUpdate={(newConfig) => handleTopLevelComponentUpdate('logoComponentConfig', newConfig)}
                    scale={scale}
                    canvasRef={canvasRef}
                    editMode={editMode}
            >
                {isClient && config.brandLogoImage ? (
                        <img
                                src={URL.createObjectURL(config.brandLogoImage)}
                                alt="Brand Logo"
                                className="w-full h-full object-contain"
                        />
                ) : (
                        <div
                                className="rounded-full p-2 flex items-center justify-center"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: config.colorBySize[config.eggSize]
                                }}
                        >
                            <div
                                    className="text-center font-bold"
                                    style={{
                                        color: 'white',
                                        fontSize: `${16 * scale}px`
                                    }}
                            >
                                <div style={{ fontSize: `${10 * scale}px` }}>est. 2025</div>
                                FARM
                                <br />
                                EGGS
                            </div>
                        </div>
                )}
            </DraggableComponent>
    )
}