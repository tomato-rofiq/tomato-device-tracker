// this page is for showing the update history of a device, 
// it will fetch the history data from the backend and display it in a list of cards

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDeviceHistoryService } from '../services/historyService';
import { DeviceUpdateCard } from '../components/DeviceUpdateCard';
import { StatusScreen } from '../components/StatusScreen';
import type { DeviceHistory } from '../types/device.types';

export function DeviceUpdateHistoryPage() {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState<DeviceHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getDeviceHistoryService(id)
      .then(setHistory)
      .catch(() => setError('履歴の取得に失敗しました。'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || error) return <StatusScreen loading={loading} error={error} />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">更新履歴</h1>
      </div>
      <p className="text-sm text-gray-400 mb-4">デバイス番号: {id}</p>
      {history.length === 0
        ? <p className="text-center text-gray-400 mt-10">更新履歴がありません。</p>
        : history.map((entry, index) => (
          <DeviceUpdateCard key={index} entry={entry} />
        ))
      }
    </div>
  );
}
