import { useStore } from '@nanostores/react';
import { useState, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { isTicketModalOpen, isDeleteModalOpen } from '../store';
import TicketModal from './modals/TicketModal';
import DeleteModal from './modals/DeleteModal';

type User =
  | {
      id: string;
      phoneNumber: string;
      firstName: string;
      role: string;
    }
  | undefined;

const DashboardLayout = ({
  children,
  userInfo,
}: {
  children: ReactNode;
  userInfo: User;
}) => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [{ user, token }, _, removeCookie] = useCookies();

  const $isTicketModalOpen = useStore(isTicketModalOpen);
  const $isDeleteModalOpen = useStore(isDeleteModalOpen);

  const logoutHandler = () => {
    window.location.href = '/';
    removeCookie('token', { path: '/' });
    removeCookie('user', { path: '/' });
  };

  return (
    <>
      {$isTicketModalOpen && <TicketModal />}
      {$isDeleteModalOpen && <DeleteModal token={token} />}
      <div className="w-full h-full">
        <div className="flex flex-no-wrap">
          {/* Sidebar starts */}
          <div className="w-64 absolute lg:relative bg-slate-800  shadow min-h-screen flex-col justify-between hidden lg:flex pb-12">
            <div className="px-8 ">
              <div className="h-16 w-full flex items-center text-white ">
                <a href="/">Efiada</a>
              </div>
              <ul className="mt-12 text-white">
                <li className="flex w-full justify-between  cursor-pointer items-center mb-6">
                  <div className="flex items-center">
                    <a href="/dashboard" className="text-sm">
                      Dashboard
                    </a>
                  </div>
                  {/* <div className="py-1 px-3 bg-indigo-700 rounded text-white flex items-center justify-center text-xs">
                    5
                  </div> */}
                </li>

                {userInfo?.role === 'creator' && (
                  <li className="flex w-full justify-between  hover:text-indigo-700 cursor-pointer items-center mb-6">
                    <div className="flex items-center">
                      <a href="/dashboard/events" className="text-sm">
                        Events
                      </a>
                    </div>
                  </li>
                )}

                <li className="flex w-full justify-between  hover:text-indigo-700 cursor-pointer items-center mb-6">
                  <div className="flex items-center">
                    <a href="/dashboard/tickets" className="text-sm">
                      Tickets
                    </a>
                  </div>
                </li>

                {(userInfo?.role === 'creator' ||
                  userInfo?.role === 'teller') && (
                  <li className="flex w-full justify-between  hover:text-indigo-700 cursor-pointer items-center mb-6">
                    <div className="flex items-center">
                      <a href="/dashboard/events/completed" className="text-sm">
                        Events Attended
                      </a>
                    </div>
                  </li>
                )}
                {(userInfo?.role === 'creator' ||
                  userInfo?.role === 'teller') && (
                  <li className="flex w-full justify-between  hover:text-indigo-700 cursor-pointer items-center mb-6">
                    <div className="flex items-center">
                      <a href="/dashboard/tickets/scan" className="text-sm">
                        Ticket Scanner
                      </a>
                    </div>
                  </li>
                )}

                {userInfo?.role === 'creator' && (
                  <li className="flex w-full justify-between  hover:text-indigo-700 cursor-pointer items-center mb-6">
                    <div className="flex items-center">
                      <a href="/dashboard/tellers" className="text-sm">
                        Tellers
                      </a>
                    </div>
                  </li>
                )}

                <li className="flex w-full justify-between  hover:text-indigo-700 cursor-pointer items-center mb-6">
                  <div className="flex items-center">
                    <a href="/dashboard/reset-password" className="text-sm">
                      Reset Password
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? 'w-full h-full absolute z-50  transform  translate-x-0 '
                : '   w-full h-full absolute z-50  transform -translate-x-full'
            }
          >
            <div
              className="bg-gray-800 opacity-50 w-full h-full absolute"
              onClick={() => setShow(!show)}
            ></div>
            <div className="w-64 md:w-96 absolute z-40 bg-white shadow h-full flex-col justify-between lg:hidden pb-4 transition duration-150 ease-in-out">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between px-8">
                    <div className="h-16 w-full flex items-center">
                      <a href="/">Efiada</a>
                    </div>
                    <div
                      id="closeSideBar"
                      className="flex items-center justify-center h-10 w-10"
                      onClick={() => setShow(!show)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                  <div className="px-8">
                    <ul className="mt-12">
                      <li className="flex w-full justify-between text-indigo-700 cursor-pointer items-center mb-6">
                        <div className="flex items-center">
                          <a
                            href="/dashboard"
                            className="xl:text-base md:text-2xl text-base ml-2"
                          >
                            Dashboard
                          </a>
                        </div>
                      </li>
                      {userInfo?.role === 'creator' && (
                        <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                          <div className="flex items-center">
                            <a
                              href="/dashboard/events"
                              className="xl:text-base md:text-2xl text-base ml-2"
                            >
                              Events
                            </a>
                          </div>
                        </li>
                      )}

                      <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                        <div className="flex items-center">
                          <a
                            href="/dashboard/tickets"
                            className="xl:text-base md:text-2xl text-base ml-2"
                          >
                            Tickets
                          </a>
                        </div>
                      </li>

                      {(userInfo?.role === 'creator' ||
                        userInfo?.role === 'teller') && (
                        <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                          <div className="flex items-center">
                            <a
                              href="/dashboard/events/completed"
                              className="xl:text-base md:text-2xl text-base ml-2"
                            >
                              Events Attended
                            </a>
                          </div>
                        </li>
                      )}
                      {(userInfo?.role === 'creator' ||
                        userInfo?.role === 'teller') && (
                        <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                          <div className="flex items-center">
                            <a
                              href="/dashboard/tickets/scan"
                              className="xl:text-base md:text-2xl text-base ml-2"
                            >
                              Ticket Scanner
                            </a>
                          </div>
                        </li>
                      )}

                      {userInfo?.role === 'creator' && (
                        <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                          <div className="flex items-center">
                            <a
                              href="/dashboard/tellers"
                              className="xl:text-base md:text-2xl text-base ml-2"
                            >
                              Tellers
                            </a>
                          </div>
                        </li>
                      )}

                      <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                        <div className="flex items-center">
                          <a
                            href="/dashboard/reset-password"
                            className="xl:text-base md:text-2xl text-base ml-2"
                          >
                            Reset Password
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center mb-4 w-full px-6">
                    <div className="relative w-full">
                      {/* <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-search"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="#A0AEC0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </div> */}
                      {/* <input
                        className=" focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2"
                        type="text"
                        placeholder="Search"
                      /> */}
                    </div>
                  </div>
                  <div className="border-t border-gray-300">
                    <div className="w-full flex items-center justify-between px-6 pt-1">
                      <div className="flex items-center">
                        {/* <img
                          alt="profile-pic"
                          src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                          className="w-8 h-8 rounded-md"
                        /> */}
                        <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">
                          {user?.firstName}
                        </p>
                      </div>
                      <ul className="flex">
                        <li className="cursor-pointer text-white pt-5 pb-3">
                          <button onClick={logoutHandler}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-logout"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#718096"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                              <path d="M7 12h14l-3 -3m0 6l3 -3" />
                            </svg>
                          </button>
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-bell"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="#718096"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className="w-full">
            {/* Navigation starts */}
            <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-0">
              <div className="hidden lg:flex w-full pr-6">
                <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24">
                  <div className="relative w-full"></div>
                </div>
                <div className="w-1/2 hidden lg:flex">
                  <div className="w-full flex items-center pl-8 justify-end">
                    <div className="h-full w-20 flex items-center justify-center border-r border-l">
                      <div className="relative cursor-pointer text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-bell"
                          width={28}
                          height={28}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        </svg>
                        <div className="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto" />
                      </div>
                    </div>
                    <div
                      className="flex items-center relative cursor-pointer"
                      onClick={() => setProfile(!profile)}
                    >
                      <div className="rounded-full">
                        {profile ? (
                          <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                            <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-user"
                                  width={18}
                                  height={18}
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <circle cx={12} cy={7} r={4} />
                                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                </svg>
                                <span className="text-sm ml-2">My Profile</span>
                              </div>
                            </li>
                            <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
                              <div
                                className="flex items-center"
                                onClick={logoutHandler}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-logout"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                                </svg>
                                <span className="text-sm ml-2">Sign out</span>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          ''
                        )}
                        <div className="relative"></div>
                      </div>
                      <p className="text-gray-800 text-sm mx-3">
                        {user?.firstName}
                      </p>
                      <div className="cursor-pointer text-gray-600">
                        <svg
                          aria-haspopup="true"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="text-gray-600 mr-8 visible lg:hidden relative"
                onClick={() => setShow(!show)}
                id="menu"
              >
                {show ? (
                  ''
                ) : (
                  <svg
                    aria-label="Main Menu"
                    aria-haspopup="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu cursor-pointer"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={8} x2={20} y2={8} />
                    <line x1={4} y1={16} x2={20} y2={16} />
                  </svg>
                )}
              </div>
            </nav>
            {/* Navigation ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="container mx-auto py-10 h-64 w-11/12">
              {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
              <div className="w-full h-full rounded">
                {/* Place your content here */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
