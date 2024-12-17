import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    
    return (
        <div className="flex h-full flex-col mr-4">
            <div className="flex-1 space-y-4 p-4 pt-1">
                <div className="flex items-center justify-between space-y-2">
                        <Skeleton className="h-8 w-[150px]" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-9 w-[250px]" />
                    </div>
                </div>
                <Skeleton className="space-y-4 h-8 w-[350px]" />
                <div>
                    <Skeleton className="h-36 w-[300px] rounded-xl" />
                </div>
                <div>
                    <Skeleton className="h-[450px] w-3/4 rounded-xl" />
                </div>
            </div>
        </div>
    );
}