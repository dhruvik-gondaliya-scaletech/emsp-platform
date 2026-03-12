'use client';

import { motion } from "framer-motion";
import { format } from "date-fns";

interface LogLineProps {
    log: any;
    index: number;
}

export function LogLine({ log, index }: LogLineProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4 group py-1"
        >
            <span className="opacity-30 whitespace-nowrap">{format(new Date(log.timestamp), 'HH:mm:ss.SSS')}</span>
            <span className={`font-bold w-16 ${log.type === 'PUSH' ? 'text-blue-500' : 'text-amber-500'}`}>[{log.type}]</span>
            <div className="flex-1 break-all">
                <span className="text-foreground/90">{log.message}</span>
                {log.data && (
                    <div className="mt-2 p-3 bg-white/5 rounded-xl text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <pre>{JSON.stringify(log.data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
