'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { cn } from '@/lib/utils'

interface InputProps {
  id?: string
  name?: string
  type: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  pattern?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  description?: string
}

export const Input = ({
  id,
  name,
  type,
  value,
  onChange,
  required,
  pattern,
  placeholder,
  className,
  disabled,
  description,
}: InputProps) => {
  const [isValid, setIsValid] = useState(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(true)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className='relative flex w-full'>
      <div className='flex w-full flex-col gap-1'>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          pattern={pattern}
          placeholder={placeholder || 'คำตอบ'}
          onInvalid={(e) => {
            e.preventDefault()
            setIsValid(false)
            toast.error('กรุณากรอกคำตอบให้ครบ', { id: 'invalid' })
          }}
          className={cn(
            'flex w-full rounded-md border border-default border-neutral-200 px-2 py-1 outline-none transition-all duration-200 focus:border',
            {
              'border-red-600': !isValid,
              'focus:border-neutral-600': isValid,
            },
            className
          )}
          disabled={disabled}
        />
        <p className='text-detail font-light text-neutral-400 transition-all duration-200'>
          {description}
        </p>
      </div>
      {!isValid ? (
        <p className='absolute -bottom-8 w-full text-body-2 italic text-red-600'>
          จำเป็นต้องตอบคำถามนี้
        </p>
      ) : null}
    </div>
  )
}
