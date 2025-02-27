'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'
import { DraggableComponent } from '../DraggableComponent'

interface CertificationSectionProps {
    config: PackagingConfig
    dimensions: { width: number, height: number }
    scale: number
    canvasRef: React.RefObject<HTMLDivElement>
    editMode: boolean
    isClient: boolean
    onCertificationUpdate: (newConfig: any) => void
}

export function CertificationSection({
                                         config,
                                         dimensions,
                                         scale,
                                         canvasRef,
                                         editMode,
                                         isClient,
                                         onCertificationUpdate
                                     }: CertificationSectionProps) {
    // Only display if we have a certification image
    if (!isClient || !config.certificationImage) return null;

    // Set default config if none exists
    const defaultConfig = {
        position: { x: 20, y: dimensions.height - 60 },
        size: { width: 40, height: 40 },
        isDraggable: true,
        isResizable: true,
        rotation: 0
    };

    // Create a certification config if it doesn't exist in the original config
    const certificationConfig = config.certificationImage
            ? { ...defaultConfig }
            : defaultConfig;

    return (
            <DraggableComponent
                    componentConfig={certificationConfig}
                    onUpdate={onCertificationUpdate}
                    scale={scale}
                    canvasRef={canvasRef}
                    editMode={editMode}
                    style={{
                        transform: `rotate(${certificationConfig.rotation || 0}deg)`,
                        transformOrigin: 'center'
                    }}
            >
                <img
                        src={URL.createObjectURL(config.certificationImage)}
                        alt="Certification"
                        className="w-full h-full object-contain"
                />
            </DraggableComponent>
    )
}