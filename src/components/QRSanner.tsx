import { useEffect, useState } from 'react';
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const QRScanner = () => {
  const [{ token }] = useCookies(['token']);
  const [scanned, setScanned] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<{
    user?: string;
    message?: string;
    event?: string;
  }>({});
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
      scanner.clear();
      setScanned(true);
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
      setTicketInfo(ticket);

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
        <>
          {ticketInfo && (
            <>
              <div>
                <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Ticket Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Personal details and application.
                  </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {ticketInfo.user}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Ticket For
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {ticketInfo.event}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Ticket Message
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {ticketInfo.message}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </>
          )}
          <button
            onClick={refreshHandler}
            className="text-sm font-bold bg-primary-color leading-6 text-white mt-0 rounded-md p-3 shadow-sm"
          >
            Scan ticket
          </button>
        </>
      )}
    </>
  );
};

export default QRScanner;
