import { cn } from '@/lib/utils'

export function FormContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex w-full max-w-3xl flex-col gap-5 rounded-box border-default bg-white p-10 shadow-default',
        className
      )}
    >
      {children}
    </div>
  )
}
