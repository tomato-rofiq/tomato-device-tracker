// this page shows detailed information about a single device, including its history and current status

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';
import { DeviceInfoCard } from '../components/DeviceInfoCard';
import { StatusScreen } from '../components/StatusScreen';

export function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { device, loading, error, fetchDevice } = useDevice();

  useEffect(() => {
    if (id) fetchDevice(id);
  }, [id]);

  if (loading || error) return <StatusScreen loading={loading} error={error} />;
  if (!device) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-4">デバイス詳細</h1>
      <DeviceInfoCard device={device} />
    </div>
  );
}
