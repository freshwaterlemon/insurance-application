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
import { Policies } from './policies';

interface Policy {
    InsurancePolicyID: string;
    InsurancePolicyName: string;
    BasePrice: number;
    TypeOfPolicy: string;
}

export function PoliciesTable({
    policies,
    offset,
    totalPolicy
}: {
    policies: Policy[];
    offset: number;
    totalPolicy: number;
}) {
    const router = useRouter();
    const policyPerPage = 5;


    function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/policies/?offset=${offset}`, { scroll: false });
    }
    return (
        <Card className='mt-8 mr-8'>
            <CardHeader>
                <CardTitle>Insurance Policies</CardTitle>
                <CardDescription>
                    Critical details of insurance policies
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="table-auto mt-1 border-separate border-spacing-y-5">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Base Price (SGD)</TableHead>
                            <TableHead>Type of Policy</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {policies.map((policy) => (
                            <Policies key={policy.InsurancePolicyID} policy={policy} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{' '}
                        <strong>
                            {Math.min(offset - policyPerPage, totalPolicy) + 1}-{Math.min(offset, totalPolicy)}
                        </strong>{' '}
                        of <strong>{totalPolicy}</strong> policies
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === policyPerPage}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset >= totalPolicy}
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