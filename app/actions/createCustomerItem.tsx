'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function createCustomerItem(data: {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  availablePolicies: string;
}) {

  const { id, email, firstname, lastname, availablePolicies } = data;

  // Fetch the policy from the database based on policyType
  const policy = await db.insurancePolicy.findUnique({
    where: { InsurancePolicyID: availablePolicies },
  });

  // Create the new policy holder and associate it with the insurance policy
  const newPolicyHolder = await db.policyHolder.create({
    data: {
      PolicyHolderID: id,
      PolicyHolderEmail: email,
      FirstName: firstname,
      LastName: lastname,
    },
  });

  const newPolicyHolderInsurancePolicy = await db.policyHolderInsurancePolicy.create({
    data: {
      PolicyHolderID: newPolicyHolder.PolicyHolderID,
      InsurancePolicyID: policy.InsurancePolicyID,
    },
  });

  console.log('New Policy Holder Created:', newPolicyHolder);
  console.log('Policy Association Created:', newPolicyHolderInsurancePolicy);

  // Redirect to the customers page after successful insertion
  redirect('/customers');
}