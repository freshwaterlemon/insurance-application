import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default function Addbutton({
	buttonName,
	linkpath,
}: {
	buttonName: string;
	linkpath: string;
}) {
	return (
		<>
			<Button asChild>
				<Link href={linkpath}>
					<CirclePlus /> {buttonName}
				</Link>
			</Button>
		</>
	);
}