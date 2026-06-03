// this page is for displaying the list of devices. It fetches the device data 
// Each card has buttons for printing the QR code and editing the device information, 
// which navigate to the respective pages when clicked.

import { useEffect, useState } from "react";
import { useDevice } from "../hooks/useDevice";
import { StatusScreen } from "../components/StatusScreen";
import { ActionsPopover } from "../components/ActionsPopover";
import type { Device } from "../types/device.types";

const COLUMN_OPTIONS: { key: keyof Device; label: string }[] = [
  { key: 'currentUser', label: '現在使用者' },
  { key: 'status', label: '状況' },
  { key: 'classification', label: '分類' },
  { key: 'purpose', label: '用途' },
  { key: 'category', label: '区分' },
  { key: 'location', label: '場所' },
  { key: 'name', label: 'PC名' },
  { key: 'employmentStatus', label: '在/退職' },
  { key: 'previousUser', label: '以前使用者' },
  { key: 'condition', label: '状態' },
  { key: 'notes', label: '備考' },
  { key: 'loanDate', label: '貸出日' },
  { key: 'loanSlip', label: '貸出証' },
  { key: 'manufacturer', label: '製造社' },
  { key: 'modelName', label: 'モデル名' },
  { key: 'cpu', label: 'CPU' },
  { key: 'ram', label: 'RAM' },
  { key: 'purchaseDate', label: '購入日' },
  { key: 'osName', label: 'OS名' },
  { key: 'osLicense', label: 'OS License' },
  { key: 'backup', label: 'バックアップ' },
  { key: 'loginAccount', label: 'ログインアカウント' },
  { key: 'office', label: 'Office情報' },
  { key: 'ip', label: 'IP' },
];

const DESKTOP_COLUMNS: { key: keyof Device; label: string }[] = [
  { key: 'currentUser', label: '現在使用者' },
  { key: 'status', label: '状況' },
  { key: 'classification', label: '分類' },
  { key: 'location', label: '場所' },
  { key: 'purpose', label: '用途' },
  { key: 'category', label: '区分' },
  { key: 'loanDate', label: '貸出日' },
];

const desktopKeys = new Set(DESKTOP_COLUMNS.map(c => c.key));
const DYNAMIC_COLUMN_OPTIONS = COLUMN_OPTIONS.filter(o => !desktopKeys.has(o.key));

export function DeviceListPage() {
  const { fetchAllDevices, loading, error, allDevices } = useDevice();
  const [dynamicColumn, setDynamicColumn] = useState<keyof Device>(
    window.innerWidth < 768 ? 'currentUser' : 'name'
  );
  useEffect(() => {
    fetchAllDevices();
  }, []);

  if (loading || error) return <StatusScreen loading={loading} error={error} />;

  return (
    <div className="min-h-screen pt-20 px-4 pb-6">
      <h1 className="text-xl font-bold mb-4">PC一覧</h1>

      {allDevices.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">デバイスがありません。「QR生成」画面から新しいデバイスを登録してください。</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">            <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-500 text-xs">
            <tr>
              <th className="text-left px-3 py-2 w-16">番号</th>
              {DESKTOP_COLUMNS.map(col => (
                <th key={col.key} className="hidden md:table-cell text-left px-3 py-2">{col.label}</th>
              ))}
              <th className="text-left text-gray-500 px-3 py-2">
                {/* mobile: all columns */}
                <select
                  className="md:hidden border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                  value={dynamicColumn}
                  onChange={e => setDynamicColumn(e.target.value as keyof Device)}
                >
                  {COLUMN_OPTIONS.map(opt => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>

                {/* desktop: exclude fixed columns */}
                <select
                  className="hidden md:block border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                  value={dynamicColumn}
                  onChange={e => setDynamicColumn(e.target.value as keyof Device)}
                >
                  {DYNAMIC_COLUMN_OPTIONS.map(opt => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
              </th>
              <th className="px-3 py-2 w-20"></th>
            </tr>
          </thead>
          <tbody>
            {allDevices.map((device, i) => (
              <tr key={device.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2 font-medium text-gray-700">{device.id}</td>
                {DESKTOP_COLUMNS.map(col => (
                  <td key={col.key} className="hidden md:table-cell px-3 py-2 text-gray-600">
                    <span className="block truncate">{(device[col.key] as string) || '—'}</span>
                  </td>
                ))}
                <td className="px-3 py-2 text-gray-600">
                  <span className="block truncate">{(device[dynamicColumn] as string) || '—'}</span>
                </td>
                <td className="px-3 py-2">
                  <ActionsPopover deviceId={device.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}