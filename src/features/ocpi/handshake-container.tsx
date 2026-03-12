'use client';

import { useMutation } from "@tanstack/react-query";
import { ocpiService } from "@/services/ocpi.service";
import { toast } from "sonner";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { HandshakeForm } from "./components/handshake/HandshakeForm";
import { ShieldCheck, Info } from "lucide-react";

export function HandshakeContainer() {
    const { mutate, isPending } = useMutation({
        mutationFn: (data: { discoveryUrl: string; tokenA: string }) => ocpiService.registerCpo(data),
        onSuccess: () => {
            toast.success("Handshake initiated successfully! Redirecting to credentials status...");
        },
        onError: (error: any) => {
            toast.error(`Handshake failed: ${error.message || 'Check your URL and Token'}`);
        }
    });

    return (
        <PageWrapper
            title="Connect to CPO"
            subtitle="Initiate the OCPI 2.2.1 credentials handshake with a charging network provider"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="glass-card p-8 rounded-3xl premium-card-border space-y-8">
                    <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-2xl border border-primary/20">
                        <ShieldCheck className="w-8 h-8" />
                        <div>
                            <h4 className="font-bold">Secure Credentials Exchange</h4>
                            <p className="text-xs opacity-80">This process will automatically exchange Token A for a permanent Token B.</p>
                        </div>
                    </div>

                    <HandshakeForm
                        onSubmit={(values) => mutate(values)}
                        isPending={isPending}
                    />
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-3xl premium-card-border space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Info className="w-5 h-5" />
                            <h3 className="font-bold text-sm uppercase tracking-widest">Handshake Checklist</h3>
                        </div>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">1</div>
                                <span className="opacity-80">Obtain Token A from your CPO's management portal.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">2</div>
                                <span className="opacity-80">Verify the Discovery URL (usually ends in /ocpi/versions).</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px] font-bold">3</div>
                                <span className="opacity-80">Ensure your server is accessible for the CPO's callback push.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-xs text-amber-500 font-bold leading-relaxed">
                            💡 PRO TIP: If the handshake fails, verify that both parties are using compatible OCPI 2.2.1 schemas. Check the Protocol Stream for detailed error logs.
                        </p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
