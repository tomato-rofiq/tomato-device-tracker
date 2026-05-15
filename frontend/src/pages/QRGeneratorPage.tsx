// this page is for generating QR code for new device registration

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { addDeviceService } from '../services/deviceService';

export function QRGeneratorPage() {
  const [number, setNumber] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [modelName, setModelName] = useState('');
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [osName, setOsName] = useState('');
  const [osLicense, setOsLicense] = useState('');
  const [backup, setBackup] = useState('');
  const [loginAccount, setLoginAccount] = useState('');
  const [office, setOffice] = useState('');
  const [generatedId, setGeneratedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // handle form submission to add a new device and generate QR code.
  // not using a hook because we want to keep the form state local to 
  // this component and not affect other parts of the app.
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addDeviceService({
        id: number,
        manufacturer,
        modelName,
        cpu,
        ram,
        purchaseDate,
        osName,
        osLicense,
        backup,
        loginAccount,
        office
      });
      setGeneratedId(number);
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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-6">新規デバイス登録</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">基本情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">PC番号</label>
            <input
              type="text"
              value={number}
              onChange={e => setNumber(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              placeholder="例: 121"
              required
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">PC情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">製造社</label>
            <input
              type="text"
              value={manufacturer}
              onChange={e => setManufacturer(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">モデル名</label>
            <input
              type="text"
              value={modelName}
              onChange={e => setModelName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">CPU</label>
            <input
              type="text"
              value={cpu}
              onChange={e => setCpu(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">RAM</label>
            <select
              value={ram}
              onChange={e => setRam(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="">選択</option>
              <option value="4GB">4GB</option>
              <option value="8GB">8GB</option>
              <option value="12GB">12GB</option>
              <option value="16GB">16GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">購入日</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={e => setPurchaseDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">OS情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">OS名</label>
            <input type="text" value={osName} onChange={e => setOsName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">OS License</label>
            <input type="text" value={osLicense} onChange={e => setOsLicense(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">バックアップ</label>
            <input type="text" value={backup} onChange={e => setBackup(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">ログインア</label>
            <input type="text" value={loginAccount} onChange={e => setLoginAccount(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Office情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Office</label>
            <input type="text" value={office} onChange={e => setOffice(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium"
        >
          {loading ? '登録中...' : '登録してQRコードを生成'}
        </button>
      </form>

      {/* QR code display and print button */}
      {qrUrl && (
        <div className="mt-6 bg-white rounded-2xl shadow p-6 flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500">番号: {generatedId}</p>
          <QRCodeSVG value={qrUrl} size={200} />
          <button
            onClick={() => window.print()}
            className="w-full bg-gray-100 text-gray-700 rounded-lg py-2 text-sm font-medium"
          >
            印刷
          </button>
        </div>
      )}
    </div>
  );
}