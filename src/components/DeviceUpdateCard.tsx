// this component is for displaying the history of updates for a device in a card format

import type { DeviceHistory, Device } from '../types/device.types';

const fieldLabels: Partial<Record<keyof Device, string>> = {
  status: '状況',
  classification: '分類',
  purpose: '用途',
  category: '区分',
  currentUser: '現在使用者',
  location: '場所',
  name: 'PC名',
  employmentStatus: '在/退職',
  previousUser: '以前使用者',
  condition: '状態',
  notes: '備考',
  loanDate: '貸出日',
  loanSlip: '貸出証',
  manufacturer: '製造社',
  modelName: 'モデル名',
  cpu: 'CPU',
  ram: 'RAM',
  purchaseDate: '購入日',
  osName: 'OS名',
  osLicense: 'OS License',
  backup: 'バックアップ',
  loginAccount: 'ログインアカウント',
  office: 'Office',
  ip: 'IP',
};

export function DeviceUpdateCard({ entry }: { entry: DeviceHistory }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold">
          {new Date(entry.updatedAt).toLocaleString('ja-JP')}
        </span>
        <span className="text-xs text-gray-400">{entry.updatedBy}</span>
      </div>
      <div className="space-y-1">
        {Object.entries(entry.changes).map(([key, value]) => (
          <div key={key} className="flex text-sm border-b border-gray-50 py-1">
            <span className="text-gray-500 w-40 shrink-0">
              {fieldLabels[key as keyof Device] ?? key}
            </span>
            <span>{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
