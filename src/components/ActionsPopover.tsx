import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ActionsPopover({ deviceId }: { deviceId: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative flex justify-center">
      <button
        className="px-2 py-1 hover:text-gray-700 border border-gray-200 bg-gray-100 rounded"
        onClick={() => setOpen(o => !o)}
      >
        ⋯
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-md text-sm min-w-max">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg" onClick={() => { setOpen(false); navigate(`/device/${deviceId}/qr`); }}>QR印刷</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50" onClick={() => { setOpen(false); navigate(`/device/${deviceId}/edit`); }}>編集</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg" onClick={() => { setOpen(false); navigate(`/device/${deviceId}/history`); }}>更新履歴</button>
        </div>
      )}
    </div>
  );
}
