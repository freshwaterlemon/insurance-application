import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import { signOut } from '@/lib/auth';

export default function Header({ username }) {
	return (
		<div className="w-full flex px-8 py-4 justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger>
					{/* <Button
						variant="ghost"
						className="relative h-8 w-8 rounded-full"
					> */}
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					{/* </Button> */}
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>{username}</DropdownMenuLabel>
					<Link href="/account">
						<DropdownMenuItem>My Account</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<span>
						<form
							action={async (formData) => {
								'use server';
								await signOut();
							}}
						>
							<DropdownMenuItem>
								<Button
									variant="ghost"
									type="submit"
									className="h-3 w-full text-left"
								>
									Log Out
								</Button>
							</DropdownMenuItem>
						</form>
					</span>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
