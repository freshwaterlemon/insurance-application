'use server';

import { db } from '@/db';

interface RegisterData {
	name: string;
	email: string;
	password: string;
}

interface RegisterError {
	error: string;
}

export async function register(data: RegisterData): Promise<void | RegisterError> {
	try {
		await db.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
			},
		});
	} catch (error) {
		return { error: `${error}: Error registering` };
	}
}
