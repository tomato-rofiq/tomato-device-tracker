// this service handles logging updates to devices and fetching the update history of devices, 
// including who made the change and what was changed

import { gasRequest } from './api';
import type { Device, DeviceHistory } from '../types/device.types';

// for logging updates everytime a device is updated
export async function logUpdateService(
  deviceId: string,
  updatedBy: string,
  changes: Partial<Device>
): Promise<void> {
  await gasRequest<{ success: boolean }>('logUpdate', {
    deviceId,
    updatedAt: new Date().toISOString(), // date is generated on the frontend
    updatedBy,
    changes,
  });
}

// for fetching the update history of a device, including who made the change and what was changed
export async function getDeviceHistoryService(deviceId: string): Promise<DeviceHistory[]> {
  const res = await gasRequest<{ data: DeviceHistory[] }>('getDeviceHistory', { deviceId });
  return res.data;
}
