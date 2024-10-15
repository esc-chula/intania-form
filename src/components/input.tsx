'use client'

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
  error?: boolean
  errorMessage?: string
}

export function Input({
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
  error,
  errorMessage,
}: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }
  }
  return (
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
        className={cn(
          'flex w-full rounded-md border border-default border-neutral-200 px-2 py-1 outline-none transition-all duration-200 focus:border',
          {
            'border-red-600': error,
            'focus:border-neutral-600': !error,
          },
          className
        )}
        disabled={disabled}
      />
      <p
        className={cn('text-detail transition-all duration-200', {
          'text-red-600': error,
          'text-neutral-400': !error,
        })}
      >
        {error ? errorMessage : description}
      </p>
    </div>
  )
}
