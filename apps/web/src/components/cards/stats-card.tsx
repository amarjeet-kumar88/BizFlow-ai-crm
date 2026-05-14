"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCard(props: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
    >
      <Card className="rounded-2xl p-6 shadow-md">
        <p className="text-muted-foreground">{props.title}</p>

        <h2 className="text-3xl font-bold mt-2">{props.value}</h2>

        <p className="text-sm mt-3">{props.growth}</p>
      </Card>
    </motion.div>
  );
}
