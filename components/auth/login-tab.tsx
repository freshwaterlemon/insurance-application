'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { login } from '@/app/actions/login';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { useState } from 'react';
import { FormError } from '../form-error';
import Link from 'next/link';

import { Social } from "./social";

export const LoginTab = () => {
	// This step can be deferred for later use
	const [error, setError] = useState<string | undefined>();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		const status = await login(values);
		setError(status?.error);
		if (status?.error) {
			console.log(status.error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Welcome back!</CardTitle>
				<CardDescription>
					Login to view all available features
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter email"
												type="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Password</FormLabel>
											<Button
												size="sm"
												variant="link"
												asChild
												className="text-xs px-0"
											>
												<Link href="/">
													Forgot password?
												</Link>
											</Button>
										</div>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter password"
												type="password"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* This step can be deferred for later use */}
						<FormError message={error} />

						<Button type="submit" className="w-full">
							Login
						</Button>
						<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
							<span className="relative z-10 bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
						
						
					</form>
				</Form>
				<Social/>
			</CardContent>
		</Card>
	);
};

export default LoginTab;
