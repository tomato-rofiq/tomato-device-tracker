// this file defines a QRScanner component that uses the html5-qrcode library 
// to scan QR codes and return the decoded text to a parent component via a callback function. 
// It also handles starting and stopping the scanner when the component mounts and unmounts.

import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

// The props for the QRScanner component, which includes a callback function to handle the scanned result
interface Props {
  onScan: (result: string) => void;
}

export function QRScanner({ onScan }: Props) {
  // A ref to hold the instance of the Html5Qrcode scanner
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    // prevent a second scanner instance from being created
    if (scannerRef.current) return;

    const scanner = new Html5Qrcode('qr-reader');
    scannerRef.current = scanner;

    // start() is async, so store the promise to safely chain stop() later
    const startPromise = scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        onScan(decodedText);
      },
      undefined
    );

    return () => {
      // wait for start() to resolve before stopping to avoid "scanner not running" error
      startPromise
        .then(() => scanner.stop())
        .catch(() => { });
      scannerRef.current = null;
    };
  }, [onScan]);

  // Render a div that will be used by the Html5Qrcode library 
  // to display the camera feed and scan for QR codes
  return (
    <div
      id="qr-reader"
      style={{ width: '300px', overflow: 'hidden' }}
    />
  );

}
