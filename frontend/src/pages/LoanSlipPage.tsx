// this page is for generating a loan slip for a device, 
// which can be printed and given to the employee who is borrowing the device. 
// It will also update the device's loan date in the database.

import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../hooks/useDevice";
import { useEffect } from "react";
import { LoanSlipDocument } from "../components/LoanSlipDocument";
import { StatusScreen } from "../components/StatusScreen";

export function LoanSlipPage() {
  const navigate = useNavigate();
  const { allDevices, loading, error, updateDevice, fetchAllDevices } = useDevice();
  const { formData, employee } = useLocation().state || {};
  const loanDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchAllDevices();
  }, []);

  const previousDevice = allDevices
    .filter(d => d.currentUser === employee?.displayName && d.id !== formData?.id)
    .sort((a, b) => new Date(b.loanDate).getTime() - new Date(a.loanDate).getTime())[0];

  // If formData or employee is not available in the location state, 
  // redirect to the devices page
  if (!formData || !employee) return <Navigate to="/devices" replace />;

  async function handleSave() {
    await updateDevice({ ...formData, loanDate });
    navigate('/device/' + formData.id);
  }

  if (loading || error) return <StatusScreen loading={loading} error={error} />;

  return (
    <div className="min-h-screen pt-20 px-6 pb-6">
      <div className="flex gap-2 my-2">
        <button
          className="bg-blue-500 text-white w-full rounded-lg p-2 text-sm font-medium"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? '更新中...' : '更新'}
        </button>
        <button
          className="bg-gray-200 w-full rounded-lg p-2 text-sm font-medium"
          onClick={window.print}>
          印刷
        </button>
        <button
          className="bg-gray-200 w-full rounded-lg p-2 text-sm font-medium"
          onClick={() => navigate(`/device/${formData.id}/edit`)}>
          PC一覧へ
        </button>
      </div>
      <LoanSlipDocument device={formData} employee={employee} loanDate={loanDate} previousDevice={previousDevice} />
    </div>
  );

}