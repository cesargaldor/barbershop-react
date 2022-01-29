import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, user, logoutUser } = useContext(AuthContext);

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      loginUser(email, password);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center'>
        {!user && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Bienvenido de nuevo</h1>
            <input
              type='text'
              onChange={(e) => setEmail(e.target.value)}
              className='p-2 border-none outline-none bg-gray-100 rounded-lg mb-1'
              placeholder='Introduza el email'
            />
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              className='p-2 border-none outline-none bg-gray-100 rounded-lg mt-1'
              placeholder='Introduza la contraseña'
            />

            <button
              onClick={() => handleLogin()}
              className='p-2 bg-blue-400 text-white rounded-lg mt-3'
            >
              Iniciar sesión
            </button>
          </>
        )}

        {user && (
          <div>
            <button
              onClick={() => logoutUser()}
              className='p-2 bg-red-400 text-white rounded-lg mt-3'
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
