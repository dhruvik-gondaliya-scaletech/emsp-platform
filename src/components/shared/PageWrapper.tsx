'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    action?: ReactNode;
}

export function PageWrapper({ children, title, subtitle, action }: PageWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
        >
            {(title || subtitle || action) && (
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
                        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </motion.div>
    );
}
