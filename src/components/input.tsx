'use client'

import { cn } from '@/lib/utils'

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
}: {
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
}) {
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
          'flex w-full rounded-md border border-default px-2 py-1 outline-none transition-all duration-200 focus:border-none focus:ring-1 focus:ring-inset',
          {
            'border-red-600 focus:ring-red-600': error,
            'border-neutral-200 focus:ring-neutral-600': !error,
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
