// import { db } from '@/db';

// export async function getDashboardData() {
//   try {
//     // Count the total number of sales
//     const totalSales = await db.policyHolderInsurancePolicy.count();
//     // Count the total number of polices
//     const policiesCount = await db.insurancePolicy.count();

//     // Count unique customers (distinct PolicyHolderID in the join table)
//     const uniqueCustomers = await db.policyHolderInsurancePolicy.findMany({
//       distinct: ['PolicyHolderID'],
//       select: {
//         PolicyHolderID: true,
//       },
//     });
//     const customersCount = uniqueCustomers.length;

//     // Count unique policies (distinct InsurancePolicyID in the join table)
//     // const uniquePolicies = await db.policyHolderInsurancePolicy.findMany({
//     //   distinct: ['InsurancePolicyID'],
//     //   select: {
//     //     InsurancePolicyID: true,
//     //   },
//     // });
//     // const policiesCount = uniquePolicies.length;

//     return {
//       totalSales,
//       customersCount,
//       policiesCount,
//     };
//   } catch (error) {
//     return { error: `${error} Failed to fetch dashboard data` };
//   }
// }

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
  } catch (error) {
    return { error: `${error.message || error} - Failed to fetch dashboard data` };
  } finally {
    // Ensure the database connection is closed
    await db.$disconnect();
  }
}
