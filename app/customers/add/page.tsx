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
import { getPolicies } from '@/app/actions/getPolicies';
import { createCustomerItem } from '@/app/actions/createCustomerItem';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast';

// Define your validation schema
const addPolicyFormSchema = z.object({
	id: z.string().min(1, 'NRIC is required'),
	email: z.string().email('Invalid email'),
	firstname: z.string().min(1, 'First name is required'),
	lastname: z.string().min(1, 'Last name is required'),
	availablePolicies: z.string().min(1, 'Policy is required'),
});

export default function AddPolicyPage() {
	const router = useRouter()
	const { toast } = useToast()
	// const [availablePolicies, setAvailablePolicies] = useState<string[]>([])
	const [availablePolicies, setAvailablePolicies] = useState<{ id: string, name: string }[]>([]);

	useEffect(() => {
		async function fetchPolicyTypes() {
			try {
				const data = await getPolicies();
				console.log(data);
				// setAvailablePolicies(data.policies.map((policy) => policy.InsurancePolicyName));
				setAvailablePolicies(data.policies || []);
			} catch (error) {
				console.error('Error fetching policy types:', error);
			}
		}

		fetchPolicyTypes();
	}, []);

	const form = useForm({
		resolver: zodResolver(addPolicyFormSchema),
		defaultValues: {
			id: '',
			email: '',
			firstname: '',
			lastname: '',
			availablePolicies: '',
		},
	});
	const onSubmit = async (data) => {
		console.log(data);
		try {
			await createCustomerItem(data);
		} catch (error) {
			console.error('Error adding policy:', error);
		}
	};

	return (
		<div className='flex justify-center items-center'>
			<Card className={'w-1/3'}>
				<CardHeader>
					<CardTitle>Add Policy Holder</CardTitle>
					<CardDescription>Add a new policy holder</CardDescription>
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
											<FormLabel className="w-24 text-left">NRIC</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="S1234567A"
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-24 text-left">Email</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="jerry@email.com"
														type="email"
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
								name="firstname"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-24 text-left">First Name</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="Jerry"
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
								name="lastname"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-24 text-left">Last Name</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<Input
														className="h-10 w-full"
														placeholder="Tan"
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
								name="availablePolicies"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center space-x-4">
											<FormLabel className="w-24 text-left">Policies</FormLabel>
											<div className="flex-grow">
												<FormControl>
													<div className="flex-grow">
														<Select onValueChange={(value) => field.onChange(value)}
															defaultValue={field.value}>
															<SelectTrigger className="w-full">
																<SelectValue placeholder="Select policies available" />
															</SelectTrigger>
															<SelectContent>
																{/* {availablePolicies.map((name, index) => (
																	<SelectItem key={index} value={name}>
																		{name.id} {name.name}
																	</SelectItem>
																))} */}
																{availablePolicies.map((policy, index) => (
																	<SelectItem key={index} value={policy.id}>
																		{policy.id} {policy.name}
																	</SelectItem>
																))}
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

							<CardFooter className='justify-center'>
							<Button type="submit" onClick={() => {
									toast({
										description: "Policy holder added",
									})
								}} className='mx-4 mt-4'>Submit</Button>
								<Button variant='secondary' type="button" onClick={() => router.back()} className='mx-4 mt-4'>Cancel</Button>
								
							</CardFooter>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}