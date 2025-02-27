'use client'

import React from 'react';

interface GridOverlayProps {
    width: number;
    height: number;
    gridSize: number;
    scale: number;
    visible: boolean;
}

export function GridOverlay({ width, height, gridSize, scale, visible }: GridOverlayProps) {
    if (!visible) return null;

    // Scale and adjust the grid size
    const scaledGridSize = gridSize * scale;

    // Calculate number of horizontal and vertical lines
    const hLines = Math.floor(height / scaledGridSize);
    const vLines = Math.floor(width / scaledGridSize);

    return (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
                {/* Horizontal grid lines */}
                {Array.from({ length: hLines + 1 }).map((_, index) => (
                        <div
                                key={`h-${index}`}
                                className="absolute left-0 right-0 border-t border-dashed"
                                style={{
                                    borderColor: 'rgba(100, 100, 255, 0.3)',
                                    top: `${index * scaledGridSize}px`,
                                    height: '0',
                                }}
                        />
                ))}

                {/* Vertical grid lines */}
                {Array.from({ length: vLines + 1 }).map((_, index) => (
                        <div
                                key={`v-${index}`}
                                className="absolute top-0 bottom-0 border-l border-dashed"
                                style={{
                                    borderColor: 'rgba(100, 100, 255, 0.3)',
                                    left: `${index * scaledGridSize}px`,
                                    width: '0',
                                }}
                        />
                ))}

                {/* Grid size indicator */}
                <div
                        className="absolute bottom-1 right-1 bg-white px-2 py-1 text-xs rounded shadow"
                        style={{
                            color: 'rgba(100, 100, 255, 0.9)',
                            borderColor: 'rgba(100, 100, 255, 0.3)',
                            border: '1px solid',
                            opacity: 0.8
                        }}
                >
                    Grid: {gridSize}px
                </div>
            </div>
    );
}