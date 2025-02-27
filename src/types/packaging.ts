export type EggSize = 'S' | 'M' | 'L' | 'XL' | 'JUMBO'
export type PackagingSize = '6' | '12' | '18' | '30' | '60'
export type FontFamily = 'Arial' | 'Helvetica' | 'Verdana' | 'Georgia' | 'Times New Roman' | 'Courier New' | 'Impact'
export type FlapPosition = 'sides' | 'topbottom'

export interface Position {
    x: number
    y: number
}

export interface Size {
    width: number
    height: number
}

export interface TextStyle {
    fontSize: number
    color: string
    fontFamily: FontFamily
    isBold: boolean
}

export interface ComponentConfig {
    position: Position
    size?: Size
    isResizable?: boolean
    isDraggable?: boolean
    rotation?: number // Added rotation property
}

export interface FlapConfig {
    position: FlapPosition
    logoScale: number
    logoRotation: number
}

export interface NutritionalInfo {
    htmlContent: string
    textColor: string
    backgroundColor: string
    textStyle: TextStyle
    componentConfig: ComponentConfig
}

export interface BarcodeInfo {
    values: {
        [key in PackagingSize]: string
    }
}

export interface CentralStripConfig extends ComponentConfig {
    width: number
    height: number
    borderRadius: number
}

export interface PackagingConfig {
    // Basic info - removed companyName property
    colorBySize: {
        S: string
        M: string
        L: string
        XL: string
        JUMBO: string
    }
    gradeColor: string
    eggSize: EggSize
    packagingSize: PackagingSize
    logoComponentConfig: ComponentConfig
    logoScale: number
    backgroundImage: File | null
    backgroundOpacity: number
    brandLogoImage: File | null
    flapLogoImage: File | null
    certificationImage: File | null
    barcode: BarcodeInfo
    expiryDate: string
    showSideFlaps: boolean
    showFoldingLines: boolean
    showGrid: boolean // Added grid support
    flapConfig: FlapConfig
    centralStripConfig: CentralStripConfig
    gridSize: number // Grid size for alignment

    // Text styles
    mainTextStyle: TextStyle
    sizeTextStyle: TextStyle
    countTextStyle: TextStyle
    weightTextStyle: TextStyle

    // Text configuration
    mainCaption: string
    eggCount: string // Auto-set based on packagingSize
    gradeText: string
    eggSizeText: string // Auto-set based on eggSize
    weightText: string // Auto-set based on eggSize

    // Nutritional info
    nutritionalInfo: NutritionalInfo

    // Producer info with styling
    producerInfo: {
        content: string
        textStyle: TextStyle
        componentConfig: ComponentConfig
    }

    // Additional info
    storageInstructions: string
    storageInstructionsConfig: ComponentConfig
    certificationText: string
    regNumber: string
    gradeConfig: ComponentConfig
    barcodeConfig: ComponentConfig

    // Customizable elements array for fully editable components
    customElements: Array<{
        id: string
        type: 'text' | 'shape' | 'image'
        content: string
        backgroundColor?: string
        borderColor?: string
        borderWidth?: number
        borderRadius?: number
        rotation: number
        textStyle?: TextStyle
        componentConfig: ComponentConfig
    }>
}