import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Function to export canvas as PNG image
export const exportToPng = async (canvasRef: React.RefObject<HTMLDivElement>): Promise<void> => {
    if (!canvasRef.current) return;

    try {
        const canvas = await html2canvas(canvasRef.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Allow images from other domains
            allowTaint: true,
            backgroundColor: '#FFFFFF',
        });

        // Convert to data URL and download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'egg-packaging-design.png';
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Error exporting to PNG:', error);
        alert('Failed to export as PNG. Please try again.');
    }
};

// Function to export canvas as PDF
export const exportToPdf = async (
        canvasRef: React.RefObject<HTMLDivElement>,
        dimensions: { width: number, height: number },
        packagingSize: string
): Promise<void> => {
    if (!canvasRef.current) return;

    try {
        const canvas = await html2canvas(canvasRef.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Allow images from other domains
            allowTaint: true,
            backgroundColor: '#FFFFFF',
        });

        // Calculate PDF dimensions - maintaining aspect ratio
        const imgData = canvas.toDataURL('image/png');
        let orientation: "p" | "portrait" | "l" | "landscape" = 'l';
        let pdfWidth = 297; // A4 landscape width in mm
        let pdfHeight = 210; // A4 landscape height in mm

        if (dimensions.height > dimensions.width) {
            orientation = 'p';
            pdfWidth = 210; // A4 portrait width
            pdfHeight = 297; // A4 portrait height
        }

        const pdf = new jsPDF({
            orientation: orientation,
            unit: 'mm',
        });

        // Calculate scaling to fit within PDF while maintaining aspect ratio
        const imgWidth = dimensions.width;
        const imgHeight = dimensions.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.9; // 90% of available space

        // Add title
        pdf.setFontSize(16);
        pdf.text(`Egg Packaging Design - ${packagingSize} Eggs`, 10, 10);

        // Add image
        pdf.addImage(
                imgData,
                'PNG',
                10,
                20,
                imgWidth * ratio,
                imgHeight * ratio
        );

        // Add dimensions info
        pdf.setFontSize(10);
        pdf.text(`Actual Dimensions: ${dimensions.width}mm × ${dimensions.height}mm`, 10, imgHeight * ratio + 30);

        // Add date
        const date = new Date().toLocaleDateString();
        pdf.text(`Generated on: ${date}`, 10, imgHeight * ratio + 40);

        // Save PDF
        pdf.save('egg-packaging-design.pdf');
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        alert('Failed to export as PDF. Please try again.');
    }
};