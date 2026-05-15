"use client";

import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 8000 },
  { name: "Mar", revenue: 12000 },
];

export default function RevenueChart() {
  return (
    <div className="h-75 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            fill="#c7d2fe"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}