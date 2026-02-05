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
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'ALERT_YELLOW'
  | 'ALERT_RED'
  | 'LOCKED';

export interface Stage {
  id: number;
  label: string;
  location: string;
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
