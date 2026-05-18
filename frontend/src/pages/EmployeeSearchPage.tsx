
import { useState, useEffect } from 'react';
import { getEmployeesService } from '../services/employeeService';
import { EmployeeInfoCard } from '../components/EmployeeInfoCard';
import type { Employee } from '../types/user.types';
import { StatusScreen } from '../components/StatusScreen';

export function EmployeeSearchPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getEmployeesService()
      .then(setEmployees)
      .catch(() => setError('社員情報の取得に失敗しました'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = employees.filter(emp =>
    emp.displayName.toLowerCase().includes(query.toLowerCase())
  );

  if (loading || error) return <StatusScreen loading={loading} error={error} />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-6">
      <h1 className="text-xl font-bold mb-6">社員検索</h1>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="名前または番号で検索"
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm mb-6 bg-white"
      />

      <div className="space-y-4">
        {filtered.map(emp => (
          <EmployeeInfoCard key={emp.number} employee={emp} />
        ))}
        {!loading && !error && employees.length === 0 && (
          <p className="text-sm text-gray-400">社員情報が登録されていません</p>
        )}
        {!loading && !error && employees.length > 0 && filtered.length === 0 && (
          <p className="text-sm text-gray-400">該当する社員が見つかりません</p>
        )}
      </div>
    </div>
  );
}
