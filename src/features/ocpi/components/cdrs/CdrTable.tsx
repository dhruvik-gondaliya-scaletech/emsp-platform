'use client';

import { motion } from "framer-motion";
import { Zap, CreditCard, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

interface CdrTableProps {
    cdrs: any[];
}

export function CdrTable({ cdrs }: CdrTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-[10px] text-muted-foreground uppercase font-bold tracking-widest bg-white/[0.01]">
                        <th className="px-8 py-4">CDR ID</th>
                        <th className="px-8 py-4">Location</th>
                        <th className="px-8 py-4">Energy (kWh)</th>
                        <th className="px-8 py-4">Duration</th>
                        <th className="px-8 py-4">Total Cost</th>
                        <th className="px-8 py-4">Created</th>
                        <th className="px-8 py-4"></th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {cdrs && cdrs.length > 0 ? (
                        cdrs.map((cdr, i) => (
                            <motion.tr
                                key={`${cdr.id}-${i}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="border-t border-white/5 hover:bg-white/[0.02] transition-colors group"
                            >
                                <td className="px-8 py-5 font-mono text-xs opacity-60">#{cdr.id.slice(-8)}</td>
                                <td className="px-8 py-5 font-bold">{cdr.location_id}</td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        < Zap className="w-3 h-3 text-primary" />
                                        <span className="font-bold">{cdr.total_energy.toFixed(2)}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-muted-foreground font-medium">
                                    {(cdr.total_time * 60).toFixed(0)} mins
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <CreditCard className="w-3 h-3" />
                                        <span className="font-bold">€{cdr.total_cost.incl_vat.toFixed(2)}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-muted-foreground">
                                    {format(new Date(cdr.last_updated), 'MMM d, yyyy')}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 rounded-xl hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-8 py-20 text-center">
                                <p className="text-muted-foreground font-medium">No records found for the current period</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    );
}
