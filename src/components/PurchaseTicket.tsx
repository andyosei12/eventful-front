import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { isTicketModalOpen } from '../store';
import { ticketQRCode } from '../store';

type PurchaseTicketProps = {
  id?: string;
  price: number;
  token?: string;
};

const PurchaseTicket = ({ id, price, token }: PurchaseTicketProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const $isTicketModalOpen = useStore(isTicketModalOpen);
  const onPurchaseHandler = async () => {
    if (!token) {
      window.location.href = '/login';
    } else {
      setIsBooking(true);
      try {
        const ticketJson = await fetch(
          `${import.meta.env.PUBLIC_API_URL}/tickets`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              event_id: id,
            }),
          }
        );
        const ticket = await ticketJson.json();
        if (ticket.qr_code) {
          isTicketModalOpen.set(!$isTicketModalOpen);
          ticketQRCode.set(ticket.qr_code);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsBooking(false);
      }
    }
  };

  return (
    <div className="sticky bottom-0 bg-[#EFFEF5]; z-40 p-6 flex sm:flex-row flex-col sm:justify-between sm:items-center w-full">
      <p className="text-2xl text-center mb-3 font-semibold ">GHC {price}</p>
      <button
        onClick={onPurchaseHandler}
        className="text-lg font-bold bg-[#108544] leading-6 text-white rounded-md p-4 shadow-sm"
      >
        {isBooking ? 'Processing...' : 'Purchase Ticket'}
      </button>
    </div>
  );
};

export default PurchaseTicket;
