'use client';

import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    Table
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Customers } from './customers';

interface Customer {
    PolicyHolderID: string;
    PolicyHolderEmail: string;
    FirstName: string;
    LastName: string;
    Policies: { InsurancePolicyID: string; InsurancePolicyName: string }[]; 
}

export function CustomersTable({
    customers,
    offset,
    totalCustomer
}: {
    customers: Customer[];
    offset: number;
    totalCustomer: number;
}) {
    const router = useRouter();
    const customerPerPage = 5;

    function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/customers/?offset=${offset}`, { scroll: false });
    }

    return (
        <Card className='mt-8 mr-8'>
            <CardHeader>
                <CardTitle>Policy Holders</CardTitle>
                <CardDescription>
                    Personal details of all policy holders
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="table-auto mt-1 border-separate border-spacing-y-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead>NRIC</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last name</TableHead>
                            <TableHead>Policies Held</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer) => (
                            <Customers key={customer.PolicyHolderID} customer={customer} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{' '}
                        <strong>
                            {Math.min(offset - customerPerPage, totalCustomer) + 1}-{Math.min(offset, totalCustomer)}
                        </strong>{' '}
                        of <strong>{totalCustomer}</strong> policy holders
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === customerPerPage}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset >= totalCustomer}
                        >
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}