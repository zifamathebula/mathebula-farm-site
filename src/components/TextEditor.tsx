'use client'

import React, { useRef, useState, useEffect } from 'react';
import { TextStyle, FontFamily } from '@/types/packaging';

interface TextEditorProps {
    label: string;
    htmlContent: string;
    textStyle: TextStyle;
    onChange: (htmlContent: string, textStyle: TextStyle) => void;
    darkMode?: boolean;
    placeholder?: string;
    allowFlip?: boolean;
    isFlipped?: boolean;
    onFlipChange?: (flipped: boolean) => void;
}

export function TextEditor({
                               label,
                               htmlContent,
                               textStyle,
                               onChange,
                               darkMode = false,
                               placeholder = 'Enter text here...',
                               allowFlip = false,
                               isFlipped = false,
                               onFlipChange
                           }: TextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showStyleOptions, setShowStyleOptions] = useState(false);
    const [localTextStyle, setLocalTextStyle] = useState<TextStyle>(textStyle);
    const [flipped, setFlipped] = useState(isFlipped);

    // Sync localTextStyle with props
    useEffect(() => {
        setLocalTextStyle(textStyle);
    }, [textStyle]);

    useEffect(() => {
        setFlipped(isFlipped);
    }, [isFlipped]);

    // Handle text content changes
    const updateContent = () => {
        if (editorRef.current) {
            const newContent = editorRef.current.innerHTML;
            onChange(newContent, localTextStyle);
        }
    };

    // Text style commands
    const handleBold = () => {
        document.execCommand('bold', false);
        updateContent();
    };

    const handleItalic = () => {
        document.execCommand('italic', false);
        updateContent();
    };

    const handleUnderline = () => {
        document.execCommand('underline', false);
        updateContent();
    };

    const handleAlign = (alignment: string) => {
        document.execCommand('justify' + alignment, false);
        updateContent();
    };

    const handleFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFontSize = parseInt(e.target.value) || 12;
        setLocalTextStyle({ ...localTextStyle, fontSize: newFontSize });
        onChange(htmlContent, { ...localTextStyle, fontSize: newFontSize });
    };

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setLocalTextStyle({ ...localTextStyle, color: newColor });
        onChange(htmlContent, { ...localTextStyle, color: newColor });
    };

    const handleFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFontFamily = e.target.value as FontFamily;
        setLocalTextStyle({ ...localTextStyle, fontFamily: newFontFamily });
        onChange(htmlContent, { ...localTextStyle, fontFamily: newFontFamily });
    };

    const handleBoldToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isBold = e.target.checked;
        setLocalTextStyle({ ...localTextStyle, isBold });
        onChange(htmlContent, { ...localTextStyle, isBold });
    };

    const handleFlipToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFlipped = e.target.checked;
        setFlipped(newFlipped);
        if (onFlipChange) {
            onFlipChange(newFlipped);
        }
    };

    // Apply WYSIWYG styles to editor content
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.style.fontFamily = localTextStyle.fontFamily;
            editorRef.current.style.color = localTextStyle.color;
            editorRef.current.style.fontSize = `${localTextStyle.fontSize}px`;
            editorRef.current.style.fontWeight = localTextStyle.isBold ? 'bold' : 'normal';
            editorRef.current.style.transform = flipped ? 'scale(-1, 1)' : 'none';
        }
    }, [localTextStyle, isEditing, flipped]);

    return (
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-900">{label}</label>
                    <button
                            type="button"
                            onClick={() => setShowStyleOptions(!showStyleOptions)}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                    >
                        {showStyleOptions ? 'Hide Styling' : 'Style Options'}
                    </button>
                </div>

                {showStyleOptions && (
                        <div className="bg-gray-200 rounded-t-md p-3 border border-gray-400">
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-xs text-gray-900">Font Size</label>
                                    <input
                                            type="number"
                                            min="8"
                                            max="72"
                                            value={localTextStyle.fontSize}
                                            onChange={handleFontSize}
                                            className="w-full p-1 border border-gray-400 rounded text-sm bg-white text-gray-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-900">Text Color</label>
                                    <input
                                            type="color"
                                            value={localTextStyle.color}
                                            onChange={handleColor}
                                            className="w-full p-0 h-7 border border-gray-400 rounded"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="block text-xs text-gray-900">Font Family</label>
                                <select
                                        value={localTextStyle.fontFamily}
                                        onChange={handleFontFamily}
                                        className="w-full p-1 border border-gray-400 rounded text-sm bg-white text-gray-900"
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Impact">Impact</option>
                                </select>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center">
                                    <input
                                            type="checkbox"
                                            id={`bold-${label.replace(/\s+/g, '-').toLowerCase()}`}
                                            checked={localTextStyle.isBold}
                                            onChange={handleBoldToggle}
                                            className="mr-2"
                                    />
                                    <label
                                            htmlFor={`bold-${label.replace(/\s+/g, '-').toLowerCase()}`}
                                            className="text-xs text-gray-900"
                                    >
                                        Bold Text
                                    </label>
                                </div>

                                {allowFlip && (
                                        <div className="flex items-center">
                                            <input
                                                    type="checkbox"
                                                    id={`flip-${label.replace(/\s+/g, '-').toLowerCase()}`}
                                                    checked={flipped}
                                                    onChange={handleFlipToggle}
                                                    className="mr-2"
                                            />
                                            <label
                                                    htmlFor={`flip-${label.replace(/\s+/g, '-').toLowerCase()}`}
                                                    className="text-xs text-gray-900"
                                            >
                                                Flip Text Horizontally
                                            </label>
                                        </div>
                                )}
                            </div>
                        </div>
                )}

                <div className="flex flex-wrap gap-1 p-1 bg-gray-300 border-x border-t border-gray-400 rounded-t-md">
                    <button
                            onClick={handleBold}
                            className="px-2 py-1 bg-white border border-gray-400 rounded hover:bg-gray-100 text-gray-900"
                            type="button"
                            title="Bold"
                    >
                        B
                    </button>
                    <button
                            onClick={handleItalic}
                            className="px-2 py-1 bg-white border border-gray-400 rounded hover:bg-gray-100 text-gray-900 italic"
                            type="button"
                            title="Italic"
                    >
                        I
                    </button>
                    <button
                            onClick={handleUnderline}
                            className="px-2 py-1 bg-white border border-gray-400 rounded hover:bg-gray-100 text-gray-900 underline"
                            type="button"
                            title="Underline"
                    >
                        U
                    </button>
                    <button
                            onClick={() => handleAlign('Left')}
                            className="px-2 py-1 bg-white border border-gray-400 rounded hover:bg-gray-100 text-gray-900"
                            type="button"
                            title="Align Left"
                    >
                        ←
                    </button>
                    <button
                            onClick={() => handleAlign('Center')}
                            className="px-2 py-1 bg-white border border-gray-400 rounded hover:bg-gray-100 text-gray-900"
                            type="button"
                            title="Align Center"
                    >
                        ↔
                    </button>
                    <button
                            onClick={() => handleAlign('Right')}
                            className="px-2 py-1 bg-white border border-gray-400 rounded hover:bg-gray-100 text-gray-900"
                            type="button"
                            title="Align Right"
                    >
                        →
                    </button>
                    <span className="flex-grow"></span>
                    <span className="text-xs flex items-center px-2 text-gray-900">
          {localTextStyle.fontFamily}, {localTextStyle.fontSize}px
        </span>
                </div>

                <div
                        ref={editorRef}
                        className={`p-2 min-h-24 border-x border-b border-gray-400 rounded-b-md ${
                                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        }`}
                        contentEditable={true}
                        onInput={updateContent}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                        dangerouslySetInnerHTML={{ __html: htmlContent || placeholder }}
                        style={{
                            fontFamily: localTextStyle.fontFamily,
                            fontSize: `${localTextStyle.fontSize}px`,
                            color: localTextStyle.color,
                            fontWeight: localTextStyle.isBold ? 'bold' : 'normal',
                            transform: flipped ? 'scale(-1, 1)' : 'none',
                        }}
                />

                <p className="text-xs text-gray-700 mt-1">
                    Click inside the editor to make changes. Use the toolbar for formatting.
                </p>
            </div>
    );
}