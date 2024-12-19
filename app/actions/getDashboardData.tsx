import { db } from '@/db';

export async function getDashboardData() {
	try {

		const [totalSales, policiesCount, uniqueCustomers] = await Promise.all([
			db.policyHolderInsurancePolicy.count(),
			db.insurancePolicy.count(),
			db.policyHolderInsurancePolicy.groupBy({
				by: ['PolicyHolderID'],
				_count: { PolicyHolderID: true },
			}),
		]);

		const customersCount = uniqueCustomers.length;

		return {
			totalSales,
			customersCount,
			policiesCount,
		};
	} catch (error: unknown) {
		return {
			error: `${error} - Failed to fetch dashboard data`,
		};
	}
}
