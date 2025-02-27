'use client'

import React from 'react';

interface BarcodeComponentProps {
    barcodeText: string;
    scale: number;
}

export function BarcodeComponent({
                                     barcodeText,
                                     scale
                                 }: BarcodeComponentProps) {
    return (
            <div className="w-full h-full flex flex-col items-center justify-center">
                {/* Simple barcode visualization */}
                <div className="w-full flex flex-col items-center">
                    <div
                            style={{
                                width: '90%',
                                height: `${15 * scale}px`,
                                display: 'flex',
                                overflow: 'hidden',
                            }}
                    >
                        {/* Generate pseudo-barcode lines from the barcode text */}
                        {barcodeText.split('').map((char, index) => {
                            const thickness = parseInt(char) % 3 + 1;
                            return (
                                    <div
                                            key={index}
                                            style={{
                                                width: `${thickness * scale}px`,
                                                height: '100%',
                                                backgroundColor: 'black',
                                                marginRight: `${scale}px`,
                                            }}
                                    />
                            );
                        })}
                    </div>

                    {/* Barcode number */}
                    <div
                            className="text-center mt-1"
                            style={{
                                fontSize: `${8 * scale}px`,
                            }}
                    >
                        {barcodeText || 'Barcode Area'}
                    </div>
                </div>
            </div>
    );
}