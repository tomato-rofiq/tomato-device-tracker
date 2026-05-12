export type DeviceStatus = 'available' | 'loaned' | 'maintenance' | 'retired';

export type DeviceClassification = 'in-house' | 'loaned';

export type DeviceCategory = 'laptop';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  classification: DeviceClassification;
  purpose: string;
  category: DeviceCategory;
  location: string;
  currentUser: string;
  qrCode: string;
}

export interface DeviceUpdatePayload {
  id: string;
  status: DeviceStatus;
  classification: DeviceClassification;
  purpose: string;
  category: DeviceCategory;
  location: string;
  currentUser: string;
}

export interface DeviceHistory {
  deviceId: string;
  updatedAt: string;
  updatedBy: string;
  changes: Partial<Device>; //partial type to represent only the fields that were changed
}
