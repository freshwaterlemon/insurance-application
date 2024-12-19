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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { updateUserDPSchema } from '@/schemas';
import { updateUserDP } from '@/app/actions/updateUserDP';

interface UpdateUserDPFormProps {
	email: string ;
}

export default function UpdateUserDPForm({ email }: UpdateUserDPFormProps) {
	if (!email) {
		throw new Error('Email is required to update image.');
	}
	const { toast } = useToast();

	const form = useForm<z.infer<typeof updateUserDPSchema>>({
		resolver: zodResolver(updateUserDPSchema),
		defaultValues: {
			image: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof updateUserDPSchema>) => {
		console.log(data);
		try {
			await updateUserDP(email, data);
			form.reset();
			toast({
				title: 'Display Photo updated successfully',
				description: 'Log back in to view changes next time',
			});
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
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mx-1">
										Image URL
									</FormLabel>
									<FormControl>
										<Input
											className="h-10 w-full"
											placeholder="https://picsum.photos/200"
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
