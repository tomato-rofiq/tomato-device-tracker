// this component is used to generate a loan slip document for a device loaned to an employee. 
// It takes in the device, employee, and loan date as props and formats them into a printable document. 

import type { Employee } from '../types/user.types';
import type { Device } from "../types/device.types";

interface Props {
  device: Device,
  employee: Employee,
  loanDate: string,
  previousDevice?: Device,
}

export function LoanSlipDocument({ device, employee, loanDate, previousDevice }: Props) {
  const [year, month, day] = loanDate.split('-');

  return (
    <div id="loan-slip-print" className="w-[210mm] h-[210mm] bg-white p-8 border border-gray-300 rounded-lg">
      <style>{`
      @media print {
        body * { visibility: hidden; }
        #loan-slip-print, #loan-slip-print * { visibility: visible; }
        #loan-slip-print { position: absolute; top: 0; left: 0; width: 100%; }
      }
      `}</style>
      <h1 className="text-2xl font-bold mb-6 text-center">貸出証</h1>
      <div className="mb-4">
        <p className="text-lg"><span className="font-bold">名前:</span> {employee.displayName ?? 'なし'}</p>
        <p className="text-lg"><span className="font-bold">日付:</span> {year}年 {month}月 {day}日</p>
        <p className="text-lg"><span className="font-bold">品名:</span> TOMATO {device.id ?? 'なし'}</p>
        <p className="text-lg"><span className="font-bold">以前使用した品名:</span> TOMATO {previousDevice?.id ?? 'なし'}</p>
        <p className="text-lg"><span className="font-bold">使用場所:</span> {device.location ?? 'なし'}</p>
      </div>
      <div className="mt-8">
        <p className="text-lg text-gray-500 text-left">上記の品目をプロジェクト開発用として貸出します。プロジェクトが終了したら会社に返納します。</p>
        <p className="text-lg text-gray-500 text-right mt-10">{year}年 {month}月 {day}日</p>
      </div>
    </div>
  );
}
