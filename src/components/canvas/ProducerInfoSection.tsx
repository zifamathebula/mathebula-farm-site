'use client'

import React from 'react'
import { PackagingConfig } from '@/types/packaging'
import { DraggableComponent } from '../DraggableComponent'

interface ProducerInfoSectionProps {
    config: PackagingConfig
    scale: number
    canvasRef: React.RefObject<HTMLDivElement>
    editMode: boolean
    handleComponentUpdate: (key: keyof PackagingConfig, newComponentConfig: any) => void
}

export function ProducerInfoSection({
                                        config,
                                        scale,
                                        canvasRef,
                                        editMode,
                                        handleComponentUpdate
                                    }: ProducerInfoSectionProps) {
    return (
            <DraggableComponent
                    componentConfig={config.producerInfo.componentConfig}
                    onUpdate={(newConfig) => handleComponentUpdate('producerInfo', newConfig)}
                    scale={scale}
                    canvasRef={canvasRef}
                    editMode={editMode}
                    style={{
                        color: config.producerInfo.textStyle.color,
                        fontSize: `${config.producerInfo.textStyle.fontSize * scale}px`,
                        fontFamily: config.producerInfo.textStyle.fontFamily,
                        fontWeight: config.producerInfo.textStyle.isBold ? 'bold' : 'normal',
                    }}
            >
                <div dangerouslySetInnerHTML={{ __html: config.producerInfo.content }} />
            </DraggableComponent>
    )
}