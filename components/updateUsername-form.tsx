'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateUsername } from '@/app/actions/updateUsername';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updateUsernameSchema } from '@/schemas';

type UpdateUsernameFormProps = {
	email: string;
}

export default function UpdateUsernameForm({ email }: UpdateUsernameFormProps) {
	const { toast } = useToast();
	if (!email) {
		throw new Error('Email is required to update username.');
	}
	const form = useForm<z.infer<typeof updateUsernameSchema>>({
		resolver: zodResolver(updateUsernameSchema),
		defaultValues: {
			username: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof updateUsernameSchema>) => {
		console.log(data);
		try {
			await updateUsername(email, data);
			form.reset();
			toast({
				title: 'Name updated successfully',
				description: 'Log back in to see the changes',
			});
			// // refresh the session to reflect the updated username
			// const updatedSession = await getSession();
			// console.log('Session updated:', updatedSession);
		} catch (error) {
			console.error('Error changing name:', error);
		}
	};

	return (
		<div className="space-y-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4 mt-5">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mx-1">
										Username
									</FormLabel>
									<FormControl>
										<Input
											className="h-10 w-full"
											placeholder="John Doe"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage className="mt-2 mx-1" />
								</FormItem>
							)}
						/>
					</div>
					<SheetFooter className="gap-4">
						<Button type="submit" className="w-full mt-3 m-1">
							Save
						</Button>

						<SheetClose asChild>
							<Button
								variant={'secondary'}
								type="button"
								className="w-full mt-3 m-1"
							>
								Cancel
							</Button>
						</SheetClose>
					</SheetFooter>
				</form>
			</Form>
		</div>
	);
}
