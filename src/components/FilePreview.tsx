"use client";

import { useState, useEffect } from 'react'
import { File, FileImage, FileVideo, FilePdf } from '@phosphor-icons/react'

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return FileImage
  if (fileType.startsWith('video/')) return FileVideo
  if (fileType === 'application/pdf') return FilePdf
  return File
}

interface FilePreviewProps {
  file: File
}

export function FilePreview({ file }: FilePreviewProps) {
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [file])

  const IconComponent = getFileIcon(file.type)

  return (
    <div className="relative group">
      {file.type.startsWith('image/') && preview ? (
        <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-default-100">
          <img
            src={preview}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-48 h-32 rounded-lg bg-default-100 flex flex-col items-center justify-center">
          <IconComponent size={32} className="text-default-500" />
          <span className="text-xs text-default-500 mt-2 text-center px-2 truncate max-w-full">
            {file.name}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <span className="text-white text-xs">{file.name}</span>
      </div>
    </div>
  )
} 