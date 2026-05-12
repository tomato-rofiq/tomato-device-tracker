// this file contains functions to interact with the Google Apps Script backend for device-related operations

import { gasRequest } from './api';
import type { Device } from '../types/device.types';

// Fetch a single device by its ID
export async function getDevice(id: string): Promise<Device> {
  const res = await gasRequest<{ data: Device }>('getDevice', { id });
  return res.data;
}

// Fetch all devices
export async function getAllDevices(): Promise<Device[]> {
  const res = await gasRequest<{ data: Device[] }>('getAllDevices');
  return res.data;
}

// Add a new device by its ID
export async function addDevice(id: string): Promise<void> {
  await gasRequest<{ success: boolean }>('addDevice', { id });
}

