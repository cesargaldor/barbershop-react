function Modal({
  setAppointment,
  handleMakeAppointment,
  isLoading,
  code,
  handleCloseModal,
}) {
  return (
    <div className='fixed inset-0 w-full h-screen z-20 bg-black bg-opacity-70 duration-300 overflow-y-auto flex justify-center items-center'>
      <div className=' relative sm:w-3/4 md:w-1/2 lg:w-1/3 mx-2 sm:mx-auto my-10 opacity-100'>
        <div className='relative bg-white shadow-lg rounded-md text-gray-900 z-20 px-4 pt-2 pb-6'>
          <header className='flex items-center justify-end'>
            <button
              className='focus:outline-none p-2'
              onClick={() => handleCloseModal()}
            >
              <svg
                className='fill-current'
                width='20'
                height='20'
                viewBox='0 0 18 18'
              >
                <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
              </svg>
            </button>
          </header>
          <main className='p-2 text-center flex flex-col items-center'>
            {code && (
              <>
                <svg
                  className='h-16 w-16 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <h1 className='text-2xl font-semibold my-1'>
                  Guarda este código
                </h1>
                <h2 className='text-lg mb-6'>
                  Es importante por si quieres cancelar la cita
                </h2>
                <h3 className='text-3xl font-bold text-blue-500'>{code}</h3>
              </>
            )}
            {!code && (
              <div className='w-full'>
                <h1 className='text-3xl font-semibold mb-6'>
                  Necesitamos algunos datos
                </h1>

                <input
                  type='text'
                  onChange={(e) =>
                    setAppointment((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  placeholder='Introduce tu nombre'
                  className='p-2 border-none w-full outline-none bg-gray-100 rounded-lg mb-2'
                />
                <input
                  type='number'
                  min='0'
                  placeholder='Introduce tu nº de teléfono'
                  className='p-2 border-none w-full outline-none bg-gray-100 rounded-lg mt-2'
                  onChange={(e) =>
                    setAppointment((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
                <footer className='flex justify-center pt-4'>
                  <button
                    onClick={() => handleMakeAppointment()}
                    className='flex justify-center items-center text-center bg-blue-600 font-semibold w-full text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none shadow-lg'
                  >
                    {isLoading ? (
                      <svg
                        className='h-6 w-6 animate-bounce'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                        />
                      </svg>
                    ) : (
                      <span>Enviar</span>
                    )}
                  </button>
                </footer>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Modal;
