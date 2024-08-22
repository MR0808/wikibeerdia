import Link from 'next/link';
import logo from '@/public/images/logo.png';
import logoBlack from '@/public/images/logo-black.png';
import Image from 'next/image';

function Logo({ scrollActive }: { scrollActive: boolean }) {
    const logoUrl = scrollActive ? logoBlack : logo;

    return (
        <Link href="/" className="flex items-center space-x-2 sm:w-56">
            <Image
                src={logoUrl}
                alt="Wikibeerdia"
                className="w-[150px] sm:w-[230px]"
            />
        </Link>
    );
}

export default Logo;
