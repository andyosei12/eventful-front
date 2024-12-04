import { useState } from "react";
import { useStore } from "@nanostores/react";
import { isTicketModalOpen } from "../store";
import { ticketQRCode } from "../store";

type PurchaseTicketProps = {
  id?: string;
  price: number;
  token?: string;
};

const PurchaseTicket = ({ id, price, token }: PurchaseTicketProps) => {
  const [isBooking, setIsBooking] = useState(false);
  // const $isTicketModalOpen = useStore(isTicketModalOpen);
  const onPurchaseHandler = async () => {
    if (!token) {
      window.location.href = `/login?event=${id}`;
    } else {
      console.log('paystack is a mess')
      // setIsBooking(true);
      // try {
      //   const paymentInitiationJson = await fetch(
      //     `${import.meta.env.PUBLIC_API_URL}/payment/initiate-transaction`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify({
      //         eventId: id,
      //       }),
      //     }
      //   );
      //   const paymentInitiationData = await paymentInitiationJson.json();
      //   console.log(paymentInitiationData);
      //   if (paymentInitiationData.data.authorization_url) {
      //     const paystackAuthorizationUrl =
      //       paymentInitiationData.data.authorization_url;
      //     window.location.href = paystackAuthorizationUrl;
      //   }
      // } catch (error) {
      //   console.log(error);
      // } finally {
      //   setIsBooking(false);
      // }
    }
  };

  return (
    <div className="sticky bottom-0 bg-[#EFFEF5]; z-40 p-6 flex sm:flex-row flex-col sm:justify-between sm:items-center w-full">
      {/* <p className="text-2xl text-center mb-3 font-semibold ">GHC {price}</p> */}
      <button
        onClick={onPurchaseHandler}
        className="text-lg font-bold bg-[#108544] leading-6 text-white rounded-md p-4 shadow-sm"
      >
        {isBooking ? "Processing..." : `Purchase Ticket - GHC ${price}`}
      </button>
    </div>
  );
};

export default PurchaseTicket;
