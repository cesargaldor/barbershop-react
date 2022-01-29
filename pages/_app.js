import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className='px-5'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
