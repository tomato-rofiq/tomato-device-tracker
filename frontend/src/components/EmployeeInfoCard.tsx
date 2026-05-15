import type { Employee } from '../types/user.types';
import { useState } from 'react';

interface Props {
  employee: Employee;
}

export function EmployeeInfoCard({ employee }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="mb-6">
        <h2 className="text-xl font-bold">{employee.displayName}</h2>
        <p className="text-sm text-gray-500">番号: {employee.number}</p>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full text-sm text-gray-400 pt-3 text-center"
      >
        {showDetails ? '詳細を隠す ▲' : '詳細を表示 ▼'}
      </button>

      {showDetails && (
        <>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">名前</span>
            <span className="font-medium">{employee.name || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">職位</span>
            <span className="font-medium">{employee.position || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">이름</span>
            <span className="font-medium">{employee.koreanName || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">英語名</span>
            <span className="font-medium">{employee.englishName || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">ふりがな</span>
            <span className="font-medium">{employee.furigana || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">区分</span>
            <span className="font-medium">{employee.status || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">国籍</span>
            <span className="font-medium">{employee.nationality || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">仕事開始日</span>
            <span className="font-medium">{employee.startDate || '—'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-sm">
            <span className="text-gray-500">仕事終了日</span>
            <span className="font-medium">{employee.endDate || '—'}</span>
          </div>
        </>
      )}

    </div>
  );
}
