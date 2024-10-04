import React from 'react'

export function FormContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mb-10 flex w-full max-w-3xl flex-col gap-5 rounded-box border-default bg-white p-10 shadow-default ${className}`}
    >
      {children}
    </div>
  )
}
