export type PCStatus = 'available' | 'loaned' | 'maintenance' | 'retired';

export type PCClassification = 'in-house' | 'loaned';

export type PCCategory = 'laptop';

export interface PC {
  id: string;
  name: string;
  status: PCStatus;
  classification: PCClassification;
  purpose: string;
  category: PCCategory;
  location: string;
  currentUser: string;
  qrCode: string;
}

export interface PCUpdatePayload {
  id: string;
  status: PCStatus;
  classification: PCClassification;
  purpose: string;
  category: PCCategory;
  location: string;
  currentUser: string;
}

export interface PCHistory {
  pcId: string;
  updatedAt: string;
  updatedBy: string;
  changes: Partial<PC>; //partial type to represent only the fields that were changed
}
