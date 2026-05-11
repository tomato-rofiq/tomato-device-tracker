import type { PCUpdatePayload } from '../types/pc.types';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownLevel {
  key: keyof PCUpdatePayload;
  label: string;
  dependsOn: keyof PCUpdatePayload | null;
  options: Record<string, DropdownOption[]> | DropdownOption[];
}

export const dropdownConfig: DropdownLevel[] = [];
