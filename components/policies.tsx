import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Policy = {
	InsurancePolicyID: string;
	InsurancePolicyName: string;
	BasePrice: number;
	TypeOfPolicy: string;
};

interface PoliciesProps {
	policy: Policy; // Define the policy prop type
}

export function Policies({ policy }: PoliciesProps) {
	// Format the BasePrice as currency
	const formattedPrice = new Intl.NumberFormat('en-SG', {
		style: 'currency',
		currency: 'SGD',
	}).format(policy.BasePrice);

	return (
		<TableRow>
			<TableCell className="font-bold">
				{policy.InsurancePolicyID}
			</TableCell>
			<TableCell>{policy.InsurancePolicyName}</TableCell>
			<TableCell>{formattedPrice}</TableCell>
			<TableCell>
				<Badge variant="outline">{policy.TypeOfPolicy}</Badge>
			</TableCell>
		</TableRow>
	);
}
