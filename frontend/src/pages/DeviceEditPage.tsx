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
import { DeviceForm } from "../components/DeviceForm";

export function DeviceEditPage() {
  const { id } = useParams<{ id: string }>();
  const { device, loading, error, fetchDevice, updateDevice } = useDevice();
  const [formData, setFormData] = useState<Device | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch device data when component mounts or id changes
  useEffect(() => {
    if (id) fetchDevice(id);
  }, [id]);

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

  function handleFormChange(newFormData: Device) {
    setFormData(newFormData);
    if (lastSavedAt) setLastSavedAt(null);
  }

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
          setLastSavedAt(new Date().toLocaleString('ja-JP'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (err) {
        console.error("Error updating device:", err);
      }
    }
  };

  if (!device && (loading || employeesLoading)) return <StatusScreen loading={loading} error={null} />;
  if (!formData) return null;

  return (
    <div className="min-h-screen pt-20 ">
      <h1 className="text-xl font-bold ms-6">デバイス詳細編集</h1>

      {lastSavedAt && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-2 rounded-lg mx-6 mt-4">
          更新しました — {lastSavedAt}
        </div>
      )}

      <DeviceForm
        formData={formData}
        onChange={handleFormChange}
        employees={employees}
        mode="edit"
        onSubmit={handleSubmit}
        submitLabel={loading ? '更新中...' : '更新'}
        loading={loading}
      />
      {error && <p className="text-red-500 text-sm px-6">{error}</p>}

    </div>
  );
};