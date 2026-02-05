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
