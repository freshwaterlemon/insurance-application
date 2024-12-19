'use server';

import { db } from '@/db';

export async function getPoliciesPaged(skip: number, take: number) {
	try {
		const policies = await db.insurancePolicy.findMany({
			skip,
			take,
		});
		const totalPolicy = await db.insurancePolicy.count();

	
		const transformedPolicies = policies.map((policy) => ({
			...policy,
			BasePrice: parseFloat(policy.BasePrice.toString()), 
		}));

		return {
			policies: transformedPolicies,
			newOffset: skip + take,
			totalPolicy,
		};
	} catch (error) {
		return { error: `${error}: could not fetch policies` };
	}
}
