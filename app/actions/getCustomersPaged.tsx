'use server';

import { db } from '@/db';

export async function getCustomersPaged(skip: number, take: number) {
	try {
		const customers = await db.policyHolder.findMany({
			skip,
			take,
			include: {
				InsurancePolicies: {
					include: {
						InsurancePolicy: true,
					},
				},
			},
		});

		const formattedCustomers = customers.map((customer) => ({
			PolicyHolderID: customer.PolicyHolderID,
			PolicyHolderEmail: customer.PolicyHolderEmail,
			FirstName: customer.FirstName,
			LastName: customer.LastName,
			Policies: customer.InsurancePolicies.map((relation) => ({
				InsurancePolicyID: relation.InsurancePolicy.InsurancePolicyID,
				InsurancePolicyName:
					relation.InsurancePolicy.InsurancePolicyName,
				BasePrice: relation.InsurancePolicy.BasePrice.toString(),
				TypeOfPolicy: relation.InsurancePolicy.TypeOfPolicy,
			})),
		}));

		const totalCustomer = await db.policyHolder.count();

		return {
			customers: formattedCustomers,
			newOffset: skip + take,
			totalCustomer,
		};
	} catch (error) {
		return { error: `${error}: could not fetch policies` };
	}
}