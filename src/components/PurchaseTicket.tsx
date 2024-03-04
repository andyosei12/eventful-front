import { useStore } from '@nanostores/react';
import { isTicketModalOpen } from '../modalStore';
import { ticketQRCode } from '../modalStore';

type PurchaseTicketProps = {
  id?: string;
  price: number;
  token?: string;
};

const PurchaseTicket = ({ id, price, token }: PurchaseTicketProps) => {
  const $isTicketModalOpen = useStore(isTicketModalOpen);
  const onPurchaseHandler = async () => {
    if (!token) {
      window.location.href = '/login';
    } else {
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
              daysBefore: 1,
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
      }
    }
  };
  return (
    <div className="fixed bottom-0 z-40 bg-[#EFFEF5] p-6 flex sm:flex-row flex-col sm:justify-between sm:items-center w-full">
      <p className="text-2xl text-center mb-3 font-semibold ">GHC {price}</p>
      <button
        onClick={onPurchaseHandler}
        className="text-lg font-bold bg-[#108544] leading-6 text-white rounded-md p-4 shadow-sm"
      >
        Purchase Ticket
      </button>
    </div>
  );
};

export default PurchaseTicket;
