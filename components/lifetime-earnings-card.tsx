'use client';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
} from 'recharts';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export function LifetimeEarningsCard({ data }) {
	const [goal, setGoal] = useState(data + 900);

	function onClick(adjustment: number) {
		setGoal(Math.max(200, goal + adjustment));
	}

	// const maxValue = goal;
	// const normalizedValue = ((data / maxValue) * 100);
	const normalizedValue = Math.min(1, data / goal); // Capped at 100%

	const chartData = [{ percentage: normalizedValue, fill: 'grey' }];
	const chartConfig = {
		desktop: {
			label: 'desktop',
			color: 'grey',
		},
	} satisfies ChartConfig;

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Card className="col-span-2">
					<CardHeader>
						<CardTitle>Lifetime Earning</CardTitle>
						<CardDescription>
							Click on the chart to change your earnings goal
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<div style={{ width: '100%', height: 250 }}>
							<ResponsiveContainer>
								<ChartContainer
									config={chartConfig}
									className="mx-auto aspect-square max-h-[250px]"
								>
									<RadialBarChart
										data={chartData}
										startAngle={90}
										// endAngle={-(normalizedValue + 180)}
										endAngle={90 - normalizedValue * 360}
										innerRadius={80}
										outerRadius={110}
									>
										<PolarGrid
											gridType="circle"
											radialLines={false}
											stroke="none"
											className="first:fill-secondary last:fill-card"
											polarRadius={[86, 74]}
										/>
										<RadialBar
											dataKey="percentage"
											background
											cornerRadius={10}
										/>
										<PolarRadiusAxis
											tick={false}
											tickLine={false}
											axisLine={false}
										>
											<Label
												content={({ viewBox }) => {
													if (
														viewBox &&
														'cx' in viewBox &&
														'cy' in viewBox
													) {
														return (
															<text
																x={viewBox.cx}
																y={viewBox.cy}
																textAnchor="middle"
																dominantBaseline="middle"
															>
																<tspan
																	x={
																		viewBox.cx
																	}
																	y={
																		viewBox.cy
																	}
																	className="fill-foreground text-4xl font-bold"
																>
																	{`$${data}`}
																</tspan>
																<tspan
																	x={
																		viewBox.cx
																	}
																	y={
																		(viewBox.cy ||
																			0) +
																		24
																	}
																	className="fill-muted-foreground"
																>
																	Earned
																</tspan>
															</text>
														);
													}
												}}
											/>
										</PolarRadiusAxis>
									</RadialBarChart>
								</ChartContainer>
							</ResponsiveContainer>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2 text-sm">
						{data > goal ? (
							<div className="flex items-center gap-2 font-medium leading-none">
								Goal of ${goal} reached!
							</div>
						) : (
							<div className="flex items-center gap-2 font-medium leading-none">
								Work harder to reach your goal of ${goal}!
							</div>
						)}

						<div className="leading-none text-muted-foreground text-center">
							Showing total earning from the start of your career
						</div>
					</CardFooter>
				</Card>
			</DrawerTrigger>

			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Set Goal</DrawerTitle>
						<DrawerDescription>
							Set your desired lifetime earnings
						</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="flex items-center justify-center space-x-2">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 shrink-0 rounded-full"
								onClick={() => onClick(-50)}
								disabled={goal <= 10}
							>
								<Minus />
								<span className="sr-only">Decrease</span>
							</Button>
							<div className="flex-1 text-center">
								<div className="text-7xl font-bold tracking-tighter m-2">
									{goal}
								</div>
								{/* <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Calories/day
                                </div> */}
							</div>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 shrink-0 rounded-full"
								onClick={() => onClick(50)}
								// disabled={goal >= 400}
							>
								<Plus />
								<span className="sr-only">Increase</span>
							</Button>
						</div>
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button className="mb-4">Set</Button>
						</DrawerClose>
						{/* <DrawerClose asChild>
                            <Button variant='outline' >Cancel</Button>
                        </DrawerClose> */}
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
