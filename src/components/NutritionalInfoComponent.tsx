'use client'

import React, { useEffect, useState } from 'react';
import { TextStyle } from '@/types/packaging';

interface NutritionalInfoComponentProps {
    htmlContent: string;
    textStyle: TextStyle;
    backgroundColor: string;
    textColor: string;
    componentWidth: number;
    scale: number;
}

export function NutritionalInfoComponent({
                                             htmlContent,
                                             textStyle,
                                             backgroundColor,
                                             textColor,
                                             componentWidth,
                                             scale
                                         }: NutritionalInfoComponentProps) {
    const [textScale, setTextScale] = useState(0.5); // Reduced by half as requested

    // Auto-adjust text scale based on component width - with reduced base scale
    useEffect(() => {
        let newScale = 0.5; // Start at 0.5 (half of original)
        if (componentWidth < 50) newScale = 0.25;
        else if (componentWidth < 80) newScale = 0.35;
        else if (componentWidth < 120) newScale = 0.4;
        else if (componentWidth < 160) newScale = 0.45;
        else newScale = 0.5;

        setTextScale(newScale);
    }, [componentWidth]);

    // Define a more compact nutritional info format if none is provided
    const defaultContent = `
    <div style="font-size: 7px; line-height: 1.1;">
      <h4 style="margin-bottom: 1px; font-weight: bold; font-size: 7px;">NUTRITIONAL INFORMATION</h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 6px;">
        <tr>
          <td></td>
          <td style="text-align: center;">Per 100g</td>
          <td style="text-align: center;">Per 50g</td>
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
    `;

    const contentToRender = htmlContent?.trim() ? htmlContent : defaultContent;

    return (
            <div
                    className="w-full h-full overflow-hidden p-1"
                    style={{
                        fontSize: `${(textStyle.fontSize * scale * textScale) || 6}px`, // Reduced font size
                        fontFamily: textStyle.fontFamily,
                        fontWeight: textStyle.isBold ? 'bold' : 'normal',
                        color: textColor,
                        lineHeight: 1.1
                    }}
                    dangerouslySetInnerHTML={{ __html: contentToRender }}
            />
    );
}