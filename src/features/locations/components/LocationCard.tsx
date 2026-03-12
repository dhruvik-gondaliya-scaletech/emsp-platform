'use client';

import { motion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";
import { EVSEItem } from "./EVSEItem";

interface LocationCardProps {
  location: any;
  isPending: boolean;
  onAction: (evseId: string, command: string) => void;
}

export function LocationCard({ location, isPending, onAction }: LocationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{location.name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{location.city}, {location.country}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
            <Zap className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div className="space-y-3">
          {location.evses?.map((evse: any) => (
            <EVSEItem
              key={evse.uid}
              evse={evse}
              isPending={isPending}
              onAction={(cmd) => onAction(evse.uid, cmd)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
