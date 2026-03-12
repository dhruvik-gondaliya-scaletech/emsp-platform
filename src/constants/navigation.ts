import { LucideIcon, LayoutDashboard, MapPin, Zap, History, Terminal, Settings, LogOut } from 'lucide-react';

interface NavItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Connect to CPO', icon: Zap, path: '/connect' },
    { label: 'Locations', icon: MapPin, path: '/locations' },
    { label: 'Active Sessions', icon: Zap, path: '/sessions' },
    { label: 'History (CDRs)', icon: History, path: '/cdrs' },
    { label: 'OCPI Logs', icon: Terminal, path: '/logs' },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
    { label: 'Settings', icon: Settings, path: '/settings' },
];
