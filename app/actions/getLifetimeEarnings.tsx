import { db } from '@/db';

export async function getLifetimeEarnings(): Promise<number> {
	try {
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

		const lifetimeEarnings = policyHolders.reduce((total, holder) => {
			const holderEarnings = holder.InsurancePolicies.reduce(
				(sum, policyHolder) => {
					const basePrice = policyHolder.InsurancePolicy.BasePrice;
					return sum + basePrice.toNumber() * 0.1;
				},
				0
			);

			return total + holderEarnings;
		}, 0);

		return lifetimeEarnings;
	} catch (error: unknown) {
		console.error(
			`Failed to calculate lifetime earnings: ${error}`
		);
		throw new Error(`Failed to calculate lifetime earnings`);
	} finally {
		await db.$disconnect();
	}
}
