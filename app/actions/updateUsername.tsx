'use server';

import { db } from '@/db';

export async function updateUsername(
	email: string,
	data: { username: string }
) {
	try {
		const updateUser = await db.user.update({
			where: {
				email: email, // Ensure email is a string
			},
			data: {
				name: data.username, // Use the correct field for the update
			},
		});

		console.log('Username updated:', updateUser);
		return updateUser;
	} catch (error) {
		console.error('Error updating username:', error);
		throw error; // Optionally rethrow to handle it elsewhere
	}
}
