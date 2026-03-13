export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003",
    timeout: 10000,
    endpoints: {
        ocpi: {
            // Public OCPI discovery
            versions: "/ocpi/versions",
            tokens: "/ocpi/emsp/2.2.1/tokens",
            sessions: "/ocpi/emsp/2.2.1/sessions",

            // Internal Manager APIs (Used by Dashboard)
            internal: {
                locations: "/internal/locations",
                sessions: "/internal/sessions",
                cdrs: "/internal/cdrs",
                tokens: "/internal/tokens",
                logs: "/internal/logs",
                registerCpo: "/internal/register-cpo",
                sendCommand: "/internal/command",
                tariffs: "/internal/tariffs",
                stats: "/internal/stats",
                credentials: "/internal/credentials",
            },

            // Receiver Endpoints (CPO pushes here)
            receive: {
                locations: "/ocpi/emsp/2.2.1/locations",
                sessions: "/ocpi/emsp/2.2.1/sessions",
                cdrs: "/ocpi/emsp/2.2.1/cdrs",
                tariffs: "/ocpi/emsp/2.2.1/tariffs",
            }
        }
    }
}

export const FRONTEND_ROUTES = {
    DASHBOARD: "/dashboard",
    LOCATIONS: "/locations",
    LOCATIONS_NEW: "/locations/new",
    LOCATIONS_DETAILS: (id: string) => `/locations/${id}`,
    LOCATIONS_EDIT: (id: string) => `/locations/${id}/edit`,
    STATIONS: "/stations",
    STATIONS_REGISTER: "/stations/register",
    STATIONS_DETAILS: (id: string) => `/stations/${id}`,
    STATIONS_EDIT: (id: string) => `/stations/${id}/edit`,
    SESSIONS: "/sessions",
    TENANTS: "/tenants",
    WEBHOOKS: "/webhooks",
    WEBHOOKS_LOGS: (id: string) => `/webhooks/${id}/logs`,
    OCPI: "/logs",
    CONNECT: "/connect",
    REGISTER: "/register",
    LOGIN: "/login",
    PROFILE: "/profile",
    USERS: "/users",
    VERIFY_EMAIL: "/verify-email",
    ACCEPT_INVITE: "/accept-invitation",
}

export const AUTH_CONFIG = {
    tokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "csms_auth_token",
    userKey: process.env.NEXT_PUBLIC_AUTH_USER_KEY || "csms_user",
    tenantKey: process.env.NEXT_PUBLIC_AUTH_TENANT_KEY || "csms_tenant",
}

export const WEBSOCKET_CONFIG = {
    url: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3003",
    ocppUrl: process.env.NEXT_PUBLIC_CSMS_WEBSOCKET_BASE_URL || "ws://localhost:9220/ocpp",
}

export const CONNECTOR_OPTIONS = [{
    type: "CHAdeMO",
    label: "CHAdeMO",
    description: "Japanese standard"
},
{
    type: "Type2",
    label: "Type 2",
    description: "European AC"
},
{
    type: "CCS",
    label: "CCS",
    description: "Combined Charging System"
},
{
    type: "Type1",
    label: "type1",
    description: "North American standard"
},
{
    type: "COMMANDO",
    label: "Commando",
    description: "Industrial connector"
},
{
    type: "3PIN",
    label: "3-Pin",
    description: "Three-pin connector"
},
{
    type: "SCHUKO",
    label: "Schuko",
    description: "European standard"
},
{
    type: "TYPE3",
    label: "Type 3",
    description: "European standard"
},
{
    type: "NACS",
    label: "NACS",
    description: "North American standard"
},
{
    type: "CCS1",
    label: "CCS1",
    description: "Combined Charging System"
},
{
    type: "MCS",
    label: "MCS",
    description: "Megawatt Charging System"
}
]

export const DEFAULT_PAGE_SIZE = 10;