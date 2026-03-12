'use client';

import { ShieldCheck, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EVSEItemProps {
    evse: any;
    isPending: boolean;
    onAction: (command: string) => void;
}

export function EVSEItem({ evse, isPending, onAction }: EVSEItemProps) {
    const isAvailable = evse.status === 'AVAILABLE';
    const isOccupied = evse.status === 'OCCUPIED' || evse.status === 'CHARGING';

    return (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group/evse hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]",
                    isAvailable ? "bg-green-500 shadow-green-500/40" :
                        isOccupied ? "bg-blue-500 shadow-blue-500/40" : "bg-zinc-500"
                )} />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">{evse.evse_id || evse.uid}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{evse.status}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 overflow-hidden">
                {isAvailable ? (
                    <button
                        onClick={() => onAction('START_SESSION')}
                        disabled={isPending}
                        className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "START"}
                    </button>
                ) : isOccupied ? (
                    <button
                        onClick={() => onAction('STOP_SESSION')}
                        disabled={isPending}
                        className="px-4 py-2 bg-destructive/20 text-destructive text-xs font-bold rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50"
                    >
                        {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "STOP"}
                    </button>
                ) : null}

                <button
                    onClick={() => onAction('UNLOCK_CONNECTOR')}
                    disabled={isPending}
                    className="p-2 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group/unlock"
                >
                    <ShieldCheck className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
