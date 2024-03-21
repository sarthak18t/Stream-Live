import React from 'react'
import { cn } from '@/lib/utils'

interface LiveBadgeProps {
    classname ?: string,
}
const LiveBadge = ({className} : LiveBadgeProps) => {
  return (
    <div className={cn(className,
        "bg-rose-500 text-center p-0.5 px-1.5 uppercase rounded-md border border-background text-[10px] font-semibold tracking-wide"
    )}>
        Live
    </div>
  )
}

export default LiveBadge
