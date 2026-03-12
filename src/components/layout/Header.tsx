'use client';

import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="fixed top-0 right-0 left-64 h-16 glass border-b z-40 flex items-center justify-between px-8">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full w-96 group focus-within:border-primary/50 transition-colors">
                <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search locations, sessions..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/60"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <div className="relative">
                    <button className="p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                    </button>
                </div>

                <div className="h-8 w-[1px] bg-white/10 mx-2" />

                <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-colors group">
                    <div className="text-right">
                        <p className="text-sm font-semibold leading-none">Dhruvik</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center border-2 border-white/10 shadow-lg group-hover:scale-105 transition-transform">
                        <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                </button>
            </div>
        </header>
    );
}
