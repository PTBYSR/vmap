import { Session, ConsignmentData } from './types';

const STORAGE_KEYS = {
    SESSION: 'vma_session',
    ADMIN_AUTH: 'vm_admin_auth',
    ACTIVE_CONSIGNMENT: 'vm_active_consignment',
} as const;

/**
 * Initialize session in localStorage if not present
 */
export function initSession(): void {
    if (typeof window === 'undefined') return;
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
 * Get current session from localStorage
 */
export function getSession(): Session {
    if (typeof window === 'undefined') {
        return { isAuthed: false, clientId: null, lastAccess: null };
    }
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : { isAuthed: false, clientId: null, lastAccess: null };
}

/**
 * Set session in localStorage
 */
export function setSession(session: Session): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Validate credentials against MongoDB (Simulated for now)
 */
export async function validateCredentials(
    authorizationCode: string,
    consignmentId: string
): Promise<{ valid: boolean; clientId?: string }> {
    // In a real app, this would be a POST /api/auth/verify
    // For MVP, we'll check against our seeded record
    if (authorizationCode === 'VMA-7712' && consignmentId === 'CN-20498') {
        return { valid: true, clientId: 'client_001' };
    }
    return { valid: false };
}

/**
 * Clear session in localStorage
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
 * Get consignment data from localStorage
 */
export async function getConsignment(consignmentId: string): Promise<ConsignmentData | null> {
    if (typeof window === 'undefined') return null;

    // First check local storage
    const localData = localStorage.getItem(`consignment_${consignmentId}`);
    if (localData) {
        return JSON.parse(localData);
    }

    // Fallback/Seed for the demo consignment
    if (consignmentId === 'VM-7712') {
        const defaultData: ConsignmentData = {
            consignmentId: 'VM-7712',
            authorizationKeyHint: 'VMA-7*** / CN-20***',
            progressPercent: 40,
            progress: {
                totalProgress: 40,
                currentStage: 2,
                stages: [
                    { id: 1, name: 'Extraction', location: 'The Port of Hong Kong', date: '2026-02-01', status: 'COMPLETED' },
                    { id: 2, name: 'Regional Hub Sorting', location: 'Singapore (SIN)', date: '2026-02-04', status: 'IN_PROGRESS' },
                    { id: 3, name: 'Customs Clearance', location: 'Dubai (DXB)', date: 'Pending', status: 'LOCKED' },
                    { id: 4, name: 'Final Dispatch', location: 'London (LHR)', date: 'Pending', status: 'LOCKED' },
                ],
            },
            transportMedium: 'Sea',
            updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(`consignment_${consignmentId}`, JSON.stringify(defaultData));
        return defaultData;
    }

    return null;
}

/**
 * Set consignment data in localStorage
 */
export async function setConsignment(consignment: ConsignmentData): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    try {
        localStorage.setItem(`consignment_${consignment.consignmentId}`, JSON.stringify(consignment));
        return true;
    } catch (error) {
        console.error('Error saving consignment to localStorage:', error);
        return false;
    }
}

/**
 * Get admin authentication status (localStorage for now)
 */
export function getAdminAuth(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

/**
 * Set admin authentication status
 */
export function setAdminAuth(authed: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, authed ? 'true' : 'false');
}

/**
 * Clear admin session
 */
export function clearAdminSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'false');
}

/**
 * Get active consignment ID from localStorage
 */
export function getActiveConsignmentId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CONSIGNMENT);
}

/**
 * Set active consignment ID
 */
export function setActiveConsignmentId(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CONSIGNMENT, id);
}
