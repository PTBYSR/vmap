import { AuthRecord, Client, Session } from './types';

const STORAGE_KEYS = {
    AUTH_RECORDS: 'vma_auth_records',
    CLIENTS: 'vma_clients',
    SESSION: 'vma_session',
} as const;

/**
 * Seed LocalStorage with default data on first load
 * This simulates a database for MVP purposes
 * TODO: Replace with actual database (PostgreSQL, MongoDB, etc.)
 */
export function seedLocalStorage(): void {
    if (typeof window === 'undefined') return;

    // Seed auth records if not present
    if (!localStorage.getItem(STORAGE_KEYS.AUTH_RECORDS)) {
        const authRecords: AuthRecord[] = [
            {
                authorizationCode: 'VMA-7712',
                consignmentId: 'CN-20498',
                clientId: 'client_001',
            },
        ];
        localStorage.setItem(STORAGE_KEYS.AUTH_RECORDS, JSON.stringify(authRecords));
    }

    // Seed clients if not present
    if (!localStorage.getItem(STORAGE_KEYS.CLIENTS)) {
        const clients: Client[] = [
            {
                id: 'client_001',
                clientName: 'Orchid Offshore Renewables',
                partnerType: 'Institutional Partner',
                authorizationTier: 'Tier-2 Access',
                assignedLiaison: {
                    name: 'Liaison Desk A-3',
                    channel: 'Secure Messaging',
                },
            },
        ];
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    }

    // Seed session if not present
    if (!localStorage.getItem(STORAGE_KEYS.SESSION)) {
        const session: Session = {
            isAuthed: false,
            clientId: null,
            lastAccess: null,
        };
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    }
}

/**
 * Get all authentication records
 * TODO: Replace with database query
 */
export function getAuthRecords(): AuthRecord[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.AUTH_RECORDS);
    return data ? JSON.parse(data) : [];
}

/**
 * Get all clients
 * TODO: Replace with database query
 */
export function getClients(): Client[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    return data ? JSON.parse(data) : [];
}

/**
 * Get client by ID
 * TODO: Replace with database query
 */
export function getClientById(clientId: string): Client | null {
    const clients = getClients();
    return clients.find((c) => c.id === clientId) || null;
}

/**
 * Get current session
 */
export function getSession(): Session {
    if (typeof window === 'undefined') {
        return { isAuthed: false, clientId: null, lastAccess: null };
    }
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : { isAuthed: false, clientId: null, lastAccess: null };
}

/**
 * Set session
 */
export function setSession(session: Session): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Clear session (logout)
 */
export function clearSession(): void {
    if (typeof window === 'undefined') return;
    const session: Session = {
        isAuthed: false,
        clientId: null,
        lastAccess: null,
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Validate credentials against stored auth records
 * TODO: Move to server-side when database is implemented
 */
export function validateCredentials(
    authorizationCode: string,
    consignmentId: string
): { valid: boolean; clientId?: string } {
    const authRecords = getAuthRecords();
    const match = authRecords.find(
        (record) =>
            record.authorizationCode === authorizationCode &&
            record.consignmentId === consignmentId
    );

    if (match) {
        return { valid: true, clientId: match.clientId };
    }

    return { valid: false };
}
