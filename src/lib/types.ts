export interface MuseCode {
  id: string;
  code: string;
  createdAt: string; // ISO date
  copyCount: number; // max 30
  maxCopies: number; // default 30
  reportCount: number;
  status: "active" | "exhausted" | "hidden" | "removed";
  lastCopiedAt?: string;
  source: "web" | "app";
  addedByIpHash?: string;
  notes?: string;
}

export interface CodeReport {
  id: string;
  codeId: string;
  code: string;
  reason: string;
  createdAt: string;
  ipHash?: string;
}

export interface AdminStats {
  totalCodes: number;
  activeCodes: number;
  exhaustedCodes: number;
  totalCopies: number;
  totalReports: number;
}

export interface AdSettings {
  adsterraEnabled: boolean;
  adsterraBannerId?: string;
  adsterraNativeId?: string;
  adsterraDirectLink?: string;
  interstitialDurationSeconds: number; // default 5
}
