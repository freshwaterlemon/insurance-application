import { db } from '@/db';

export async function getDiffCustomerEarnings() {
	try {
		// fetch all policyholders with the base price of each insurance policy they hold
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

		// calculate lifetime earnings (10% of base price) for each policyholder
		const earnings = policyHolders.map((holder) => {
			const totalEarnings = holder.InsurancePolicies.reduce(
				(sum, policyHolder) => {
					const basePrice = parseFloat(
						policyHolder.InsurancePolicy.BasePrice.toString()
					);
					return sum + basePrice * 0.1;
				},
				0
			);

			return {
				policyHolderID: holder.PolicyHolderID,
				totalEarnings: totalEarnings,
			};
		});

		return earnings;
	} catch (error) {
		return { error: `Failed to calculate lifetime earnings: ${error}` };
	}
}
