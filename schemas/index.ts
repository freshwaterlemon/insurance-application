import * as z from 'zod';

export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(6, {
		message: 'Minimum 6 characters required',
	}),
	name: z.string().min(1, {
		message: 'Name is required',
	}),
});

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
});

export const updateUsernameSchema = z.object({
	username: z.string().min(1, 'A name is required'),
});

export const updateUserPasswordSchema = z.object({
	password: z.string().min(1, 'A password is required'),
});

export const addPolicyFormSchema = z.object({
	id: z.string().min(1, 'ID is required'),
	name: z.string().min(3, 'Name must be at least 3 characters'),
	price: z.string().min(1, 'Price is required').regex(/^\d+$/, 'Price must be a number'),
	policyType: z.string().min(1, 'Policy type is required'),
});

export const addPolicyHolderFormSchema = z.object({
	id: z.string().min(1, 'NRIC is required'),
	email: z.string().email('Invalid email'),
	firstname: z.string().min(1, 'First name is required'),
	lastname: z.string().min(1, 'Last name is required'),
	availablePolicies: z.string().min(1, 'Policy is required'),
});