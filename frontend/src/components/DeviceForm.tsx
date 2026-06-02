
import type { Device } from '../types/device.types';
import type { Employee } from '../types/user.types';

interface Props {
  formData: Device,
  onChange: (formData: Device) => void,
  employees: Employee[],
  mode: 'create' | 'edit',
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  submitLabel: string,
  loading: boolean,
}

export function DeviceForm({
  formData,
  onChange,
  employees,
  mode,
  onSubmit,
  submitLabel,
  loading,
}: Props) {

  return (

    <form onSubmit={onSubmit} className="p-6 space-y-4">

      <div className="bg-yellow-50 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-sm text-yellow-500 font-semibold uppercase tracking-wide">使用状況</h2>
        <div>
          <label className="block text-sm text-yellow-500 mb-1">現在使用者</label>
          <input
            list="employees-list"
            value={formData.currentUser}
            onChange={e => {
              // When the current user changes, we also want to update the employment status based on the selected employee
              const selectedEmployee = employees.find(emp => emp.displayName === e.target.value);
              onChange({
                ...formData,
                currentUser: e.target.value,
                employmentStatus: selectedEmployee ? selectedEmployee.status : '',
              });
            }}
            className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm"
          />
          <datalist id="employees-list">
            <option value="">選択なし</option>
            {employees.map(emp => (
              <option key={emp.number} value={emp.displayName}>{emp.displayName}</option>
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-sm text-yellow-500 mb-1">状況</label>
          <select
            value={formData.status}
            onChange={e => onChange({ ...formData, status: e.target.value as Device['status'] })}
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
            onChange={e => onChange({ ...formData, classification: e.target.value as Device['classification'] })}
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
            onChange={e => onChange({ ...formData, location: e.target.value as Device['location'] })}
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
            onChange={e => onChange({ ...formData, purpose: e.target.value as Device['purpose'] })}
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
            onChange={e => onChange({
              ...formData,
              category: e.target.value as Device['category']
            })}
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
        <div>
          <label className="block text-sm text-yellow-500 mb-1">
            貸出日{formData.classification.includes('貸出') && '（貸出の場合必要）'}
          </label>
          <input
            type="date"
            value={formData.loanDate}
            onChange={e => onChange({ ...formData, loanDate: e.target.value })}
            required={formData.classification.includes('貸出')}
            className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm text-yellow-500 mb-1">貸出証</label>
          <input
            type="text"
            value={formData.loanSlip}
            onChange={e => onChange({ ...formData, loanSlip: e.target.value })}
            className="w-full border border-yellow-500 bg-white rounded-lg px-4 py-2 text-sm disabled:bg-yellow-100 disabled:text-yellow-500"
          />
        </div>
      </div>


      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">基本情報</h2>
        <div>
          <label className="block text-sm text-gray-500 mb-1">番号（必須）</label>
          <input
            type="text"
            value={formData.id}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm disabled:bg-gray-50"
            onChange={e => onChange({ ...formData, id: e.target.value })}
            disabled={mode === 'edit'}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">PC名</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => onChange({ ...formData, name: e.target.value })}
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
            onChange={e => onChange({ ...formData, previousUser: e.target.value })}
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
            onChange={e => onChange({ ...formData, condition: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">備考</label>
          <input
            type="text"
            value={formData.notes}
            onChange={e => onChange({ ...formData, notes: e.target.value })}
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
            onChange={e => onChange({ ...formData, manufacturer: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">モデル名</label>
          <input
            type="text"
            value={formData.modelName}
            onChange={e => onChange({ ...formData, modelName: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">CPU</label>
          <input
            type="text"
            value={formData.cpu}
            onChange={e => onChange({ ...formData, cpu: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">RAM</label>
          <select
            value={formData.ram}
            onChange={e => onChange({ ...formData, ram: e.target.value as Device['ram'] })}
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
            onChange={e => onChange({ ...formData, purchaseDate: e.target.value })}
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
            onChange={e => onChange({ ...formData, osName: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">OS License</label>
          <input
            type="text"
            value={formData.osLicense}
            onChange={e => onChange({ ...formData, osLicense: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">バックアップイメージ作成日</label>
          <input
            type="date"
            value={formData.backup}
            onChange={e => onChange({ ...formData, backup: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">ログインアカウント/パスワード/PIN</label>
          <input
            type="text"
            value={formData.loginAccount}
            onChange={e => onChange({ ...formData, loginAccount: e.target.value })}
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
            onChange={e => onChange({ ...formData, office: e.target.value })}
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
            onChange={e => onChange({ ...formData, ip: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm" />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium"
      >
        {submitLabel}
      </button>
    </form>
  )
}