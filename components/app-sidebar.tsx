import { Home, Wallet, Users, ChevronUp, User2 } from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
} from '@/components/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOut } from '@/lib/auth';
import { Button } from './ui/button';

// Menu items.
const items = [
	{
		title: 'Home',
		url: '/',
		icon: Home,
	},
	{
		title: 'Policies',
		url: '/policies',
		icon: Wallet,
	},
	{
		title: 'Customer',
		url: '/customers',
		icon: Users,
	},
];

type AppSidebarProps = {
	username: string;
};

export function AppSidebar({ username }: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Insurance Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* side bar footer */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {username}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								// className="w-[--radix-popper-anchor-width]"
							>
								<Link href={'/account'}>
									<DropdownMenuItem>
										<span>My Account</span>
									</DropdownMenuItem>
								</Link>

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
												className="text-left h-3 w-full"
											>
												Log Out
											</Button>
										</DropdownMenuItem>
									</form>
								</span>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
