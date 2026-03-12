'use client';

export function EventItem({ type, status, detail, time, color }: { type: string; status: string; detail: string; time: string; color: string }) {
    return (
        <div className="flex gap-4 group cursor-default">
            <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${color} shadow-[0_0_8px] shadow-current`} />
                <div className="w-[1px] flex-1 bg-white/10 my-2" />
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{type}</p>
                    <span className="text-[10px] text-muted-foreground/60">{time}</span>
                </div>
                <p className="text-sm font-semibold">{detail}</p>
            </div>
        </div>
    );
}
