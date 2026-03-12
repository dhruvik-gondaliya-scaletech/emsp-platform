import { API_CONFIG } from "@/constants/constants";
import httpService from "@/lib/http-service";

export interface OcpiCredential {
    id: string;
    token_a?: string;
    token_b?: string;
    token_c?: string;
    url: string;
    countryCode: string;
    partyId: string;
    roles: any[];
    endpoints: any[];
    createdAt: string;
    updatedAt: string;
}

export interface OcpiToken {
    uid: string;
    type: string;
    authId: string;
    visualNumber?: string;
    issuer: string;
    allowed: boolean;
    whitelist: string;
    lastUpdated: string;
}

export interface OcpiSession {
    id: string;
    party_id: string;
    country_code: string;
    location_id: string;
    evse_uid?: string;
    kwh: number;
    status: string;
    start_date_time: string;
    end_date_time?: string;
    auth_id?: string;
}

export interface OcpiCdr {
    id: string;
    party_id: string;
    country_code: string;
    location_id: string;
    total_energy: number;
    total_time: number;
    total_cost: {
        excl_vat: number;
        incl_vat: number;
    };
    last_updated: string;
}

export interface OcpiTariff {
    id: string;
    party_id: string;
    country_code: string;
    currency: string;
    elements: Array<{
        price_components: Array<{
            type: string;
            price: number;
            step_size: number;
        }>;
    }>;
    last_updated: string;
}

export interface OcpiLocation {
    id: string;
    name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    evses: any[];
    last_updated: string;
}

export interface OcpiCommandResponse {
    result: 'ACCEPTED' | 'REJECTED' | 'UNKNOWN' | 'NOT_SUPPORTED';
    timeout: number;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface OcpiSessionsParams {
    page?: number;
    pageSize?: number;
    search?: string;
}

export const ocpiService = {
    // Internal Data (For Dashboard)
    getLocations: () =>
        httpService.get<OcpiLocation[]>(API_CONFIG.endpoints.ocpi.internal.locations),

    getSessions: (params?: OcpiSessionsParams) => {
        const qp = new URLSearchParams();
        if (params?.page !== undefined) qp.set('page', String(params.page));
        if (params?.pageSize !== undefined) qp.set('pageSize', String(params.pageSize));
        const url = `${API_CONFIG.endpoints.ocpi.internal.sessions}${qp.toString() ? `?${qp.toString()}` : ''}`;
        return httpService.get<PaginatedResponse<OcpiSession>>(url);
    },

    getCdrs: (params?: OcpiSessionsParams) =>
        httpService.get<OcpiCdr[]>(API_CONFIG.endpoints.ocpi.internal.cdrs),

    getTokens: () =>
        httpService.get<OcpiToken[]>(API_CONFIG.endpoints.ocpi.internal.tokens),

    getTariffs: () =>
        httpService.get<OcpiTariff[]>(API_CONFIG.endpoints.ocpi.internal.tariffs),

    getLogs: () =>
        httpService.get<any[]>(API_CONFIG.endpoints.ocpi.internal.logs),

    getStats: () =>
        httpService.get<any>(API_CONFIG.endpoints.ocpi.internal.stats),

    getCredentials: () =>
        httpService.get<OcpiCredential>(API_CONFIG.endpoints.ocpi.internal.credentials),

    // Actions
    registerCpo: (data: { discoveryUrl: string; tokenA: string }) =>
        httpService.post<any>(API_CONFIG.endpoints.ocpi.internal.registerCpo, data),

    sendCommand: (command: string, data: any) =>
        httpService.post<any>(API_CONFIG.endpoints.ocpi.internal.sendCommand, { command, data }),

    startRemoteSession: (data: { locationId: string; evseId: string; tokenUid?: string }) =>
        ocpiService.sendCommand('START_SESSION', data),

    stopRemoteSession: (data: { session_id: string }) =>
        ocpiService.sendCommand('STOP_SESSION', data),

    // OCPI Receiver/Sender (Public/Spec) - kept for potential spec-based debugging/interaction
    getPublicTokens: () => httpService.get<OcpiToken[]>(API_CONFIG.endpoints.ocpi.tokens),
    getPublicSessions: (params?: OcpiSessionsParams) => {
        const qp = new URLSearchParams();
        if (params?.page !== undefined) qp.set('page', String(params.page));
        if (params?.pageSize !== undefined) qp.set('pageSize', String(params.pageSize));
        const url = `${API_CONFIG.endpoints.ocpi.sessions}${qp.toString() ? `?${qp.toString()}` : ''}`;
        return httpService.get<PaginatedResponse<OcpiSession>>(url);
    },
};
