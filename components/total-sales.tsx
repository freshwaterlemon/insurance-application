'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LabelList, } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface TotalSalesProps {
  data: { policyHolderID: string; totalEarnings: number }[];
}
const chartConfig = {
  desktop: {
    label: "desktop",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function TotalSales({ data }: TotalSalesProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            top: 20,
          }}
        >
          <CartesianGrid vertical={false} stroke='hsl(0 0% 85%)'/>
          <XAxis
            dataKey="policyHolderID"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="totalEarnings" fill="hsl(var(--chart-6))" radius={4}>
            <LabelList
              position="top"
              offset={6}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}