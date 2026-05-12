import type { DeviceUpdatePayload } from '../types/device.types';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownLevel {
  key: keyof DeviceUpdatePayload;
  label: string;
  dependsOn: keyof DeviceUpdatePayload | null;
  options: Record<string, DropdownOption[]> | DropdownOption[];
}

export const dropdownConfig: DropdownLevel[] = [];
