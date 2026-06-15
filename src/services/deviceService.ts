// this service is for fetching device data from the backend

import { gasRequest } from './api';
import type { Device } from '../types/device.types';

// Fetch a single device by its ID
export async function getDeviceService(id: string): Promise<Device> {
  const res = await gasRequest<{ data: Device }>('getDevice', { id });
  return res.data;
}

// Fetch all devices
export async function getAllDevicesService(): Promise<Device[]> {
  const res = await gasRequest<{ data: Device[] }>('getAllDevices');
  return res.data;
}

// add a new device with detailed information
// all device info is optional except for id
export interface AddDevicePayload {
  id: string;
  manufacturer?: string;
  modelName?: string;
  cpu?: string;
  ram?: string;
  purchaseDate?: string;
  osName?: string;
  osLicense?: string;
  backup?: string;
  loginAccount?: string;
  office?: string;
}

// Add a new device by its ID
export async function addDeviceService(payload: AddDevicePayload): Promise<void> {
  await gasRequest<{ success: boolean }>('addDevice', payload);
}

// Update an existing device with new information
export async function updateDeviceService(payload: Device): Promise<void> {
  await gasRequest<{ success: boolean }>('updateDevice', { payload });
}