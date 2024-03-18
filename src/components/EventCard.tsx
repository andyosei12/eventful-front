import { useState } from "react";
import { useStore } from "@nanostores/react";
import { isTicketModalOpen } from "../modalStore";
import { ticketQRCode } from "../modalStore";
import { formatTime } from "../utils";

type EventCardProps = {
  id: string;
  name: string;
  price: number;
  date: Date;
  location: string;
  time: string;
  token?: string;
};

const EventCard = ({
  id,
  name,
  price,
  date,
  location,
  time,
  token,
}: EventCardProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const $isTicketModalOpen = useStore(isTicketModalOpen);
  const $ticketQRCode = useStore(ticketQRCode);
  const eventDate = new Date(date);

  const eventTime = formatTime(time);

  const onPurchaseHandler = async () => {
    if (!token) {
      window.location.href = "/login";
    } else {
      setIsBooking(true);
      try {
        const ticketJson = await fetch(
          `${import.meta.env.PUBLIC_API_URL}/tickets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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
    <div className="w-full h-full flex items-center justify-center py-8 md:px-0 px-4 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 pb-6 shadow-xl max-w-sm">
        <a href={`/events/${id}`}>
          <img
            className="w-full"
            src="/placeholder-image.png"
            alt="costume-party"
          />
          <div className="mt-4 pl-4">
            <p className="w-2/4 text-base font-bold leading-normal text-gray-800 dark:text-gray-100">
              {name}
            </p>
          </div>
          <div className="mt-4 flex items-center pl-4 text-gray-600 dark:text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <rect
                x="3.33337"
                y="4.16699"
                width="13.3333"
                height="13.3333"
                rx={2}
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3333 2.5V5.83333"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66667 2.5V5.83333"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33337 9.16667H16.6667"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.16663 12.4997H9.99996"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 12.5V15"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm leading-none text-gray-700 dark:text-gray-100 ml-2">
              {eventDate.toDateString()}
            </p>
            <span>, {eventTime}</span>
          </div>
          <div className="mt-4 pl-4 flex items-center text-gray-600 dark:text-gray-100">
            <svg
              fill="#ccc"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 395.71 395.71"
              width={20}
              height={20}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>{" "}
                </g>{" "}
              </g>
            </svg>
            <p className="text-sm leading-none text-gray-700 dark:text-gray-100 ml-2">
              {location}
            </p>
          </div>
          <div className="mt-3 pl-4 flex w-full items-center justify-between">
            <div className="flex items-center relative">
              <p className="text-xs leading-3 text-primary-color mr-2">
                Available
              </p>
            </div>
            <div className="py-2 px-5 flex justify-center items-center bg-gray-800">
              <p className="text-sm font-bold leading-none text-white dark:text-gray-100">
                GHC {price}
              </p>
            </div>
          </div>
        </a>
        <div className="mt-5 pl-4">
          <div className="flex items-center mt-4">
            <button
              onClick={onPurchaseHandler}
              id="booking"
              className="py-2 px-3 bg-gradient-to-br from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-sm flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
              >
                <circle
                  cx="4.5"
                  cy="3.5"
                  r={2}
                  stroke="white"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.5 10.5V9.5C1.5 8.39543 2.39543 7.5 3.5 7.5H5.5C6.60457 7.5 7.5 8.39543 7.5 9.5V10.5"
                  stroke="white"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 5.125C7.79289 5.125 7.625 5.29289 7.625 5.5C7.625 5.70711 7.79289 5.875 8 5.875V5.125ZM11 5.875C11.2071 5.875 11.375 5.70711 11.375 5.5C11.375 5.29289 11.2071 5.125 11 5.125V5.875ZM9.875 4C9.875 3.79289 9.70711 3.625 9.5 3.625C9.29289 3.625 9.125 3.79289 9.125 4H9.875ZM9.125 7C9.125 7.20711 9.29289 7.375 9.5 7.375C9.70711 7.375 9.875 7.20711 9.875 7H9.125ZM8 5.875H11V5.125H8V5.875ZM9.125 4V7H9.875V4H9.125Z"
                  fill="white"
                />
              </svg>
              <p className="text-xs leading-3 text-white dark:text-gray-100 ml-1">
                {isBooking ? "Processing..." : "Book a Seat"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
