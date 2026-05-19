// this page is for displaying the list of devices. It fetches the device data 
// using the useDevice hook and displays a list of DeviceInfoCard components. 
// Each card has buttons for printing the QR code and editing the device information, 
// which navigate to the respective pages when clicked.

import { useEffect } from "react";
import { useDevice } from "../hooks/useDevice";
import { DeviceInfoCard } from "../components/DeviceInfoCard";
import { useNavigate } from "react-router-dom";
import { StatusScreen } from "../components/StatusScreen";

export function DeviceListPage() {
  const { fetchAllDevices, loading, error, allDevices } = useDevice();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDevices();
  }, []);

  if (loading || error) return <StatusScreen loading={loading} error={error} />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-4">PC一覧</h1>
      {allDevices.length === 0
        ? <p className="text-center text-gray-400 mt-10">デバイスがありません。「QR生成」画面から新しいデバイスを登録してください。</p>
        : allDevices.map(device => (
          <div key={device.id} className="mb-4">
            <div>
              <DeviceInfoCard device={device} />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="w-full bg-gray-200 rounded-lg p-2 text-sm font-medium"
                onClick={(e) => { e.stopPropagation(); navigate('/device/' + device.id + '/qr'); }}>
                QR印刷
              </button>
              <button
                className="w-full bg-gray-200 rounded-lg p-2 text-sm font-medium"
                onClick={(e) => { e.stopPropagation(); navigate('/device/' + device.id + '/edit'); }}>
                編集
              </button>
              <button
                className="w-full bg-gray-200 rounded-lg p-2 text-sm font-medium"
                onClick={(e) => { e.stopPropagation(); navigate('/device/' + device.id + '/history'); }}>
                更新履歴
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}