import { add } from 'date-fns';

function AppointmentCard({
  appointment,
  handleCancelAppointment,
  isAdminView,
}) {
  const date = add(new Date(appointment.date), { hours: 1 });

  return (
    <div className={`${isAdminView ? 'w-full md:w-1/3' : 'w-1/2'} mt-6`}>
      <div className='flex flex-col items-center bg-gray-200 rounded-lg p-6'>
        <h3 className='text-2xl py-1'>{appointment.name}</h3>
        <h3 className='text-2xl py-1'>{appointment.phone}</h3>
        <h3 className='text-2xl py-1'>{new Date(date).toLocaleString()}</h3>

        {!isAdminView && (
          <button
            onClick={() => handleCancelAppointment()}
            className='mt-3 bg-red-400 p-2 rounded-lg text-white'
          >
            Cancelar cita
          </button>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;
