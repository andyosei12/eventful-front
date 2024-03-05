import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCookies } from 'react-cookie';
import { isTicketModalOpen } from '../modalStore';
import TicketModal from './TicketModal';

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Explore events', href: '/events' },
];

const HomeNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookie, _, removeCookie] = useCookies();
  const $isTicketModalOpen = useStore(isTicketModalOpen);

  const token = cookie?.token;
  const user = cookie?.user;

  const logoutHandler = () => {
    removeCookie('token');

    removeCookie('user');
  };

  return (
    <>
      {$isTicketModalOpen && <TicketModal />}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1 className="bg-gradient-to-r from-blue-600 to-green-500 inline-block text-transparent bg-clip-text text-2xl font-bold">
                Eventful
              </h1>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:items-center lg:flex-1 lg:justify-end gap-x-5 ">
            {token && (
              <button
                onClick={logoutHandler}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
            )}

            {!token && (
              <a
                href="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}

            {(user?.role === 'creator' || !token) && (
              <a
                href="/dashboard/events/create"
                className="text-sm font-bold bg-primary-color leading-6 text-white rounded-md p-3 shadow-sm"
              >
                Create Event
              </a>
            )}
            {user?.role === 'regular' && (
              <a
                href="/dashboard"
                className="text-sm font-bold bg-primary-color leading-6 text-white rounded-md p-3 shadow-sm"
              >
                Dashboard
              </a>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Eventful</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {token && (
                    <button
                      onClick={logoutHandler}
                      className="text-sm font-semibold leading-6 text-gray-900 block mb-5"
                    >
                      Log out <span aria-hidden="true">&rarr;</span>
                    </button>
                  )}

                  {!token && (
                    <a
                      href="/login"
                      className="text-sm font-semibold leading-6 text-gray-900 block mb-5"
                    >
                      Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                  {(user?.role === 'creator' || !token) && (
                    <a
                      href="/dashboard/events/create"
                      className="text-sm font-bold bg-primary-color leading-6 text-white rounded-md p-3 shadow-sm"
                    >
                      Create Event
                    </a>
                  )}
                  {user?.role === 'regular' && (
                    <a
                      href="/dashboard"
                      className="text-sm font-bold bg-primary-color leading-6 text-white rounded-md p-3 shadow-sm"
                    >
                      Dashboard
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default HomeNav;
