'use client';

import { useQuery } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import { Loader2, Zap } from "lucide-react";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { SessionItem } from "./components/SessionItem";

export function SessionsContainer() {
    const { data: sessions, isLoading } = useQuery({
        queryKey: ["sessions"],
        queryFn: () => ocpiService.getSessions(),
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
            title="Active Charging"
            subtitle="Monitor ongoing sessions across the charging network"
        >
            <div className="grid grid-cols-1 gap-4">
                {sessions?.items && sessions.items.length > 0 ? (
                    sessions.items.map((session, index) => (
                        <SessionItem key={session.id} session={session} index={index} />
                    ))
                ) : (
                    <div className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                            <Zap className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">No Active Sessions</h3>
                            <p className="text-muted-foreground">Start a session from the locations tab to get moving</p>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}
