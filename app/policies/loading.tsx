import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-4 pt-3">
        <Skeleton className="h-9 w-[125px]" />
        <Skeleton className="mt-8 h-[550px] w-3/4 rounded-xl" />
    </div>
  )
} 