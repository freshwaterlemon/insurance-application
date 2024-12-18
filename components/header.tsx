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
import { ModeToggle } from './theme-toggle';

type HeaderProps = {
	username: string;
	image?: string; // image is optional
};

export default function Header({ username, image }: HeaderProps) {
	return (
		<div className="w-full flex px-8 py-4 justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src={image} />
						<AvatarFallback>{username.slice(0, 3)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>{username}</DropdownMenuLabel>
					<Link href="/account">
						<DropdownMenuItem>My Account</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<span>
						<form
							action={async () => {
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
			<div className="flex ml-4 items-center">
				<ModeToggle />
			</div>
		</div>
	);
}
