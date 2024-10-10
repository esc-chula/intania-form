import { FormHeader } from '@/components/form/form-header'

export default function Page() {
  return (
    <div className='mt-8 flex w-full items-center justify-center'>
      <FormHeader
        form={{
          heading: 'คำตอบของคุณถูกบันทึกแล้ว',
          subheading: 'ขอบคุณสำหรับคำตอบ สามารถปิดหน้าต่างนี้ได้',
          columns: [],
        }}
      />
    </div>
  )
}
