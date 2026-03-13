'use client';

import { useQuery } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import RealTimeService from "@/lib/realtime.service";
import { toast } from "sonner";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { LocationCard } from "./components/LocationCard";

export function LocationsContainer() {
    const [actionPendingId, setActionPendingId] = useState<string | null>(null);

    const { data: locations, isLoading, refetch } = useQuery({
        queryKey: ["locations"],
        queryFn: () => ocpiService.getLocations(),
    });

    useEffect(() => {
        const handleStatusChange = (event: any) => {
            console.log("Real-time status change:", event);
            refetch();
            toast.info(`Station ${event.stationId} status updated to ${event.status}`);
        };

        RealTimeService.addEventListener("station-status-change", handleStatusChange);
        RealTimeService.addEventListener("connector-status-change", handleStatusChange);
        RealTimeService.addEventListener("transaction-start", handleStatusChange);

        return () => {
            RealTimeService.removeEventListener("station-status-change", handleStatusChange);
            RealTimeService.removeEventListener("connector-status-change", handleStatusChange);
            RealTimeService.removeEventListener("transaction-start", handleStatusChange);
        };
    }, [refetch]);

    const handleAction = async (locationId: string, evseId: string, command: string) => {
        setActionPendingId(evseId);
        try {
            const res = await ocpiService.sendCommand(command, {
                locationId,
                evseId,
                tokenUid: "MOCK_TOKEN_001"
            });
            if (res.result === 'ACCEPTED') {
                toast.success(`${command} command accepted`);
            } else {
                toast.error(`Rejected: ${res.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error("Failed to communicate with CPO");
        } finally {
            setActionPendingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse font-medium">Synchronizing with CPO Network...</p>
            </div>
        );
    }

    return (
        <PageWrapper
            title="Operational Locations"
            subtitle="Real-time monitoring and control of integrated CPO assets"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {locations?.map((location: any) => (
                        <LocationCard
                            key={location.id}
                            location={location}
                            isPending={actionPendingId !== null} // Simplified for demo
                            onAction={(evseId, cmd) => handleAction(location.id, evseId, cmd)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
}
