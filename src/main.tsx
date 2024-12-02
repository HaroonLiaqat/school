import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/ui/Navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='bg-dark lg:bg-light min-h-screen'>
      <Navbar />
      <App />
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
        transition={Bounce}
      />
    </div>
  </StrictMode>
);
