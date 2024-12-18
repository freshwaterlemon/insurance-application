'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function createPolicyItem(data: {
	id: string;
	name: string;
	price: string;
	policyType: string;
}) {
	// Insert new insurance policy into the database
	const { id, name, price, policyType } = data;

	// Use Prisma to insert the policy
	const newPolicy = await db.insurancePolicy.create({
		data: {
			InsurancePolicyID: id,
			InsurancePolicyName: name,
			BasePrice: parseFloat(price), // Ensure price is a valid number
			TypeOfPolicy: policyType,
		},
	});

	console.log('New Policy Created:', newPolicy);

	// Redirect to the home page or any other page after successful insertion
	redirect('/policies');
}
