import { db } from '@/db';

export async function getDashboardData() {
	try {
		// Perform all queries concurrently to optimize execution time
		const [totalSales, policiesCount, uniqueCustomers] = await Promise.all([
			db.policyHolderInsurancePolicy.count(), // Total sales
			db.insurancePolicy.count(), // Total policies
			db.policyHolderInsurancePolicy.groupBy({
				by: ['PolicyHolderID'],
				_count: { PolicyHolderID: true }, // Get unique customers
			}),
		]);

		// Extract the unique customers count
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
