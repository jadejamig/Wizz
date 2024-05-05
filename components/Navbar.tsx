import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './MobileSidebar';

interface NavbarProps {
  apiLimitCount: number
}

const Navbar = ({ apiLimitCount }: NavbarProps) => {
  
  return (
    <div className='flex items-center p-4'>
        <MobileSidebar apiLimitCount={apiLimitCount}/>
        <div className='flex w-full justify-end'>
            <UserButton/>
        </div>
    </div>
  )
}

export default Navbar