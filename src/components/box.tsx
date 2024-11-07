interface BoxProps {
  children: React.ReactNode
}

export const Box = ({ children }: BoxProps): JSX.Element => {
  return (
    <div className='flex w-full max-w-3xl flex-col gap-5 rounded-box border-default bg-white p-10 shadow-default'>
      {children}
    </div>
  )
}
