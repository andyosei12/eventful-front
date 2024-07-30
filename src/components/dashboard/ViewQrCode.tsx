import { toast } from 'react-toastify';
import { isTicketModalOpen, ticketQRCode } from '../../store';
import { useStore } from '@nanostores/react';
type ViewQrCodeProps = {
  token: string;
  ticketId: string;
};

const ViewQrCode = ({ token, ticketId }: ViewQrCodeProps) => {
  const $isTicketModalOpen = useStore(isTicketModalOpen);
  const generateQrCodeHandler = async () => {
    // generate qr code
    try {
      const qrCodeJson = await fetch(
        `${import.meta.env.PUBLIC_API_URL}/qr-code/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ticket = await qrCodeJson.json();
      console.log(ticket);
      if (ticket.qr_code) {
        isTicketModalOpen.set(!$isTicketModalOpen);
        ticketQRCode.set(ticket.qr_code);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };
  return (
    <button
      onClick={generateQrCodeHandler}
      className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 flex items-center justify-center px-4 py-3 w-32 h-9 bg-indigo-50 hover:bg-indigo-100 rounded focus:outline-none"
    >
      <p className="text-sm leading-none text-indigo-700">View QR Code</p>
    </button>
  );
};

export default ViewQrCode;
