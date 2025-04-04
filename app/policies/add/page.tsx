'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getPolicyTypes } from '@/app/actions/getPoliciesTypes';
import { createPolicyItem } from '@/app/actions/createPolicyItem';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addPolicyFormSchema } from '@/schemas';

export default function AddPolicyPage() {
	const router = useRouter();
	const { toast } = useToast();
	const [policyTypes, setPolicyTypes] = useState<string[]>([]);

	useEffect(() => {
		async function fetchPolicyTypes() {
			try {
				const data = await getPolicyTypes();
				setPolicyTypes(data.policyTypes || []);
			} catch (error) {
				console.error('Error fetching policy types:', error);
			}
		}

		fetchPolicyTypes();
	}, []);

	const form = useForm<z.infer<typeof addPolicyFormSchema>>({
		resolver: zodResolver(addPolicyFormSchema),
		defaultValues: {
			id: '',
			name: '',
			price: '',
			policyType: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof addPolicyFormSchema>) => {
		try {
			await createPolicyItem(data);
			toast({
				description: 'Policy added',
			});
			form.reset();
		} catch (error) {
			console.error('Error adding policy:', error);
			toast({
				variant: 'destructive',
				description: 'Failed to add policy. Please try again.',
			});
		}
	};

	return (
		<div className="flex justify-center items-center">
			<Card className={'w-full max-w-md mx-auto'}>
				<CardHeader>
					<CardTitle>Add Policy</CardTitle>
					<CardDescription>Add a new policy</CardDescription>
				</CardHeader>
				<CardContent className="mt-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="id"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-20 text-left">
												ID
											</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="20A123"
														type="text"
														{...field}
													/>
												</FormControl>
												<FormMessage className="mt-2" />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-20 text-left">
												Name
											</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="Basic Health Coverage"
														type="text"
														{...field}
													/>
												</FormControl>
												<FormMessage className="mt-2" />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-20 text-left">
												Price
											</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="15"
														type="number"
														{...field}
													/>
												</FormControl>
												<FormMessage className="mt-2" />
											</div>
										</div>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="policyType"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-20 text-left">
												Policies
											</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<div className="flex-grow">
														<Select
															onValueChange={(
																value
															) =>
																field.onChange(
																	value
																)
															}
															defaultValue={
																field.value
															}
														>
															<SelectTrigger className="w-2/3">
																<SelectValue placeholder="Select policies type" />
															</SelectTrigger>
															<SelectContent>
																{policyTypes.map(
																	(
																		type,
																		index
																	) => (
																		<SelectItem
																			key={index}
																			value={type}
																		>
																			{type}
																		</SelectItem>
																	)
																)}
															</SelectContent>
														</Select>
													</div>
												</FormControl>
												<FormMessage className="mt-2" />
											</div>
										</div>
									</FormItem>
								)}
							/>

							<CardFooter className="justify-center">
								<Button type="submit" className="mx-4 mt-4">
									Submit
								</Button>
								<Button
									variant="secondary"
									type="button"
									onClick={() => router.back()}
									className="mx-4 mt-4"
								>
									Cancel
								</Button>
							</CardFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
