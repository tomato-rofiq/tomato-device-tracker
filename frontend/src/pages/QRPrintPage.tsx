
import { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";

export function QRPrintPage() {
  const { id } = useParams<{ id: string }>();
  const hasPrinted = useRef(false);

  useEffect(() => {
    if (!hasPrinted.current) {
      hasPrinted.current = true;
      window.print();
    }
  }, []);

  return (
    <div className="m-10 flex justify-center bg-white">
      <div className="px-10 pb-10 pt-6 border-2 border-gray-300 rounded-lg">
        <p className="mb-3">PC番号: {id}</p>
        <QRCodeSVG value={`${window.location.origin}/device/${id}`} size={150} />
      </div>
    </div>
  );
}