import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Policy = {
	InsurancePolicyID: string;
	InsurancePolicyName: string;
};
type Customer = {
	PolicyHolderID: string;
	PolicyHolderEmail: string;
	FirstName: string;
	LastName: string;
	Policies: Policy[];
};
type CustomersProps = {
	customer: Customer;
};

export function Customers({ customer }: CustomersProps) {
	return (
		<TableRow>
			<TableCell className="font-bold">
				{customer.PolicyHolderID}
			</TableCell>
			<TableCell>{customer.PolicyHolderEmail}</TableCell>
			<TableCell>{customer.FirstName}</TableCell>
			<TableCell>{customer.LastName}</TableCell>
			<TableCell>
				{' '}
				{customer.Policies.map((policy) => (
					<Badge
						className="mx-2"
						key={policy.InsurancePolicyID}
						variant="outline"
					>
						{policy.InsurancePolicyName}
					</Badge>
				))}
			</TableCell>
		</TableRow>
	);
}
