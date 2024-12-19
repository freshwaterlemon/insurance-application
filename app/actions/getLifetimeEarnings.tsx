import { db } from '@/db';

export async function getLifetimeEarnings(): Promise<number> {
	try {
		// fetch policy holders with their associated insurance policies' base prices
		const policyHolders = await db.policyHolder.findMany({
			include: {
				InsurancePolicies: {
					select: {
						InsurancePolicy: {
							select: {
								BasePrice: true,
							},
						},
					},
				},
			},
		});


		if (!policyHolders || policyHolders.length === 0) {
			console.warn('No policy holders found.');
			return 0; 
		}

		// calculate lifetime earnings
		const lifetimeEarnings = policyHolders.reduce((total, { InsurancePolicies }) => {
			// calculate earnings for each policy holder
			const holderEarnings = InsurancePolicies.reduce((sum, { InsurancePolicy }) => {
				// calculate 10%
				return sum + (InsurancePolicy.BasePrice.toNumber() * 0.1);
			}, 0);
			return total + holderEarnings;
		}, 0);

		return lifetimeEarnings;
	} catch (error: unknown) {
		console.error(`Failed to calculate lifetime earnings:`, error);
		throw new Error('Failed to calculate lifetime earnings');
	} finally {
		await db.$disconnect();
	}
}
