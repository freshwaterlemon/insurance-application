'use server';

import { db } from '@/db';

export async function getPolicies() {
	try {
		const policies = await db.insurancePolicy.findMany({
			select: {
				InsurancePolicyID: true,
				InsurancePolicyName: true,
			},
		});

		return {
			policies: policies.map((policy) => ({
				id: policy.InsurancePolicyID,
				name: policy.InsurancePolicyName,
			})),
		};
	} catch (error) {
		return { error: `Error: ${error}. Could not fetch policies.` };
	}
}
