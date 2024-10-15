'use client'

import React, { useState } from 'react'

interface FileAttachmentProps {
  id?: string
  name?: string
  required?: boolean
  onFileSelect: (file: File | null) => void
  acceptedTypes?: string
  maxSizeMB?: number
}

export function FileAttachment({
  id,
  name,
  required,
  onFileSelect,
  acceptedTypes = '',
  maxSizeMB = 5,
}: FileAttachmentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`ขนาดของไฟล์ควรไม่เกิน ${maxSizeMB} MB`)
        setSelectedFile(null)
        onFileSelect(null)
        return
      }
      setError(null)
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  return (
    <div className='relative flex w-full flex-col'>
      <div className='flex h-40 w-full items-center justify-center rounded-md border'>
        <div className='inline-flex items-center justify-center'>
          <span className='text-detail text-neutral-400'>Add File(s)</span>
        </div>
        <input
          id={id}
          name={name}
          required={required}
          className='absolute inset-0 opacity-0'
          accept={acceptedTypes}
          type='file'
          onChange={handleFileChange}
        />
      </div>
      {selectedFile && (
        <p className='my-2 hidden w-full text-sm italic text-red-600'>
          จำเป็นต้องอัพโหลดไฟล์
        </p>
      )}
      {error && <p className=''>{error}</p>}
    </div>
  )
}
