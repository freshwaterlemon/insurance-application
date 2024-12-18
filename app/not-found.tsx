import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center text-center">
			<h2 className="text-6xl font-bold ">404!</h2>
			<h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
			<p className="text-neutral-500 mt-2">
				Sorry, we couldn&apos;t find the page you are looking for.
			</p>
			<Button className="mt-6 px-6 py-2">
				<Link href="/">Return Home</Link>
			</Button>
		</div>
	);
}
