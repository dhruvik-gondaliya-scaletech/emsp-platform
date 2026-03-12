'use client';

import { useQuery } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import { Loader2, Download, Filter, Search } from "lucide-react";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { CdrTable } from "./components/cdrs/CdrTable";

export function CdrsContainer() {
    const { data: cdrs, isLoading } = useQuery({
        queryKey: ["cdrs"],
        queryFn: () => ocpiService.getCdrs(),
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <PageWrapper
            title="Charging History"
            subtitle="View and export finalized Charge Detail Records (CDRs)"
            action={
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Download className="w-4 h-4" />
                    EXPORT DATA
                </button>
            }
        >
            <div className="glass-card rounded-3xl premium-card-border overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-sm group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Filter records..."
                                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm outline-none focus:border-primary/50 transition-all font-medium"
                            />
                        </div>
                        <button className="p-2 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                </div>

                <CdrTable cdrs={cdrs || []} />
            </div>
        </PageWrapper>
    );
}
