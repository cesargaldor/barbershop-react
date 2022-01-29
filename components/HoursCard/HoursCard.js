function HoursCard({ date, isBooked, handleOpenModal }) {
  return (
    <div
      onClick={() => handleOpenModal(date, isBooked)}
      className={`w-52 h-20 ${
        isBooked
          ? 'bg-red-400 cursor-not-allowed'
          : 'bg-green-400 cursor-pointer'
      } rounded-lg flex justify-center items-center `}
    >
      <span className='text-lg'>
        {date.getHours()}:{date.getMinutes()}
        {date.getMinutes() === 0 ? 0 : ''}
      </span>
    </div>
  );
}

export default HoursCard;
