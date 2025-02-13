'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface FileAttachmentProps {
  name?: string
  required?: boolean
  acceptedTypes?: string
  maxSizeMB?: number
}

export const FileAttachment = ({
  name,
  required,
  acceptedTypes = '',
  maxSizeMB = 5,
}: FileAttachmentProps): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSizeMB}MB`)
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
  }

  return (
    <div className='relative flex w-full flex-col'>
      <div className='flex h-40 w-full items-center justify-center rounded-md border'>
        <div className='inline-flex items-center justify-center'>
          <span className='text-detail text-neutral-400'>
            {selectedFile ? selectedFile.name : 'Select File'}
          </span>
        </div>
        <input
          name={name}
          required={required}
          className='absolute inset-0 opacity-0'
          accept={acceptedTypes}
          type='file'
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
