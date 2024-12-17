'use server';

import { db } from '@/db';

export async function updateUsername(data) {
    const { email, name } = data;

    const updateUser = await db.user.update({
        where: {
            email: email,
        },
        data: {
            name: name,
        },
    })

    console.log('Username updated:', updateUser);

}