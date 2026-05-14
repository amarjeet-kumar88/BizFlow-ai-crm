"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 8000 },
  { name: "Mar", revenue: 12000 },
];

export default function RevenueChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <Area dataKey="revenue" stroke="#4f46e5" fill="#c7d2fe" />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}
