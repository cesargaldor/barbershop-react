import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
