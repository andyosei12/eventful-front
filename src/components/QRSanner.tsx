import { useEffect, useState } from 'react';
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const QRScanner = () => {
  const [{ token }] = useCookies(['token']);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    async function onScanSuccess(qrCodeMessage: string) {
      //   scanner.clear();
      const ticketJson = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/tickets/${qrCodeMessage}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ticket = await ticketJson.json();
      scanner.clear();
      setScanned(true);

      if (ticket.error) {
        toast.error(ticket.message);
      } else {
        toast(ticket.message);
      }
    }

    function onScanFailure(error: any) {}
  }, []);

  const refreshHandler = () => {
    window.location.reload();
  };
  return (
    <>
      {!scanned && <div id="reader"></div>}
      {scanned && (
        <button
          onClick={refreshHandler}
          className="text-sm font-bold bg-primary-color leading-6 text-white rounded-md p-3 shadow-sm"
        >
          Scan ticket
        </button>
      )}
    </>
  );
};

export default QRScanner;
