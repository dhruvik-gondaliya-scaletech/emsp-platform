'use client';

import { motion } from "framer-motion";
import { Zap, Calendar, ChevronRight, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface SessionItemProps {
    session: any;
    index: number;
    onStop: () => void;
    isPending: boolean;
}

export function SessionItem({ session, index, onStop, isPending }: SessionItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500"
        >
            <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/5">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Session ID</p>
                            <p className="font-mono text-sm leading-none">#{session.id.slice(-8)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Energy Delivered</p>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg leading-none">{session.kwh.toFixed(2)}</span>
                                <span className="text-[10px] text-muted-foreground font-semibold">kWh</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Start Time</p>
                            <div className="flex items-center gap-2 text-muted-foreground font-medium text-sm">
                                <Calendar className="w-3 h-3" />
                                <span>{format(new Date(session.start_date_time), 'HH:mm:ss')}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Status</p>
                            <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                                {session.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {session.status === 'ACTIVE' && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onStop();
                            }}
                            disabled={isPending}
                            className="px-6 py-2 bg-destructive/20 text-destructive text-xs font-bold rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                "STOP"
                            )}
                        </button>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </div>
        </motion.div>
    );
}
