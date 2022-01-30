import { useState } from 'react';
import { useRouter } from 'next/router';
import AppointmentCard from '../components/AppointmentCard';
import { supabase } from '../utils/supabase';
import Head from 'next/head';

export default function Appointment() {
  const [code, setCode] = useState('');
  const [appointment, setAppointment] = useState();
  const [error, setError] = useState();
  const router = useRouter();

  const handleEnterCode = async () => {
    const { data, error } = await supabase
      .from('citas')
      .select()
      .eq('code', code);

    if (!error && data.length > 0) {
      setAppointment(data[0]);
    }

    if (data.length === 0) {
      setError('Ese código no es válido');
    }

    if (error) {
      setError(error);
    }
  };

  const handleCancelAppointment = async () => {
    await supabase.from('citas').delete().eq('code', code);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Barbershop</title>
      </Head>
      <div className='w-full'>
        <div className='flex flex-col items-center '>
          <h1 className='text-2xl font-bold mb-4 text-center'>
            Puede comprobar sus citas y cancelarlas
          </h1>
          <input
            onKeyUp={(e) => (e.key === 'Enter' ? handleEnterCode() : '')}
            onChange={(e) => setCode(e.target.value)}
            type='text'
            className='p-2 border-none w-56 outline-none bg-gray-100 rounded-lg'
            placeholder='Introduza el código'
          />

          {appointment && (
            <AppointmentCard
              appointment={appointment}
              handleCancelAppointment={handleCancelAppointment}
            />
          )}
          {error && !appointment && (
            <h1 className='text-red-500 text-2xl md:text-3xl mt-6'>{error}</h1>
          )}
        </div>
      </div>
    </>
  );
}
