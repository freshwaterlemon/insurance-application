import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTabContent } from '@/components/overview-tab-content';

export default async function Home() {
	// await new Promise(resolve => setTimeout(resolve, 3000));

	return (
		<>
			<div className="flex h-full flex-col mr-4">
				<div className="flex-1 space-y-4 p-4 pt-1">
					<div className="flex items-center justify-between space-y-2">
						<h2 className="text-3xl font-bold tracking-tight">
							Dashboard
						</h2>

						<div className="flex items-center space-x-2">
							<CalendarDateRangePicker />
						</div>
					</div>
					<Tabs defaultValue="overview" className="space-y-4">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>

							<TabsTrigger value="analytics">
								Analytics
							</TabsTrigger>

							<TabsTrigger value="reports">Reports</TabsTrigger>

							<TabsTrigger value="notifications">
								Notifications
							</TabsTrigger>
						</TabsList>

						<OverviewTabContent />
					</Tabs>
				</div>
			</div>
		</>
	);
}
