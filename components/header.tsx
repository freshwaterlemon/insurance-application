import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from './ui/button';

export default function Header() {
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
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuItem>My Account</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Log Out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}