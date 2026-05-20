// this page is for editing device information. 
// It fetches the device data using the useDevice hook and displays a form for 
// editing the device information. When the form is submitted, it calls the 
// updateDevice function from the useDevice hook to update the device information in the backend.

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDevice } from "../hooks/useDevice";
import { useNavigate } from "react-router";
import { getEmployeesService } from "../services/employeeService";
import type { Device } from "../types/device.types";
import type { Employee } from "../types/user.types";
import { StatusScreen } from "../components/StatusScreen";

export function DeviceEditPage() {
  const { id } = useParams<{ id: string }>();
  const { device, loading, error, fetchDevice, updateDevice } = useDevice();
  const [formData, setFormData] = useState<Device | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch device data when component mounts or id changes
  useEffect(() => {
    if (id) fetchDevice(id);
  }, [id]);

  // Fetch employee list for the current user dropdown
  useEffect(() => {
    getEmployeesService().then(setEmployees).catch(() => { });
  }, []);

  useEffect(() => {
    if (device) setFormData(device);
  }, [device]);

  useEffect(() => {
    setEmployeesLoading(true);
    getEmployeesService()
      .then(setEmployees)
      .catch(() => { })
      .finally(() => setEmployeesLoading(false));
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData) {
      try {
        // find employee object based on currentUser displayName
        const employee = employees.find(emp => emp.displayName === formData.currentUser);
        // if classification includes "貸出" and employee is found, 
        // navigate to loan page instead of updating device
        if (formData.classification.includes("貸出") && employee) {
          // pass the original device data to the loan page so that we can compare the 
          // before and after data and log the changes in the history
          navigate(`/device/${formData.id}/loan`, { state: { formData, employee, originalDevice: device } });
        } else {
          await updateDevice(formData);
          navigate("/device/" + formData.id);
        }
      } catch (err) {
        console.error("Error updating device:", err);
      }
    }
  };

  if (loading || employeesLoading || error) return <StatusScreen loading={loading} error={error} />;
  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-6">デバイス詳細編集</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">

        <div className="bg-yellow-50 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-sm text-yellow-500 font-semibold uppercase tracking-wide">使用状況</h2>
          <div>
            <label className="block text-sm text-yellow-500 mb-1">現在使用者</label>
            <select
              value={formData.currentUser}
              onChange={e => {
                // When the current user changes, we also want to update the employment status based on the selected employee
                const selectedEmployee = employees.find(emp => emp.displayName === e.target.value);
                setFormData({
                  ...formData,
                  currentUser: e.target.value,
                  employmentStatus: selectedEmployee ? selectedEmployee.status : '',
                });
              }}
              className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm"
            >
              <option value="">選択なし</option>
              {employees.map(emp => (
                <option key={emp.number} value={emp.displayName}>{emp.displayName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-yellow-500 mb-1">状況</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as Device['status'] })}
              disabled={!formData.currentUser}
              className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
            >
              <option value="">選択</option>
              <option value="1使用中">1使用中</option>
              <option value="2未使用">2未使用</option>
              <option value="3破棄">3破棄</option>
              <option value="4使用不可">4使用不可</option>
              <option value="5不明">5不明</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-yellow-500 mb-1">分類</label>
            <select
              value={formData.classification}
              onChange={e => setFormData({ ...formData, classification: e.target.value as Device['classification'] })}
              disabled={!formData.status}
              className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
            >
              <option value="">選択</option>
              <option value="1営業管理部">1営業管理部</option>
              <option value="2現場貸出">2現場貸出</option>
              <option value="3開発サーバー">3開発サーバー</option>
              <option value="4社内開発">4社内開発</option>
              <option value="5貸出(社内開発)">5貸出(社内開発)</option>
              <option value="6貸出(現場)">6貸出(現場)</option>
              <option value="7本社待機者">7本社待機者</option>
              <option value="8新人教育">8新人教育</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-yellow-500 mb-1">場所</label>
            <select
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value as Device['location'] })}
              disabled={!formData.classification}
              className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
            >
              <option value="">選択</option>
              <option value="1本社">1本社</option>
              <option value="2本社(開発室)">2本社(開発室)</option>
              <option value="3本社(開発室-PCラック)">3本社(開発室-PCラック)</option>
              <option value="4現場">4現場</option>
              <option value="5自宅">5自宅</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-yellow-500 mb-1">用途</label>
            <select
              value={formData.purpose}
              onChange={e => setFormData({ ...formData, purpose: e.target.value as Device['purpose'] })}
              disabled={!formData.location}
              className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
            >
              <option value="">選択</option>
              <option value="1営業PC">1営業PC</option>
              <option value="2サーバー">2サーバー</option>
              <option value="3入館チェック">3入館チェック</option>
              <option value="4会議室">4会議室</option>
              <option value="5開発PC">5開発PC</option>
              <option value="6開発MAC">6開発MAC</option>
              <option value="7現場用">7現場用</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-yellow-500 mb-1">区分</label>
            <select
              value={formData.category}
              onChange={e => setFormData({
                ...formData,
                category: e.target.value as Device['category']
              })}
              disabled={!formData.purpose}
              className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
            >
              <option value="">選択</option>
              <option value="1Desktop">1Desktop</option>
              <option value="2NotePC">2NotePC</option>
              <option value="3Mac">3Mac</option>
              <option value="4Surface">4Surface</option>
              <option value="5Tablet">5Tablet</option>
            </select>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">基本情報</h2>
          <div>
            <label className="block text-sm mb-1">番号</label>
            <input
              type="text"
              value={formData.id}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm disabled:bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm mb-1">PC名</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">使用者情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">在/退職</label>
            <input
              type="text"
              value={formData.employmentStatus}
              disabled
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">以前使用者</label>
            <select
              value={formData.previousUser}
              onChange={e => setFormData({ ...formData, previousUser: e.target.value })}
              className="w-full border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm"
            >
              <option value="">選択なし</option>
              {employees.map(emp => (
                <option key={emp.number} value={emp.displayName}>{emp.displayName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
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

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">貸出情報</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">貸出日</label>
            <input
              type="date"
              value={formData.loanDate}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm disabled:bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">貸出証</label>
            <input
              type="text"
              value={formData.loanSlip}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
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
            <select
              value={formData.ram}
              onChange={e => setFormData({ ...formData, ram: e.target.value as Device['ram'] })}
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
              value={formData.purchaseDate}
              onChange={e => setFormData({ ...formData, purchaseDate: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
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
            <label className="block text-sm text-gray-500 mb-1">バックアップイメージ作成日</label>
            <input
              type="date"
              value={formData.backup}
              onChange={e => setFormData({ ...formData, backup: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">ログインアカウント/パスワード/PIN</label>
            <input
              type="text"
              value={formData.loginAccount}
              onChange={e => setFormData({ ...formData, loginAccount: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
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

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
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