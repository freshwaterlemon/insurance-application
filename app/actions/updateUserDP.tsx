'use server';

import { db } from '@/db';

export async function updateUserDP(
    email: string,
    data: { image: string }
) {
    try {
        const updateUser = await db.user.update({
            where: {
                email: email,
            },
            data: {
                image: data.image,
            },
        });

        console.log('Username updated:', updateUser);
        return updateUser;
    } catch (error) {
        console.error('Error updating username:', error);
        throw error;
    }
}
