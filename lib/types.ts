export interface Liaison {
  name: string;
  channel: string;
}

export interface Client {
  id: string;
  clientName: string;
  partnerType: string;
  authorizationTier: string;
  assignedLiaison: Liaison;
}

export interface AuthRecord {
  authorizationCode: string;
  consignmentId: string;
  clientId: string;
}

export interface Session {
  isAuthed: boolean;
  clientId: string | null;
  lastAccess: string | null;
}

// Admin-Controlled Tracking Dashboard Types

export type StageStatus =
  | 'ACTIVE'
  | 'PENDING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'SKIPPED'; // keeping SKIPPED just in case, or maybe just stick to the requested ones plus generic fallback

export interface Stage {
  id: number;
  name: string;      // Extraction, Hub, etc.
  label?: string;    // Keep for compatibility if used elsewhere
  location: string;
  date: string;      // Editable date or "Pending"
  status: StageStatus;
}

export interface Stop {
  stageId: number;
  location: string;
  activity: string;
}

export interface LogEntry {
  ts: string;
  location: string;
  message: string;
}

export interface ConsignmentData {
  consignmentId: string;
  authorizationKeyHint?: string;
  progressPercent: number; // 0-100%
  progress: {
    totalProgress: number; // 0-100% of the entire journey
    currentStage: number; // 1-4
    stages: Stage[];
  };
  transportMedium: 'Air' | 'Sea' | 'Land' | 'Pending';
  updatedAt: string;
}

export interface AdminSession {
  isAuthed: boolean;
  lastAccess: string | null;
}
