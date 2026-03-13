'use client';

import { useQuery } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import { Loader2, Zap } from "lucide-react";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { SessionItem } from "./components/SessionItem";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RealTimeService from "@/lib/realtime.service";

export function SessionsContainer() {
    const [actionPendingId, setActionPendingId] = useState<string | null>(null);

    const { data: sessions, isLoading, refetch } = useQuery({
        queryKey: ["sessions"],
        queryFn: () => ocpiService.getSessions(),
    });

    useEffect(() => {
        const handleSessionUpdate = (event: any) => {
            console.log("Real-time session update:", event);
            refetch();
            // Optional: toast only on specific significant changes if desired
        };

        RealTimeService.addEventListener("transaction-start", handleSessionUpdate);
        RealTimeService.addEventListener("transaction-stop", handleSessionUpdate);

        return () => {
            RealTimeService.removeEventListener("transaction-start", handleSessionUpdate);
            RealTimeService.removeEventListener("transaction-stop", handleSessionUpdate);
        };
    }, [refetch]);

    const handleStopSession = async (sessionId: string) => {
        setActionPendingId(sessionId);
        try {
            const res = await ocpiService.stopRemoteSession({ session_id: sessionId });
            if (res.result === 'ACCEPTED') {
                toast.success('Stop command accepted');
                setTimeout(() => refetch(), 1000); // Give CPO time to update
            } else {
                toast.error(`Rejected: ${res.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error("Failed to stop session");
        } finally {
            setActionPendingId(null);
        }
    };

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
                        <SessionItem
                            key={session.id}
                            session={session}
                            index={index}
                            onStop={() => handleStopSession(session.id)}
                            isPending={actionPendingId === session.id}
                        />
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
