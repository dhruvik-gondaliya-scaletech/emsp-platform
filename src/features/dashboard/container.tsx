'use client';

import { useQuery } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import {
    Zap,
    MapPin,
    CreditCard,
    Activity
} from "lucide-react";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { StatCard } from "./components/StatCard";
import { UsageChart } from "./components/UsageChart";
import { EventItem } from "./components/EventItem";

const MOCK_CHART_DATA = [
    { name: 'Mon', usage: 400 },
    { name: 'Tue', usage: 300 },
    { name: 'Wed', usage: 600 },
    { name: 'Thu', usage: 800 },
    { name: 'Fri', usage: 500 },
    { name: 'Sat', usage: 900 },
    { name: 'Sun', usage: 700 },
];

export function DashboardContainer() {
    const { data: locations } = useQuery({ queryKey: ["locations"], queryFn: () => ocpiService.getLocations() });
    const { data: sessions } = useQuery({ queryKey: ["sessions"], queryFn: () => ocpiService.getSessions() });
    const { data: cdrs } = useQuery({ queryKey: ["cdrs"], queryFn: () => ocpiService.getCdrs() });

    const stats = [
        {
            label: "Managed Locations",
            value: locations?.length || 0,
            icon: MapPin,
            trend: "+12%",
            positive: true,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            label: "Active Sessions",
            value: sessions?.total || sessions?.items?.length || 0,
            icon: Zap,
            trend: "+5%",
            positive: true,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            label: "Total CDRs",
            value: cdrs?.length || 0,
            icon: CreditCard,
            trend: "-2%",
            positive: false,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            label: "Real-time Connectivity",
            value: "100%",
            icon: Activity,
            trend: "Stable",
            positive: true,
            color: "text-primary",
            bg: "bg-primary/10"
        },
    ];

    return (
        <PageWrapper
            title="Network Overview"
            subtitle="Real-time analytics and asset performance across your eMSP network"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} index={i} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-8 rounded-3xl premium-card-border h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold">Network Utilization</h3>
                            <p className="text-sm text-muted-foreground">Energy consumption over the last 7 days (kWh)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-primary" />
                            <span className="text-xs font-bold">Usage Rate</span>
                        </div>
                    </div>

                    <UsageChart data={MOCK_CHART_DATA} />
                </div>

                <div className="glass-card p-8 rounded-3xl premium-card-border overflow-hidden">
                    <h3 className="text-xl font-bold mb-6">Real-time Stream</h3>
                    <div className="space-y-6">
                        <EventItem
                            type="Authorization"
                            status="Allowed"
                            detail="RFID #38290 approved at Central Plaza"
                            time="2m ago"
                            color="bg-emerald-500"
                        />
                        <EventItem
                            type="Session"
                            status="Started"
                            detail="New session initiated at North Station"
                            time="15m ago"
                            color="bg-blue-500"
                        />
                        <EventItem
                            type="Status Change"
                            status="Occupied"
                            detail="Station ID EVSE-01 is now BUSY"
                            time="24m ago"
                            color="bg-amber-500"
                        />
                        <EventItem
                            type="CDR"
                            status="Received"
                            detail="Final billing record for Session #A23-9"
                            time="1h ago"
                            color="bg-primary"
                        />
                    </div>

                    <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm font-bold transition-all border border-white/5">
                        VIEW ALL LOGS
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
}
