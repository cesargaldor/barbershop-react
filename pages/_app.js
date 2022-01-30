import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { AppointmentProvider } from '../context/AppointmentContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default MyApp;
