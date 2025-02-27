'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'
import { DraggableComponent } from '../DraggableComponent'

interface StorageInstructionsSectionProps {
    config: PackagingConfig
    currentColor: string
    scale: number
    canvasRef: React.RefObject<HTMLDivElement>
    editMode: boolean
    handleTopLevelComponentUpdate: (key: keyof PackagingConfig, newConfig: any) => void
}

export function StorageInstructionsSection({
                                               config,
                                               currentColor,
                                               scale,
                                               canvasRef,
                                               editMode,
                                               handleTopLevelComponentUpdate
                                           }: StorageInstructionsSectionProps) {
    return (
            <DraggableComponent
                    componentConfig={config.storageInstructionsConfig}
                    onUpdate={(newConfig) => handleTopLevelComponentUpdate('storageInstructionsConfig', newConfig)}
                    scale={scale}
                    canvasRef={canvasRef}
                    editMode={editMode}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: `${4 * scale}px`,
                        fontSize: `${12 * scale}px`,
                        color: currentColor,
                        fontWeight: 'bold',
                        padding: `${4 * scale}px ${8 * scale}px`,
                    }}
            >
                <div dangerouslySetInnerHTML={{ __html: config.storageInstructions }} />
            </DraggableComponent>
    )
}