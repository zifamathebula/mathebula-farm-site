'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PackagingCanvas } from '@/components/PackagingCanvas'
import { ControlPanel } from '@/components/ControlPanel'
import { PackagingConfig, EggSize, PackagingSize, FontFamily, FlapPosition } from '@/types/packaging'
import HistoryManager from '@/utils/historyManager'
import { exportToPng, exportToPdf } from '@/utils/exportToImage'

export default function Home() {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [editMode, setEditMode] = useState(false)
    const [historyManager, setHistoryManager] = useState<HistoryManager | null>(null)

    // Helper function to get flap position based on packaging size
    const getFlapPosition = (size: PackagingSize): FlapPosition => {
        if (size === '30') {
            return 'sides'
        } else {
            return 'topbottom'
        }
    }

    const initialConfig: PackagingConfig = {
        // Basic info
        companyName: '', // Removed company name as requested
        colorBySize: {
            'S': '#689F38', // Greens for smaller eggs
            'M': '#8BC34A',
            'L': '#4CAF50',
            'XL': '#43A047',
            'JUMBO': '#2E7D32' // Darker green for jumbo
        },
        gradeColor: '#E53935', // Red from reference image
        eggSize: 'XL' as EggSize,
        packagingSize: '12' as PackagingSize, // Changed to 12 to match the image
        logoComponentConfig: {
            position: { x: 20, y: 20 },
            size: { width: 80, height: 80 },
            isDraggable: true,
            isResizable: true
        },
        backgroundImage: null,
        backgroundOpacity: 0.9,
        brandLogoImage: null,
        flapLogoImage: null,
        certificationImage: null,
        barcode: {
            values: {
                '30': '1234567890123',
                '18': '2234567890123',
                '12': '3234567890123',
                '6': '4234567890123'
            }
        },
        expiryDate: '',
        logoScale: 1,
        showSideFlaps: true,
        showFoldingLines: true,
        flapConfig: {
            position: 'sides',
            logoScale: 2, // Default set to 2 as requested
            logoRotation: 0
        },
        centralStripConfig: {
            position: { x: 100, y: 50 }, // Adjusted to be more centered
            width: 220, // Wider to match the Eggs Fresh design
            height: 150,
            borderRadius: 0, // Remove rounded corners
            isDraggable: true,
            isResizable: true
        },

        // Text styles - updated to match Eggs Fresh design
        mainTextStyle: {
            fontSize: 14,
            color: '#000000', // Black text
            fontFamily: 'Arial' as FontFamily,
            isBold: true
        },
        sizeTextStyle: {
            fontSize: 18,
            color: '#000000', // Black text
            fontFamily: 'Georgia' as FontFamily, // Script style for "fresh"
            isBold: false
        },
        countTextStyle: {
            fontSize: 32,
            color: '#4CAF50', // Green for EGGS text
            fontFamily: 'Arial' as FontFamily,
            isBold: true
        },
        weightTextStyle: {
            fontSize: 12,
            color: '#000000', // Black text
            fontFamily: 'Arial' as FontFamily,
            isBold: true
        },

        // Text configuration
        mainCaption: '',
        eggCount: '12',
        gradeText: 'A',
        eggSizeText: 'LARGE',
        weightText: 'PREMIUM QUALITY',

        // Typical nutritional info - updated with smaller text
        nutritionalInfo: {
            htmlContent: `
        <div style="font-size: 7px; line-height: 1.2;">
          <h4 style="margin-bottom: 2px; font-weight: bold; font-size: 8px;">NUTRITIONAL INFORMATION</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 7px;">
            <tr>
              <td></td>
              <td style="text-align: center;">Per 100g</td>
              <td style="text-align: center;">Per 50g egg</td>
            </tr>
            <tr>
              <td>Energy (kJ)</td>
              <td style="text-align: center;">612</td>
              <td style="text-align: center;">306</td>
            </tr>
            <tr>
              <td>Protein (g)</td>
              <td style="text-align: center;">12.5</td>
              <td style="text-align: center;">6.3</td>
            </tr>
            <tr>
              <td>Total Fat (g)</td>
              <td style="text-align: center;">9.5</td>
              <td style="text-align: center;">4.8</td>
            </tr>
            <tr>
              <td>- Saturated (g)</td>
              <td style="text-align: center;">3.1</td>
              <td style="text-align: center;">1.6</td>
            </tr>
            <tr>
              <td>Carbohydrates (g)</td>
              <td style="text-align: center;">0.6</td>
              <td style="text-align: center;">0.3</td>
            </tr>
            <tr>
              <td>- Sugars (g)</td>
              <td style="text-align: center;">0.6</td>
              <td style="text-align: center;">0.3</td>
            </tr>
            <tr>
              <td>Sodium (mg)</td>
              <td style="text-align: center;">124</td>
              <td style="text-align: center;">62</td>
            </tr>
          </table>
        </div>
      `,
            textColor: '#000000',
            backgroundColor: 'rgba(255,255,255,0.95)',
            textStyle: {
                fontSize: 7, // Smaller text size
                color: '#000000',
                fontFamily: 'Arial' as FontFamily,
                isBold: false
            },
            componentConfig: {
                position: { x: 20, y: 110 },
                size: { width: 80, height: 90 }, // Adjusted size
                isDraggable: true,
                isResizable: true
            }
        },

        // Producer info with styling
        producerInfo: {
            content: 'Produced by Mathebula Farming Projects, Pretoria Rural, South Africa',
            textStyle: {
                fontSize: 8, // Smaller text
                color: '#333333',
                fontFamily: 'Arial' as FontFamily,
                isBold: false
            },
            componentConfig: {
                position: { x: 20, y: 280 },
                size: { width: 150, height: 20 },
                isDraggable: true,
                isResizable: true
            }
        },

        // Additional info
        storageInstructions: 'KEEP COOL TO RETAIN FRESHNESS',
        storageInstructionsConfig: {
            position: { x: 200, y: 230 },
            isDraggable: true
        },
        certificationText: 'Certified Proudly South African',
        regNumber: 'Reg. No. 12345/ABC',
        gradeConfig: {
            position: { x: 320, y: 30 }, // Positioned in the corner of central strip
            size: { width: 40, height: 40 }, // Added size for resizing
            isDraggable: true,
            isResizable: true // Made resizable as requested
        },
        barcodeConfig: {
            position: { x: 70, y: 240 },
            size: { width: 80, height: 40 },
            isDraggable: true,
            isResizable: true
        }
    };

    const [config, setConfig] = useState<PackagingConfig>(initialConfig);
    const [dimensions, setDimensions] = useState({ width: 600, height: 300 });

    useEffect(() => {
        // Initialize history manager with initial config
        setHistoryManager(new HistoryManager(initialConfig));
    }, []);

    // Update egg count based on packaging size
    useEffect(() => {
        setConfig(prev => ({
            ...prev,
            eggCount: prev.packagingSize,
            // Update flap position based on packaging size
            flapConfig: {
                ...prev.flapConfig,
                position: getFlapPosition(prev.packagingSize)
            }
        }));
    }, [config.packagingSize]);

    // Auto-set egg size text and weight based on egg size
    useEffect(() => {
        let sizeText = '';
        let weightText = '';

        switch(config.eggSize) {
            case 'S':
                sizeText = 'SMALL';
                weightText = '>43g';
                break;
            case 'M':
                sizeText = 'MEDIUM';
                weightText = '>49g';
                break;
            case 'L':
                sizeText = 'LARGE';
                weightText = '>55g';
                break;
            case 'XL':
                sizeText = 'EXTRA LARGE';
                weightText = '>59g';
                break;
            case 'JUMBO':
                sizeText = 'JUMBO';
                weightText = '>65g';
                break;
        }

        if (sizeText !== config.eggSizeText || weightText !== config.weightText) {
            setConfig(prev => ({
                ...prev,
                eggSizeText: sizeText,
                weightText: weightText
            }));
        }
    }, [config.eggSize, config.eggSizeText, config.weightText]);

    // Update dimensions based on packaging size
    useEffect(() => {
        switch(config.packagingSize) {
            case '30':
                setDimensions({ width: 600, height: 300 });
                break;
            case '18':
                setDimensions({ width: 500, height: 250 });
                break;
            case '12':
                setDimensions({ width: 400, height: 220 });
                break;
            case '6':
                setDimensions({ width: 300, height: 200 });
                break;
        }
    }, [config.packagingSize]);

    const handleConfigChange = (newConfig: PackagingConfig) => {
        setConfig(newConfig);

        // Add to history manager
        if (historyManager) {
            historyManager.addState(newConfig);
        }
    };

    const handleUndo = () => {
        if (historyManager && historyManager.canUndo()) {
            const previousConfig = historyManager.undo();
            if (previousConfig) {
                // Preserve the current file objects
                setConfig({
                    ...previousConfig,
                    backgroundImage: config.backgroundImage,
                    brandLogoImage: config.brandLogoImage,
                    flapLogoImage: config.flapLogoImage,
                    certificationImage: config.certificationImage
                });
            }
        }
    };

    const handleRedo = () => {
        if (historyManager && historyManager.canRedo()) {
            const nextConfig = historyManager.redo();
            if (nextConfig) {
                // Preserve the current file objects
                setConfig({
                    ...nextConfig,
                    backgroundImage: config.backgroundImage,
                    brandLogoImage: config.brandLogoImage,
                    flapLogoImage: config.flapLogoImage,
                    certificationImage: config.certificationImage
                });
            }
        }
    };

    const handleExportToPng = () => {
        // Temporarily disable edit mode for clean export
        setEditMode(false);

        // Wait for re-render before exporting
        setTimeout(() => {
            exportToPng(canvasRef).finally(() => {
                // Restore edit mode if it was on
                setEditMode(editMode);
            });
        }, 100);
    };

    const handleExportToPdf = () => {
        // Temporarily disable edit mode for clean export
        setEditMode(false);

        // Wait for re-render before exporting
        setTimeout(() => {
            exportToPdf(canvasRef, dimensions, config.packagingSize).finally(() => {
                // Restore edit mode if it was on
                setEditMode(editMode);
            });
        }, 100);
    };

    return (
            <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100">
                <h1 className="text-3xl font-bold mb-4">Egg Packaging Designer</h1>

                <div className="flex items-center gap-2 mb-4 w-full max-w-6xl">
                    <button
                            onClick={() => setEditMode(!editMode)}
                            className={`px-4 py-2 rounded-md ${editMode
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'}`}
                    >
                        {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                    </button>

                    <button
                            onClick={handleUndo}
                            disabled={!historyManager?.canUndo()}
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                    >
                        Undo
                    </button>

                    <button
                            onClick={handleRedo}
                            disabled={!historyManager?.canRedo()}
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                    >
                        Redo
                    </button>

                    <div className="flex-grow"></div>

                    <button
                            onClick={handleExportToPng}
                            className="px-4 py-2 rounded-md bg-green-600 text-white"
                    >
                        Export as PNG
                    </button>

                    <button
                            onClick={handleExportToPdf}
                            className="px-4 py-2 rounded-md bg-red-600 text-white"
                    >
                        Export as PDF
                    </button>
                </div>

                <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
                    <div className="w-full md:w-2/3">
                        <PackagingCanvas
                                config={config}
                                setConfig={handleConfigChange}
                                canvasRef={canvasRef}
                                editMode={editMode}
                                dimensions={dimensions}
                        />
                    </div>

                    <div className="w-full md:w-1/3">
                        <ControlPanel
                                config={config}
                                setConfig={handleConfigChange}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                onUndo={handleUndo}
                                onRedo={handleRedo}
                                canUndo={historyManager?.canUndo() || false}
                                canRedo={historyManager?.canRedo() || false}
                                onExportToPng={handleExportToPng}
                                onExportToPdf={handleExportToPdf}
                        />
                    </div>
                </div>
            </main>
    );
}