// this page is for generating QR code for new device registration

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { addDeviceService } from '../services/deviceService';
import { getEmployeesService } from '../services/employeeService';
import { StatusScreen } from '../components/StatusScreen';
import { DeviceForm } from '../components/DeviceForm';
import { DeviceInfoCard } from '../components/DeviceInfoCard';
import type { Employee } from '../types/user.types';
import type { Device } from '../types/device.types';


export function QRGeneratorPage() {

  const [formData, setFormData] = useState<Device>({
    id: '',
    name: '',
    status: '',
    classification: '',
    purpose: '',
    category: '',
    currentUser: '',
    employmentStatus: '',
    previousUser: '',
    location: '',
    condition: '',
    notes: '',
    loanDate: '',
    loanSlip: '',
    manufacturer: '',
    modelName: '',
    cpu: '',
    ram: '',
    purchaseDate: '',
    osName: '',
    osLicense: '',
    backup: '',
    loginAccount: '',
    office: '',
    ip: '',
  } as Device);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [generatedId, setGeneratedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeesService().then(setEmployees).catch(() => { });
  }, []);

  // handle form submission to add a new device and generate QR code.
  // not using a hook because we want to keep the form state local to 
  // this component and not affect other parts of the app.
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addDeviceService(formData);
      setGeneratedId(formData.id);
    } catch {
      setError('登録に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  }

  // generate the URL for the QR code based on the generated ID
  // window.location.origin will give the base URL of the app, and we append /device/{generatedId} to it
  const qrUrl = generatedId
    ? `${window.location.origin}/device/${generatedId}`
    : '';

  const matchedEmployee = employees.find(e => e.displayName === formData.currentUser);
  const isLoanFlow = !!qrUrl && formData.classification.includes('貸出') && !!matchedEmployee;

  if (loading || error) return <StatusScreen loading={loading} error={error} />;

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-xl font-bold ms-6">新規デバイス登録</h1>

      {qrUrl ? (
        <div className="p-6">
          <DeviceInfoCard device={formData} />
        </div>
      ) : (
        <DeviceForm
          formData={formData}
          onChange={setFormData}
          employees={employees}
          mode="create"
          onSubmit={handleSubmit}
          submitLabel={loading ? '登録中...' : '登録してQRコードを生成'}
          loading={loading}
        />
      )}
      {error && <p className="text-red-500 text-sm px-6">{error}</p>}

      {/* QR code display and print button */}
      {qrUrl && (
        <div className="mt-6 p-6 flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500">番号: {generatedId}</p>
          <QRCodeSVG value={qrUrl} size={200} />
          <button
            onClick={() => window.print()}
            className="w-full rounded-lg border border-gray-300 text-gray-700 mt-6 py-2 text-sm font-medium"
          >
            印刷
          </button>
          {isLoanFlow && (
            <button
              onClick={() => navigate(`/device/${generatedId}/loan`, {
                state: { formData, employee: matchedEmployee, originalDevice: formData }
              })}
              className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium"
            >
              次へ：貸出証発行
            </button>
          )}
        </div>
      )}
    </div>
  );
}