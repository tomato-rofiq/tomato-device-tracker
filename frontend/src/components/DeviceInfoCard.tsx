// this component displays detailed information about a device in a card format

import type { Device } from '../types/device.types';

interface Props {
  device: Device;
}

export function DeviceInfoCard({ device }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="mb-6">
        <h2 className="text-xl font-bold">{device.name}</h2>
        <p className="text-sm text-gray-500">番号: {device.id}</p>
      </div>

      <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
        <span className="text-gray-500">状況</span>
        <span className="font-medium">{device.status || '—'}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
        <span className="text-gray-500">分類</span>
        <span className="font-medium">{device.classification || '—'}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
        <span className="text-gray-500">用途</span>
        <span className="font-medium">{device.purpose || '—'}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
        <span className="text-gray-500">区分</span>
        <span className="font-medium">{device.category || '—'}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
        <span className="text-gray-500">場所</span>
        <span className="font-medium">{device.location || '—'}</span>
      </div>
      <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
        <span className="text-gray-500">現在使用者</span>
        <span className="font-medium">{device.currentUser || '—'}</span>
      </div>

    </div>
  );
}
