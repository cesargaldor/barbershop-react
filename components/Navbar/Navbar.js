import NextLink from 'next/link';

function Navbar() {
  return (
    <div className='flex justify-between py-6 px-5'>
      <div></div>
      <div className='flex'>
        <div className='pr-2'>
          <NextLink href='/'>Citas</NextLink>
        </div>
        <div className='px-2'>
          <NextLink href='/appointment'>Comprobar cita</NextLink>
        </div>
        <div className='pl-2'>
          <NextLink href='/admin'>Admin</NextLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
