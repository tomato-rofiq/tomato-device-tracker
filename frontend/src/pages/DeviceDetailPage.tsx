// this page shows detailed information about a single device, including its history and current status

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';
import { DeviceInfoCard } from '../components/DeviceInfoCard';

export function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { device, loading, error, fetchDevice } = useDevice();

  useEffect(() => {
    if (id) fetchDevice(id);
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!device) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DeviceInfoCard device={device} />
    </div>
  );
}
