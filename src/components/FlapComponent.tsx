'use client'

import React from 'react';
import { FlapPosition } from '@/types/packaging';
import { BarcodeComponent } from './BarcodeComponent';

interface FlapComponentProps {
    position: FlapPosition;
    color: string;
    logoScale: number;
    logoRotation: number;
    brandLogoImage: File | null;
    flapLogoImage: File | null;
    eggCount: string;
    eggSizeText: string;
    showFoldingLines: boolean;
    scale: number;
    dimensions: { width: number; height: number };
    editMode: boolean;
    onLogoClick: () => void;
    isFlipped?: boolean;
    barcodeText: string;
    showSpacing?: boolean; // Added to show spacing in edit mode
}

export function FlapComponent({
                                  position,
                                  color,
                                  logoScale,
                                  logoRotation,
                                  brandLogoImage,
                                  flapLogoImage,
                                  eggCount,
                                  eggSizeText,
                                  showFoldingLines,
                                  scale,
                                  dimensions,
                                  editMode,
                                  onLogoClick,
                                  isFlipped = false,
                                  barcodeText,
                                  showSpacing = false
                              }: FlapComponentProps) {
    const logoStyle = {
        transform: `scale(${logoScale}) rotate(${logoRotation}deg)${isFlipped ? ' scaleX(-1)' : ''}`,
        transformOrigin: 'center',
    };

    // Helper to check if we're on client-side
    const isClient = typeof window !== 'undefined';

    // Render the logo
    const renderLogo = () => (
            <div
                    style={{
                        ...logoStyle,
                        cursor: editMode ? 'pointer' : 'default',
                    }}
                    onClick={editMode ? onLogoClick : undefined}
            >
                {isClient && flapLogoImage ? (
                        <img
                                src={URL.createObjectURL(flapLogoImage)}
                                alt="Flap Logo"
                                className="w-8 h-8 object-contain"
                        />
                ) : isClient && brandLogoImage ? (
                        <img
                                src={URL.createObjectURL(brandLogoImage)}
                                alt="Brand Logo"
                                className="w-8 h-8 object-contain"
                        />
                ) : (
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span style={{ fontSize: '6px', color }}>LOGO</span>
                        </div>
                )}
            </div>
    );

    // Render barcode component on flaps
    const renderBarcode = () => (
            <div className="w-full">
                <BarcodeComponent barcodeText={barcodeText} scale={scale * 0.5} />
            </div>
    );

    // Set the flap width and show spacing in edit mode
    const flapWidth = 12; // Base width in standard units
    const flapSpacingClass = showSpacing && editMode ? 'border border-dashed border-blue-400' : '';

    if (position === 'sides') {
        return (
                <>
                    {/* Left side flap */}
                    <div
                            className={`absolute top-0 bottom-0 left-0 flex flex-col items-start ${flapSpacingClass}`}
                            style={{
                                backgroundColor: color,
                                color: 'white',
                                width: `${flapWidth * scale}px`,
                                zIndex: 10
                            }}
                    >
                        {/* Content wrapper - correctly oriented for reading when folded */}
                        <div
                                className="flex flex-col justify-between items-start h-full w-full"
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    transform: `rotate(90deg) translateY(-100%)`,
                                    transformOrigin: '0 0',
                                    width: dimensions.height,
                                    height: `${flapWidth * scale}px`,
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                }}
                        >
                            {/* Logo and text in a row */}
                            <div className="flex items-center justify-between w-full p-1">
                                {/* Logo on left */}
                                <div className="mr-2">{renderLogo()}</div>

                                {/* Text in middle */}
                                <div
                                        className="text-center flex-grow"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: `${10 * scale}px`,
                                            transform: isFlipped ? 'scaleX(-1)' : 'none',
                                        }}
                                >
                                    {eggCount} {eggSizeText} EGGS
                                </div>

                                {/* Barcode on right */}
                                <div className="w-1/3">
                                    {renderBarcode()}
                                </div>
                            </div>
                        </div>

                        {/* Folding line if enabled */}
                        {showFoldingLines && (
                                <div
                                        className="absolute top-0 bottom-0 right-0 border-r border-dashed"
                                        style={{ borderColor: 'rgba(0,0,0,0.3)' }}
                                ></div>
                        )}
                    </div>

                    {/* Right side flap */}
                    <div
                            className={`absolute top-0 bottom-0 right-0 flex flex-col items-start ${flapSpacingClass}`}
                            style={{
                                backgroundColor: color,
                                color: 'white',
                                width: `${flapWidth * scale}px`,
                                zIndex: 10
                            }}
                    >
                        {/* Content wrapper - correctly oriented for reading when folded */}
                        <div
                                className="flex flex-col justify-between items-start h-full w-full"
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    transform: `rotate(270deg) translateX(-100%)`,
                                    transformOrigin: '0 0',
                                    width: dimensions.height,
                                    height: `${flapWidth * scale}px`,
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                }}
                        >
                            {/* Logo and text in a row */}
                            <div className="flex items-center justify-between w-full p-1">
                                {/* Logo on left */}
                                <div className="mr-2">{renderLogo()}</div>

                                {/* Text in middle */}
                                <div
                                        className="text-center flex-grow"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: `${10 * scale}px`,
                                            transform: isFlipped ? 'scaleX(-1)' : 'none',
                                        }}
                                >
                                    {eggCount} {eggSizeText} EGGS
                                </div>

                                {/* Barcode on right */}
                                <div className="w-1/3">
                                    {renderBarcode()}
                                </div>
                            </div>
                        </div>

                        {/* Folding line if enabled */}
                        {showFoldingLines && (
                                <div
                                        className="absolute top-0 bottom-0 left-0 border-l border-dashed"
                                        style={{ borderColor: 'rgba(0,0,0,0.3)' }}
                                ></div>
                        )}
                    </div>
                </>
        );
    } else {
        return (
                <>
                    {/* Top flap */}
                    <div
                            className={`absolute top-0 left-0 right-0 flex flex-row items-center ${flapSpacingClass}`}
                            style={{
                                backgroundColor: color,
                                color: 'white',
                                height: `${flapWidth * scale}px`,
                                zIndex: 10
                            }}
                    >
                        <div className="flex flex-row justify-between items-center w-full p-2">
                            {/* Left side with logo */}
                            <div className="flex items-center">
                                <div className="mr-2">{renderLogo()}</div>
                                <div
                                        className="text-center"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: `${10 * scale}px`,
                                            transform: isFlipped ? 'scaleX(-1)' : 'none',
                                        }}
                                >
                                    {eggCount} {eggSizeText} EGGS
                                </div>
                            </div>

                            {/* Right side with barcode */}
                            <div className="w-1/3">
                                {renderBarcode()}
                            </div>
                        </div>

                        {/* Folding line if enabled */}
                        {showFoldingLines && (
                                <div
                                        className="absolute bottom-0 left-0 right-0 border-b border-dashed"
                                        style={{ borderColor: 'rgba(0,0,0,0.3)' }}
                                ></div>
                        )}
                    </div>

                    {/* Bottom flap */}
                    <div
                            className={`absolute bottom-0 left-0 right-0 flex flex-row items-center ${flapSpacingClass}`}
                            style={{
                                backgroundColor: color,
                                color: 'white',
                                height: `${flapWidth * scale}px`,
                                zIndex: 10
                            }}
                    >
                        <div className="flex flex-row justify-between items-center w-full p-2">
                            {/* Left side with logo */}
                            <div className="flex items-center">
                                <div className="mr-2">{renderLogo()}</div>
                                <div
                                        className="text-center"
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: `${10 * scale}px`,
                                            transform: isFlipped ? 'scaleX(-1)' : 'none',
                                        }}
                                >
                                    {eggCount} {eggSizeText} EGGS
                                </div>
                            </div>

                            {/* Right side with barcode */}
                            <div className="w-1/3">
                                {renderBarcode()}
                            </div>
                        </div>

                        {/* Folding line if enabled */}
                        {showFoldingLines && (
                                <div
                                        className="absolute top-0 left-0 right-0 border-t border-dashed"
                                        style={{ borderColor: 'rgba(0,0,0,0.3)' }}
                                ></div>
                        )}
                    </div>
                </>
        );
    }
}