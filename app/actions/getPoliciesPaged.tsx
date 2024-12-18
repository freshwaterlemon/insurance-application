'use server';

import { db } from '@/db';

export async function getPoliciesPaged(skip: number, take: number) {
	try {
		const policies = await db.insurancePolicy.findMany({
			skip,
			take,
		});
		const totalPolicy = await db.insurancePolicy.count();

		// Ensure to map and transform any necessary fields like Decimal
		const transformedPolicies = policies.map((policy) => ({
			...policy,
			BasePrice: parseFloat(policy.BasePrice.toString()), // Ensure conversion if Decimal type
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
