
import { useEffect } from "react";
import { useDevice } from "../hooks/useDevice";
import { DeviceInfoCard } from "../components/DeviceInfoCard";
import { useNavigate } from "react-router-dom";

export function DeviceListPage() {
  const { fetchAllDevices, loading, error, allDevices } = useDevice();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDevices();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-4">PC一覧</h1>
      {allDevices.map((device) => (
        <div key={device.id} className="mb-4">
          <div>
            <DeviceInfoCard device={device} />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-gray-200 rounded-lg p-2 ms-5 text-sm font-medium"
              onClick={(e) => { e.stopPropagation(); navigate('/device/' + device.id + '/qr'); }}>
              QR印刷
            </button>
            <button
              className="bg-gray-200 rounded-lg p-2 text-sm font-medium"
              onClick={(e) => { e.stopPropagation(); navigate('/device/' + device.id + '/edit'); }}>
              編集
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}