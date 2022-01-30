import { useState, useEffect } from 'react';
import Head from 'next/head';
import isBefore from 'date-fns/isBefore';
import HoursCard from '../components/HoursCard';
import Modal from '../components/Modal';
import { getAppointments } from '../utils/utils';
import { supabase } from '../utils/supabase';
import Dates from '../utils/dates';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [isOpeningDay, setIsOpeningDay] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState();
  const [renderHours, setRenderHours] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [appointment, setAppointment] = useState({
    date: '',
    name: '',
    phone: '',
  });
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  // Handle open modal

  const handleOpenModal = (date, isBooked) => {
    if (isBooked) return;

    setAppointment((prevState) => ({
      ...prevState,
      date,
    }));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setAppointment({});
    setCode('');
    setOpenModal(false);
    setRefetch(false);
  };

  // Make an appointment

  const handleMakeAppointment = async () => {
    setIsLoading(true);
    if (appointment.name !== '' && appointment.phone !== '') {
      const { data, error } = await supabase
        .from('citas')
        .insert([
          { ...appointment, code: Math.random().toString(36).substring(2, 8) },
        ]);

      if (data && !error) {
        setIsLoading(false);
        setCode(data[0].code);
        setRefetch(true);
      }

      // TODO: Handle error
    }
  };

  // Get all appointments

  useEffect(() => {
    async function getAppointments() {
      const { data, error } = await supabase.from('citas').select();
      !error ? setAppointments(data) : setError(error);
    }

    getAppointments();
  }, [refetch]);

  // Filter appointments for selected date

  useEffect(() => {
    if (appointments.length > 0) {
      const todays = appointments.filter(
        (ap) =>
          new Date(date).toLocaleDateString() ===
          new Date(ap.date).toLocaleDateString()
      );

      setRenderHours(getAppointments(date, todays));
    }
  }, [date, appointments]);

  // Check if is selected date is opening day

  useEffect(() => {
    Dates.openingDays.includes(date.getDay())
      ? setIsOpeningDay(true)
      : setIsOpeningDay(false);
  }, [date]);

  return (
    <>
      <Head>
        <title>Barbershop</title>
      </Head>
      <div className='w-full pb-3'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold mb-4 text-center'>
            Seleccione un día para su cita
          </h1>
          <input
            defaultValue={date.toISOString().substring(0, 10)}
            className='p-2 border-none w-56 outline-none bg-gray-100 rounded-lg'
            type='date'
            onChange={(e) => {
              if (e.target.value !== '') {
                setDate(new Date(e.target.value));
              }
            }}
          />

          {isOpeningDay && !isBefore(new Date(date), new Date()) ? (
            <div className='mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 pb-6'>
              {renderHours.map((d, i) => {
                return (
                  <HoursCard
                    key={i}
                    date={new Date(d.date)}
                    isBooked={d.isBooked}
                    handleOpenModal={handleOpenModal}
                  />
                );
              })}
            </div>
          ) : (
            <div className='mt-4'>
              <h2 className='text-xl'>No hay citas para hoy.</h2>
            </div>
          )}

          {openModal && (
            <Modal
              setAppointment={setAppointment}
              handleMakeAppointment={handleMakeAppointment}
              isLoading={isLoading}
              code={code}
              handleCloseModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
}
