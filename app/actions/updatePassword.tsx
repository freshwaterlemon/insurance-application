'use server';

import { db } from '@/db';

export async function updateUserPassword(email: string, data: { password: string }) {
    try {
        const updateUser = await db.user.update({
            where: {
                email: email, // Ensure email is a string
            },
            data: {
                password: data.password, // Use the correct field for the update
            },
        });

        console.log('Username updated:', updateUser);
        return updateUser;
    } catch (error) {
        console.error('Error updating username:', error);
        throw error; // Optionally rethrow to handle it elsewhere
    }
}
