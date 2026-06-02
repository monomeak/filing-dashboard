export type TimelineEventType = 'create' | 'amendment' | 'correction' | 'renew' | 'termination';

export interface TimelineParty {
  name: string;
  type: string;
  idNumber: string;
  nameKhmer?: string;
  country?: string;
  province?: string;
  district?: string;
  commune?: string;
  phume?: string;
  streetNumber?: string;
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  noticeNumber: string;
  date: string;
  issuedDate?: string;
  expirationDate?: string;
  newExpirationDate?: string;
  description?: string;
  status?: string;
  details?: {
    interestType?: string;
    partySize?: string;
    contractNumber?: string;
    loanValue?: string;
    securingParties?: TimelineParty[];
    secuingParties?: TimelineParty[];
    securedParties?: TimelineParty[];
    collateral?: {
      type: string;
      description: string;
      attachments?: string[];
    };
  };
}

export interface TimelineDisplayEvent extends TimelineEvent {
  elapsedLabel: string;
  timestamp: number;
}
