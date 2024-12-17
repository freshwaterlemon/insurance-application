'use server';

import { db } from '@/db';

export async function getPolicyTypes() {
  try {
    const policyTypes = await db.insurancePolicy.findMany({
      select: {
        TypeOfPolicy: true,
      },
      distinct: ['TypeOfPolicy'],
    });

    return {
      policyTypes: policyTypes.map(policy => policy.TypeOfPolicy)
    };
  } catch (error) {
    return { error: `${error} Failed to fetch policy types` };
  }
}