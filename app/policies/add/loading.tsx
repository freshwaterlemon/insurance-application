import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className="flex justify-center items-center">
			<Skeleton className="mt-8 h-[400px] w-1/3 rounded-xl" />
		</div>
	);
}
