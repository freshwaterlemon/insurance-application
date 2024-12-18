'use server';

import { signIn } from '@/lib/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

interface LoginData {
	email: string;
	password: string;
}

interface LoginError {
	error: string;
}

export async function login(data: LoginData): Promise<void | LoginError> {
	try {
		await signIn('credentials', {
			redirectTo: '/',
			email: data.email,
			password: data.password,
		});
	} catch (error) {
		if (isRedirectError(error)) {
			console.error('Standard Redirect Error:', error);
			throw error;
		}

		return { error: 'Invalid credentials' };
	}
}
