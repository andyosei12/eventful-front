import { atom } from 'nanostores';

export const isTicketModalOpen = atom(false);
export const isDeleteModalOpen = atom(false);
export const ticketQRCode = atom('');
export const event = atom({ _id: '', title: '', price: 0 });
export const deleteUrl = atom('');
