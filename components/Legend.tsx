"use client";

import { motion } from "framer-motion";

export function Legend() {
  const items = [
    {
      color: "#2E7D32",
      label: "Intensive Intervention",
      description: "Deep, long-term engagement",
    },
    {
      color: "#C8E6C9",
      label: "Extensive Intervention",
      description: "Broad-reach programmes",
    },
    {
      color: "#E5E7EB",
      label: "Other Districts",
      description: "No current intervention",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      className="flex flex-col gap-3 rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
        Legend
      </p>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span
            className="h-4 w-4 flex-shrink-0 rounded-full border border-gray-200"
            style={{ backgroundColor: item.color }}
          />
          <div>
            <p className="text-sm font-semibold leading-tight text-gray-800">
              {item.label}
            </p>
            <p className="text-xs text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
