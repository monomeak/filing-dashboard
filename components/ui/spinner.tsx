import { LoadingOutlined as Loader2Icon } from '@ant-design/icons'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
