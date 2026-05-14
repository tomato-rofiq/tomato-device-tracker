// this component displays detailed information about a device in a card format

import type { Device } from '../types/device.types';
import { useState } from 'react';

interface Props {
  device: Device;
}

export function DeviceInfoCard({ device }: Props) {
  const [showDetails, setShowDetails] = useState(false);

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

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full text-sm text-gray-400 pt-3 text-center"
      >
        {showDetails ? '詳細を隠す ▲' : '詳細を表示 ▼'}
      </button>

      {showDetails && (
        <>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">在/退職</span>
            <span className="font-medium">{device.employmentStatus || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">以前使用者</span>
            <span className="font-medium">{device.previousUser || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">状態</span>
            <span className="font-medium">{device.condition || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">備考</span>
            <span className="font-medium">{device.notes || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">貸出日</span>
            <span className="font-medium">{device.loanDate || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">貸出証</span>
            <span className="font-medium">{device.loanSlip || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">製造社</span>
            <span className="font medium">{device.manufacturer || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">モデル名</span>
            <span className="font-medium">{device.modelName || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">CPU</span>
            <span className="font-medium">{device.cpu || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">RAM</span>
            <span className="font-medium">{device.ram || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">購入日</span>
            <span className="font-medium">{device.purchaseDate || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">OS名</span>
            <span className="font-medium">{device.osName || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">OS License</span>
            <span className="font-medium">{device.osLicense || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">バックアップ</span>
            <span className="font-medium">{device.backup || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">ログインアカウント</span>
            <span className="font-medium">{device.loginAccount || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">Office情報</span>
            <span className="font-medium">{device.office || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">IP</span>
            <span className="font-medium">{device.ip || '—'}</span>
          </div>
        </>
      )}

    </div>
  );
}
