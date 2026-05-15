// this file contains a custom React hook to manage device-related state and operations

import { useState } from 'react';
import type { Device } from '../types/device.types';
import { getAllDevicesService, getDeviceService, updateDeviceService } from '../services/deviceService';

export function useDevice() {
  const [device, setDevice] = useState<Device | null>(null); // State for a single device
  const [allDevices, setAllDevices] = useState<Device[]>([]); // State for all devices
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Fetch a single device by ID and update state
  async function fetchDevice(id: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await getDeviceService(id);
      setDevice(data);
    } catch (err) {
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
      setError('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  }

  // Update a device's information and handle loading/error states
  async function updateDevice(payload: Device) {
    setLoading(true);
    setError(null);
    try {
      await updateDeviceService(payload);
    } catch {
      setError('Failed to update device');
    } finally {
      setLoading(false);
    }
  }

  return { device, allDevices, loading, error, fetchDevice, fetchAllDevices, updateDevice };
}
