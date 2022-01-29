import NextLink from 'next/link';

function Navbar() {
  return (
    <div className='flex justify-between py-6'>
      <div></div>
      <div className='flex'>
        <div className='pr-2'>
          <NextLink href='/check'>Citas</NextLink>
        </div>
        <div className='pl-2'>
          <NextLink href='/admin'>Admin</NextLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
