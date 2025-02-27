'use client'

import React from 'react';
import { TextStyle } from '@/types/packaging';

interface CentralStripComponentProps {
    color: string;
    eggCount: string;
    eggSizeText: string;
    weightText: string;
    countTextStyle: TextStyle;
    sizeTextStyle: TextStyle;
    weightTextStyle: TextStyle;
    mainTextStyle: TextStyle;
    scale: number;
    isCountFlipped?: boolean;
    isSizeFlipped?: boolean;
    isWeightFlipped?: boolean;
}

export function CentralStripComponent({
                                          color,
                                          eggCount,
                                          eggSizeText,
                                          weightText,
                                          countTextStyle,
                                          sizeTextStyle,
                                          weightTextStyle,
                                          mainTextStyle,
                                          scale,
                                          isCountFlipped = false,
                                          isSizeFlipped = false,
                                          isWeightFlipped = false
                                      }: CentralStripComponentProps) {
    return (
            <div className="relative w-full h-full">
                {/* Large EGGS text on top */}
                <div
                        className="absolute text-center"
                        style={{
                            top: '20%',
                            left: '50%',
                            transform: `translate(-50%, -50%)${isCountFlipped ? ' scaleX(-1)' : ''}`,
                            color: countTextStyle.color,
                            fontSize: `${countTextStyle.fontSize * 2 * scale}px`,
                            fontFamily: countTextStyle.fontFamily,
                            fontWeight: countTextStyle.isBold ? 'bold' : 'normal',
                            letterSpacing: '0.1em'
                        }}
                >
                    EGGS
                </div>

                {/* "fresh" text in script style below EGGS */}
                <div
                        className="absolute text-center"
                        style={{
                            top: '40%',
                            left: '50%',
                            transform: `translate(-50%, 0)${isSizeFlipped ? ' scaleX(-1)' : ''}`,
                            color: 'black',
                            fontSize: `${sizeTextStyle.fontSize * 2 * scale}px`,
                            fontFamily: 'Georgia',
                            fontStyle: 'italic',
                            fontWeight: 'normal',
                            width: '100%',
                        }}
                >
                    fresh
                </div>

                {/* Premium Quality text (or other weight text) */}
                <div
                        className="absolute text-center w-full"
                        style={{
                            top: '60%',
                            left: '50%',
                            transform: `translate(-50%, 0)${isWeightFlipped ? ' scaleX(-1)' : ''}`,
                            fontSize: `${weightTextStyle.fontSize * scale}px`,
                            color: 'black',
                            fontFamily: weightTextStyle.fontFamily,
                            fontWeight: weightTextStyle.isBold ? 'bold' : 'normal',
                            letterSpacing: '0.05em'
                        }}
                >
                    {weightText}
                </div>

                {/* Class A or Grade text (circular badge) */}
                <div
                        className="absolute"
                        style={{
                            top: '10%',
                            right: '10%',
                            backgroundColor: '#FFF',
                            borderRadius: '50%',
                            width: `${40 * scale}px`,
                            height: `${40 * scale}px`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: `2px solid ${color}`,
                            color: 'black',
                            fontSize: `${12 * scale}px`,
                            fontFamily: mainTextStyle.fontFamily,
                            fontWeight: 'bold',
                        }}
                >
                    <div>CLASS</div>
                    <div>A</div>
                </div>

                {/* Number of eggs indicator (circular badge) */}
                <div
                        className="absolute rounded-full bg-white flex items-center justify-center"
                        style={{
                            width: `${40 * scale}px`,
                            height: `${40 * scale}px`,
                            left: '10%',
                            top: '10%',
                            border: `2px solid ${color}`,
                            color: 'black',
                            fontSize: `${18 * scale}px`,
                            fontWeight: 'bold',
                        }}
                >
                    {eggCount}
                </div>

                {/* Removed 100% NATURAL certification mark as requested */}
            </div>
    );
}