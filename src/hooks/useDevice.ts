// this file contains a custom React hook to manage device-related state and operations

import { useState } from 'react';
import { useAuth } from './useAuth';
import { getAllDevicesService, getDeviceService, updateDeviceService } from '../services/deviceService';
import { logUpdateService } from '../services/historyService';
import { log } from '../services/logger';
import type { Device } from '../types/device.types';

// this is a helper function to compute the difference between 
// two device objects after it is updated so that we can log the changes in the history
function computeDiff(before: Device, after: Device): Partial<Device> {
  const changes: Partial<Device> = {};
  for (const key of Object.keys(after) as (keyof Device)[]) {
    if (before[key] !== after[key]) {
      (changes as any)[key] = after[key];
    }
  }
  return changes; // changes is a JSON object that only contains the fields that were changed
}

export function useDevice() {
  const [device, setDevice] = useState<Device | null>(null); // State for a single device
  const [allDevices, setAllDevices] = useState<Device[]>([]); // State for all devices
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages
  const { user } = useAuth(); // Get the current user from authentication context

  // Fetch a single device by ID and update state
  async function fetchDevice(id: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await getDeviceService(id);
      setDevice(data);
    } catch (err) {
      log.error('fetchDevice failed', id, err);
      setError('Failed to fetch device');
    } finally {
      setLoading(false);
    }
  }

  // Fetch all devices and update state
  async function fetchAllDevices() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllDevicesService();
      setAllDevices(data);
    } catch (err) {
      log.error('fetchAllDevices failed', err);
      setError('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  }

  // Update a device and log the changes if there are any
  // the before device is optional, if it is not provided, 
  // we will use the current device state as the before device
  async function updateDevice(payload: Device, before?: Device) {
    setLoading(true);
    setError(null);
    try {
      await updateDeviceService(payload);
      const beforeDevice = before ?? device;
      if (beforeDevice && user) {
        const changes = computeDiff(beforeDevice, payload);
        if (Object.keys(changes).length > 0) {
          log.info('device updated', payload.id, 'by', user.email, changes);
          await logUpdateService(payload.id, user.email, changes);
        }
      }
    } catch (err) {
      log.error('updateDevice failed', payload.id, err);
      setError('Failed to update device');
    } finally {
      setLoading(false);
    }
  }


  return { device, allDevices, loading, error, fetchDevice, fetchAllDevices, updateDevice };
}
