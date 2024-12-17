// import { db } from '@/db'; // Assuming your Prisma client instance is correctly imported

// export async function getLifetimeEarnings() {
//   try {
//     // Fetch all policyholders and their associated insurance policies with base prices
//     const policyHolders = await db.policyHolder.findMany({
//       include: {
//         InsurancePolicies: {
//           select: {
//             InsurancePolicy: {
//               select: {
//                 BasePrice: true, // Fetching the base price of each insurance policy
//               },
//             },
//           },
//         },
//       },
//     });

//     // Calculate and sum the lifetime earnings from all policyholders
//     const lifetimeEarnings = policyHolders.reduce((total, holder) => {
//       const holderEarnings = holder.InsurancePolicies.reduce((sum, policyHolder) => {
//         const basePrice = parseFloat(policyHolder.InsurancePolicy.BasePrice.toString());
//         return sum + (basePrice * 0.1); // Add 10% of the base price for each policy
//       }, 0);

//       return total + holderEarnings; // Sum up the earnings for all policyholders
//     }, 0);

//     return lifetimeEarnings;

//   } catch (error) {
//     throw new Error(`Failed to calculate lifetime earnings: ${error}`);
//   }
// }

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
      const holderEarnings = holder.InsurancePolicies.reduce((sum, policyHolder) => {
        const basePrice = policyHolder.InsurancePolicy.BasePrice;
        return sum + basePrice.toNumber() * 0.1;
      }, 0);

      return total + holderEarnings;
    }, 0);

    return lifetimeEarnings;

  } catch (error) {
    console.error(`Failed to calculate lifetime earnings: ${error.message}`);
    throw new Error(`Failed to calculate lifetime earnings`);
  } finally {
    // Ensure the database connection is closed
    await db.$disconnect();
  }
}