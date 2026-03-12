'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from '@/constants/navigation';
import { Zap, LogOut } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass border-r z-50 flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                    <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight">Charlie</h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">eMSP Partner</p>
                </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link key={item.path} href={item.path}>
                            <div className={cn(
                                "relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                            )}>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                {BOTTOM_NAV_ITEMS.map((item) => (
                    <Link key={item.path} href={item.path}>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </div>
                    </Link>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
