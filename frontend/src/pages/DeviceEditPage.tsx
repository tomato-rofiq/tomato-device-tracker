
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDevice } from "../hooks/useDevice";
import { useNavigate } from "react-router";
import type { Device } from "../types/device.types";

export function DeviceEditPage() {
  const { id } = useParams<{ id: string }>();
  const { device, loading, error, fetchDevice, updateDevice } = useDevice();
  const [formData, setFormData] = useState<Device | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchDevice(id);
  }, [id]);

  useEffect(() => {
    if (device) setFormData(device);
  }, [device]);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData) {
      await updateDevice(formData);
      navigate("/device/" + formData.id);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-6">デバイス編集</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">基本情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">状況</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as Device['status'] })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="使用中">使用中</option>
              <option value="未使用">未使用</option>
              <option value="破棄">破棄</option>
              <option value="使用不可">使用不可</option>
              <option value="不明">不明</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">分類</label>
            <select
              value={formData.classification}
              onChange={e => setFormData({ ...formData, classification: e.target.value as Device['classification'] })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="営業管理部">営業管理部</option>
              <option value="現場貸出">現場貸出</option>
              <option value="開発サーバー">開発サーバー</option>
              <option value="社内開発">社内開発</option>
              <option value="貸出(社内開発)">貸出(社内開発)</option>
              <option value="貸出(現場)">貸出(現場)</option>
              <option value="本社待機者">本社待機者</option>
              <option value="新人教育">新人教育</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">用途</label>
            <select
              value={formData.purpose}
              onChange={e => setFormData({ ...formData, purpose: e.target.value as Device['purpose'] })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="営業PC">営業PC</option>
              <option value="サーバー">サーバー</option>
              <option value="入館チェック">入館チェック</option>
              <option value="会議室">会議室</option>
              <option value="開発PC">開発PC</option>
              <option value="開発MAC">開発MAC</option>
              <option value="現場用">現場用</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">区分</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as Device['category'] })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="Desktop">Desktop</option>
              <option value="NotePC">NotePC</option>
              <option value="Mac">Mac</option>
              <option value="Surface">Surface</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">番号</label>
            <input
              type="text"
              value={formData.id}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              disabled
            />
            <div>
              <label className="block text-sm text-gray-500 mb-1">PC名</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">使用者情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">現在使用者</label>
            <input
              type="text"
              value={formData.currentUser}
              onChange={e => setFormData({ ...formData, currentUser: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">在/退職</label>
            <input
              type="text"
              value={formData.employmentStatus}
              onChange={e => setFormData({ ...formData, employmentStatus: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">以前使用者</label>
            <input
              type="text"
              value={formData.previousUser}
              onChange={e => setFormData({ ...formData, previousUser: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">使用場所</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">場所</label>
            <select
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value as Device['location'] })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            >
              <option value="本社">本社</option>
              <option value="本社(開発室)">本社(開発室)</option>
              <option value="本社(開発室-PCラック)">本社(開発室-PCラック)</option>
              <option value="現場">現場</option>
              <option value="自宅">自宅</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">状態情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">状態</label>
            <input
              type="text"
              value={formData.condition}
              onChange={e => setFormData({ ...formData, condition: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">備考</label>
            <input
              type="text"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">貸出情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">貸出日</label>
            <input
              type="date"
              value={formData.loanDate}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">貸出証</label>
            <input
              type="text"
              value={formData.loanSlip}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
              disabled
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">PC情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">製造社</label>
            <input
              type="text"
              value={formData.manufacturer}
              onChange={e => setFormData({ ...formData, manufacturer: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">モデル名</label>
            <input
              type="text"
              value={formData.modelName}
              onChange={e => setFormData({ ...formData, modelName: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">CPU</label>
            <input
              type="text"
              value={formData.cpu}
              onChange={e => setFormData({ ...formData, cpu: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">RAM</label>
            <input
              type="text"
              value={formData.ram}
              onChange={e => setFormData({ ...formData, ram: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">購入日</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={e => setFormData({ ...formData, purchaseDate: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">OS情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">OS名</label>
            <input
              type="text"
              value={formData.osName}
              onChange={e => setFormData({ ...formData, osName: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">OS License</label>
            <input
              type="text"
              value={formData.osLicense}
              onChange={e => setFormData({ ...formData, osLicense: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">バックアップ</label>
            <input
              type="text"
              value={formData.backup}
              onChange={e => setFormData({ ...formData, backup: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">ログインアカウント</label>
            <input
              type="text"
              value={formData.loginAccount}
              onChange={e => setFormData({ ...formData, loginAccount: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Office情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Office</label>
            <input
              type="text"
              value={formData.office}
              onChange={e => setFormData({ ...formData, office: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">IP情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">IP</label>
            <input
              type="text"
              value={formData.ip}
              onChange={e => setFormData({ ...formData, ip: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium"
        >
          {loading ? '更新中...' : '更新'}
        </button>
      </form>
    </div>
  );
};