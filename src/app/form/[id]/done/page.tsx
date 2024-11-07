import { Box } from '@/components'

export default function Page() {
  return (
    <div className='mt-8 flex w-full items-center justify-center'>
      <Box>
        <h1 className='text-header-1 font-bold text-neutral-900'>
          คำตอบของคุณถูกบันทึกแล้ว
        </h1>
        <hr />
        <h2 className='text-subtitle text-neutral-500'>ขอบคุณสำหรับคำตอบ</h2>
      </Box>
    </div>
  )
}
