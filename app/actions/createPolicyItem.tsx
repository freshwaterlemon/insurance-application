'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function createPolicyItem(data: {
	id: string;
	name: string;
	price: string;
	policyType: string;
}) {
	// insert new insurance policy into the db
	const { id, name, price, policyType } = data;

	const newPolicy = await db.insurancePolicy.create({
		data: {
			InsurancePolicyID: id,
			InsurancePolicyName: name,
			BasePrice: parseFloat(price),
			TypeOfPolicy: policyType,
		},
	});

	console.log('New Policy Created:', newPolicy);

	redirect('/policies');
}
