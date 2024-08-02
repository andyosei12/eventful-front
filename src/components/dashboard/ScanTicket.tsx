import { CookiesProvider } from 'react-cookie';
import QRScanner from '../QRSanner';

const ScanTicket = () => {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <QRScanner />
    </CookiesProvider>
  );
};

export default ScanTicket;
