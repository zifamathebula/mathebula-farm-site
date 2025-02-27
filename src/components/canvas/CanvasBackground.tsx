'use client'

import React from 'react'

interface CanvasBackgroundProps {
    backgroundImage: File | null
    backgroundOpacity: number
    isClient: boolean
}

export function CanvasBackground({
                                     backgroundImage,
                                     backgroundOpacity,
                                     isClient
                                 }: CanvasBackgroundProps) {
    return (
            <div className="absolute inset-0" style={{ backgroundColor: 'white' }}>
                {/* Egg background image */}
                {isClient && backgroundImage && (
                        <img
                                src={URL.createObjectURL(backgroundImage)}
                                alt="Background"
                                className="w-full h-full object-cover"
                                style={{ opacity: backgroundOpacity }}
                        />
                )}
            </div>
    )
}