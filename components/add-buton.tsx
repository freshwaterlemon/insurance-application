import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

type AddButtonProps = {
    buttonName: string;
    linkpath: string;
};

export default function Addbutton({ buttonName, linkpath }: AddButtonProps) {
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
