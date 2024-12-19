import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { SquarePen } from 'lucide-react';
import UpdateUsernameForm from '@/components/updateUsername-form';
import UpdateUserPasswordForm from '@/components/updateUserPassword-form';

export default async function Account() {
	const session = await auth();

	return (
		<>
			<div className="flex justify-start ">
				<div className="flex flex-row items-center justify-between space-y-0 pb-3 gap-5">
					<Avatar className="size-16">
						<AvatarImage src={session?.user?.image as string} />
						<AvatarFallback>
							{session?.user?.name?.slice(0, 3)}
						</AvatarFallback>
					</Avatar>
					<div className="flex-col ml-1">
						<div className="text-2xl font-bold">
							{session?.user?.name}
						</div>
						<div className="text-xs text-muted-foreground">
							{session?.user?.email}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-5">
				<div className="gap-5">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="default" className="mt-5">
								<SquarePen className="h-6 w-6 text-muted-foreground" />
								Edit Profile
							</Button>
						</SheetTrigger>

						<SheetContent>
							<SheetHeader>
								<SheetTitle>Edit profile</SheetTitle>
								<SheetDescription>
									Make changes to your profile here. Click
									save when you&apos;re done.
								</SheetDescription>
							</SheetHeader>

							<UpdateUsernameForm email={session?.user?.email as string} />
						</SheetContent>
					</Sheet>
				</div>
				<div className="gap-5">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="default" className="mt-5">
								<SquarePen className="h-6 w-6 text-muted-foreground" />
								Change Password
							</Button>
						</SheetTrigger>

						<SheetContent>
							<SheetHeader>
								<SheetTitle>Change password</SheetTitle>
								<SheetDescription>
									Make changes to your password here. Click
									save when you&apos;re done.
								</SheetDescription>
							</SheetHeader>

							<UpdateUserPasswordForm
								email={session?.user?.email as string}
							/>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</>
	);
}
