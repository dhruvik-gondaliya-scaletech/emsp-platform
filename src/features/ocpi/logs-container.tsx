'use client';

import { useQuery } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import { Loader2, Terminal, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { LogLine } from "./components/logs/LogLine";

export function LogsContainer() {
    const [filter, setFilter] = useState('ALL');
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data: logs, isLoading, refetch } = useQuery({
        queryKey: ["logs"],
        queryFn: () => ocpiService.getLogs(),
        refetchInterval: 5000,
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const filteredLogs = logs?.filter((log: any) => {
        if (filter === 'ALL') return true;
        if (filter === 'PUSH') return log.type === 'PUSH';
        if (filter === 'COMMAND') return log.type === 'COMMAND';
        return true;
    });

    return (
        <PageWrapper
            title="OCPI Protocol Stream"
            subtitle="Low-level monitoring of incoming data pushes and outgoing commands"
            action={
                <div className="flex gap-2 p-1 bg-white/5 border border-white/5 rounded-2xl">
                    {['ALL', 'PUSH', 'COMMAND'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === f ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            }
        >
            <div className="glass-card rounded-3xl premium-card-border overflow-hidden flex flex-col h-[70vh]">
                <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">live_stream_active</span>
                    </div>
                    <button
                        onClick={() => refetch()}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-2 bg-black/40 scroll-smooth no-scrollbar"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>INITIALIZING HANDSHAKE...</span>
                        </div>
                    ) : (
                        <AnimatePresence initial={false}>
                            {filteredLogs?.map((log: any, i: number) => (
                                <LogLine key={i} log={log} index={i} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                <div className="p-3 border-t border-white/5 bg-black/20 text-[10px] flex items-center justify-between font-mono text-muted-foreground/40">
                    <span>CONNECTION: SECURE (TLS 1.3)</span>
                    <span>PROTOCOL: OCPI 2.2.1-RECV</span>
                </div>
            </div>
        </PageWrapper>
    );
}
