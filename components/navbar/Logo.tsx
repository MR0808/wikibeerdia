import Link from 'next/link';
import logo from '@/public/images/logo.png';
import logoBlack from '@/public/images/logo-black.png';
import Image from 'next/image';

function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="Wikibeerdia" width={230} />
        </Link>
    );
}

export default Logo;
