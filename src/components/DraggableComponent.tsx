'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ComponentConfig } from '@/types/packaging'

interface DraggableComponentProps {
    componentConfig: ComponentConfig
    onUpdate: (config: ComponentConfig) => void
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
    scale: number
    canvasRef: React.RefObject<HTMLDivElement>
    editMode: boolean
    showRotationHandle?: boolean
}

export function DraggableComponent({
                                       componentConfig,
                                       onUpdate,
                                       children,
                                       className = '',
                                       style = {},
                                       scale,
                                       canvasRef,
                                       editMode,
                                       showRotationHandle = true
                                   }: DraggableComponentProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    const [isRotating, setIsRotating] = useState(false)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })
    const [startSize, setStartSize] = useState({ width: 0, height: 0 })
    const [startAngle, setStartAngle] = useState(0)
    const [startRotation, setStartRotation] = useState(0)
    const componentRef = useRef<HTMLDivElement>(null)

    // Apply dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!editMode || !componentConfig.isDraggable) return
        e.preventDefault()
        e.stopPropagation()

        const canvasRect = canvasRef.current?.getBoundingClientRect()
        if (!canvasRect) return

        setIsDragging(true)
        setStartPos({
            x: e.clientX - (componentConfig.position.x * scale),
            y: e.clientY - (componentConfig.position.y * scale)
        })
    }

    // Apply resizing
    const handleResizeMouseDown = (e: React.MouseEvent) => {
        if (!editMode || !componentConfig.isResizable) return
        e.preventDefault()
        e.stopPropagation()

        setIsResizing(true)
        setStartPos({
            x: e.clientX,
            y: e.clientY
        })
        setStartSize({
            width: componentConfig.size?.width || 0,
            height: componentConfig.size?.height || 0
        })
    }

    // Apply rotation
    const handleRotateMouseDown = (e: React.MouseEvent) => {
        if (!editMode) return
        e.preventDefault()
        e.stopPropagation()

        setIsRotating(true)

        // Get the center of the component for rotation calculations
        const rect = componentRef.current?.getBoundingClientRect()
        if (!rect) return

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate the starting angle
        const angle = Math.atan2(
                e.clientY - centerY,
                e.clientX - centerX
        ) * (180 / Math.PI)

        setStartAngle(angle)
        setStartRotation(componentConfig.rotation || 0)
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const canvasRect = canvasRef.current?.getBoundingClientRect()
                if (!canvasRect) return

                // Calculate new position within canvas boundaries
                let newX = (e.clientX - startPos.x) / scale
                let newY = (e.clientY - startPos.y) / scale

                // Ensure the component stays within the canvas
                newX = Math.max(0, Math.min(newX, (canvasRect.width / scale) - (componentRef.current?.offsetWidth || 0) / scale))
                newY = Math.max(0, Math.min(newY, (canvasRect.height / scale) - (componentRef.current?.offsetHeight || 0) / scale))

                onUpdate({
                    ...componentConfig,
                    position: { x: newX, y: newY }
                })
            } else if (isResizing && componentConfig.size) {
                const deltaX = (e.clientX - startPos.x) / scale
                const deltaY = (e.clientY - startPos.y) / scale

                const newWidth = Math.max(20, startSize.width + deltaX)
                const newHeight = Math.max(20, startSize.height + deltaY)

                onUpdate({
                    ...componentConfig,
                    size: { width: newWidth, height: newHeight }
                })
            } else if (isRotating) {
                const rect = componentRef.current?.getBoundingClientRect()
                if (!rect) return

                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2

                // Calculate the current angle
                const angle = Math.atan2(
                        e.clientY - centerY,
                        e.clientX - centerX
                ) * (180 / Math.PI)

                // Calculate the angle change and add to the original rotation
                const rotation = (startRotation + angle - startAngle) % 360

                onUpdate({
                    ...componentConfig,
                    rotation: rotation
                })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            setIsResizing(false)
            setIsRotating(false)
        }

        if (isDragging || isResizing || isRotating) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging, isResizing, isRotating, startPos, componentConfig, onUpdate, scale, canvasRef, startSize, startAngle, startRotation])

    const rotation = componentConfig.rotation || 0;

    const combinedStyle: React.CSSProperties = {
        ...style,
        position: 'absolute',
        left: `${componentConfig.position.x * scale}px`,
        top: `${componentConfig.position.y * scale}px`,
        cursor: isDragging ? 'grabbing' : (editMode && componentConfig.isDraggable ? 'grab' : 'default'),
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center',
        ...(componentConfig.size ? {
            width: `${componentConfig.size.width * scale}px`,
            height: `${componentConfig.size.height * scale}px`,
        } : {}),
        ...(editMode ? {
            outline: '1px dashed rgba(0, 120, 255, 0.8)',
            zIndex: isDragging || isResizing || isRotating ? 1000 : 'auto',
        } : {})
    }

    return (
            <div
                    ref={componentRef}
                    className={`draggable-component ${className}`}
                    style={combinedStyle}
                    onMouseDown={handleMouseDown}
            >
                {children}

                {/* Resize handle if component is resizable */}
                {editMode && componentConfig.isResizable && (
                        <div
                                className="resize-handle"
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    width: '14px',
                                    height: '14px',
                                    backgroundColor: 'rgba(0, 120, 255, 0.8)',
                                    cursor: 'nwse-resize',
                                    borderRadius: '2px',
                                    zIndex: 1001
                                }}
                                onMouseDown={handleResizeMouseDown}
                        />
                )}

                {/* Rotation handle */}
                {editMode && showRotationHandle && (
                        <div
                                className="rotate-handle"
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: 'rgba(220, 50, 50, 0.8)',
                                    cursor: 'grab',
                                    borderRadius: '50%',
                                    zIndex: 1002
                                }}
                                onMouseDown={handleRotateMouseDown}
                        />
                )}
            </div>
    )
}