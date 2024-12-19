'use server';

import { db } from '@/db';

export async function updateUsername(
	email: string,
	data: { username: string }
) {
	if (!email) {
		throw new Error('Email is required to update username.');
	}
	try {
		const updateUser = await db.user.update({
			where: {
				email: email,
			},
			data: {
				name: data.username,
			},
		});

		console.log('Username updated:', updateUser);
		return updateUser;
	} catch (error) {
		console.error('Error updating username:', error);
		throw error;
	}
}
