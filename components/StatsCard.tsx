"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

export function StatsCard({ value, label, icon, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-green-100 bg-white px-6 py-5 text-center shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-700">
        {icon}
      </div>
      <span className="text-2xl font-bold leading-none text-green-800">
        {value}
      </span>
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </motion.div>
  );
}
