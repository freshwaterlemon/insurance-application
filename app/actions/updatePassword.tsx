'use server';

import { db } from '@/db';

export async function updateUserPassword(
	email: string,
	data: { password: string }
) {
	try {
		const updateUser = await db.user.update({
			where: {
				email: email,
			},
			data: {
				password: data.password,
			},
		});

		console.log('Username updated:', updateUser);
		return updateUser;
	} catch (error) {
		console.error('Error updating username:', error);
		throw error;
	}
}
