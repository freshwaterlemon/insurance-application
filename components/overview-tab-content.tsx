import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Wallet, Users, FileStack } from 'lucide-react';
import Link from 'next/link';
import { TotalSales } from '@/components/total-sales';
import { LifetimeEarningsCard } from '@/components/lifetime-earnings-card';
import { getDashboardData } from '@/app/actions/getDashboardData';
import { getDiffCustomerEarnings } from '@/app/actions/getDiffCustomerEarnings';
import { getLifetimeEarnings } from '@/app/actions/getLifetimeEarnings';

export async function OverviewTabContent() {
	const dashboardData = await getDashboardData();
	const earnings = await getDiffCustomerEarnings();
	const lifetimeEarnings = await getLifetimeEarnings();

	return (
		<TabsContent value="overview" className="space-y-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{/* Total Customer card */}
				<Link href="/customers">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Customers
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{dashboardData.customersCount}
							</div>
							<p className="text-xs text-muted-foreground">
								{dashboardData.customersCount} customers in
								total
							</p>
						</CardContent>
					</Card>
				</Link>

				{/* Total Policies card */}
				<Link href="/policies">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Policies
							</CardTitle>
							<Wallet className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{dashboardData.policiesCount}
							</div>
							<p className="text-xs text-muted-foreground">
								{dashboardData.policiesCount} policies available
								in total
							</p>
						</CardContent>
					</Card>
				</Link>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Policies Sold
						</CardTitle>
						<FileStack className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dashboardData.totalSales}
						</div>
						<p className="text-xs text-muted-foreground">
							{dashboardData.totalSales} policies sold in total
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-5">
					<CardHeader>
						<CardTitle>Total Sales</CardTitle>
						<CardDescription>
							Total earnings from each customer with 10% of base
							price as premium
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<TotalSales data={earnings} />
					</CardContent>
				</Card>

				<LifetimeEarningsCard data={lifetimeEarnings} />
			</div>
		</TabsContent>
	);
}
