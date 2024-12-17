import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from "@/components/ui/badge"

export function Customers({ customer }) {

  return (
    <TableRow>
      <TableCell className="font-bold">{customer.PolicyHolderID}</TableCell>
      <TableCell>{customer.PolicyHolderEmail}</TableCell>
      <TableCell>{customer.FirstName}</TableCell>
      <TableCell>{customer.LastName}</TableCell>
      <TableCell> {customer.Policies.map((policy) => (
        <Badge className='mx-2' key={policy.InsurancePolicyID} variant="outline">
          {policy.InsurancePolicyName}
        </Badge>
      ))}</TableCell>
    </TableRow>
  );
}