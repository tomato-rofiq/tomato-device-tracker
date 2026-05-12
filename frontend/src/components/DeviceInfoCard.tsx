// this component displays detailed information about a device in a card format

import type { Device } from '../types/device.types';

interface Props {
  device: Device;
}

export function DeviceInfoCard({ device }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold">{device.name}</h2>
        <p className="text-sm text-gray-500">{device.id}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Status</p>
          <p className="font-medium capitalize">{device.status}</p>
        </div>
        <div>
          <p className="text-gray-500">Classification</p>
          <p className="font-medium capitalize">{device.classification}</p>
        </div>
        <div>
          <p className="text-gray-500">Category</p>
          <p className="font-medium capitalize">{device.category}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium capitalize">{device.location}</p>
        </div>
        <div>
          <p className="text-gray-500">Purpose</p>
          <p className="font-medium capitalize">{device.purpose}</p>
        </div>
        <div>
          <p className="text-gray-500">Current User</p>
          <p className="font-medium">{device.currentUser || '—'}</p>
        </div>
      </div>
    </div>
  );
}
