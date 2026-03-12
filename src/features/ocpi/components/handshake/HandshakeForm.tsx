'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Globe, Key, Send } from "lucide-react";

const handshakeSchema = z.object({
    discoveryUrl: z.string().url("Please enter a valid discovery URL"),
    tokenA: z.string().min(10, "Token A must be at least 10 characters"),
});

type HandshakeFormValues = z.infer<typeof handshakeSchema>;

interface HandshakeFormProps {
    onSubmit: (values: HandshakeFormValues) => void;
    isPending: boolean;
}

export function HandshakeForm({ onSubmit, isPending }: HandshakeFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<HandshakeFormValues>({
        resolver: zodResolver(handshakeSchema),
        defaultValues: {
            discoveryUrl: "",
            tokenA: "",
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        CPO Discovery URL
                    </label>
                    <input
                        {...register("discoveryUrl")}
                        placeholder="https://cpo.example.com/ocpi/versions"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all font-medium"
                    />
                    {errors.discoveryUrl && <p className="text-xs text-destructive font-bold">{errors.discoveryUrl.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Credentials Token (Token A)
                    </label>
                    <input
                        {...register("tokenA")}
                        placeholder="Enter the registration token provided by the CPO"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all font-mono text-sm"
                    />
                    {errors.tokenA && <p className="text-xs text-destructive font-bold">{errors.tokenA.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                        <Send className="w-5 h-5" />
                        INITIATE OCPI HANDSHAKE
                    </>
                )}
            </button>
        </form>
    );
}
