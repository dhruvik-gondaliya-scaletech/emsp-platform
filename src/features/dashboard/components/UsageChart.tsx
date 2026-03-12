'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export function UsageChart({ data }: { data: any[] }) {
    return (
        <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="usage"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorUsage)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
