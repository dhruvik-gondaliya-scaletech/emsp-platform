'use client';

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  positive: boolean;
  color: string;
  bg: string;
  index: number;
}

export function StatCard({ label, value, icon: Icon, trend, positive, color, bg, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 rounded-3xl premium-card-border"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${bg} ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend}
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        </div>
      </div>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </motion.div>
  );
}
