import { useState, useEffect } from 'react';
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

  useEffect(async () => {
    const { data, error } = await supabase.from('citas').select();
    !error ? setAppointments(data) : setError(error);
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
    <div className='w-full pb-3'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold mb-4'>
          Seleccione un día para su cita
        </h1>
        <input
          defaultValue={date.toISOString().substring(0, 10)}
          className='p-1 border-none w-44 outline-none bg-gray-100 rounded-lg'
          type='date'
          onChange={(e) => {
            if (e.target.value !== '') {
              setDate(new Date(e.target.value));
            }
          }}
        />

        {isOpeningDay ? (
          <div className='mt-12 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8'>
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
            <h2 className='text-xl'>Estamos cerrados.</h2>
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
  );
}
