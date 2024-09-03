import Link from 'next/link';
import Image from 'next/image';

import logo from '@/public/images/logo.png';
import logoBlack from '@/public/images/logo-black.png';

const Logo = ({
    scrollActive,
    whiteLogo
}: {
    scrollActive: boolean;
    whiteLogo: boolean;
}) => {

    const logoUrl = whiteLogo ? logo : scrollActive ? logoBlack : logo;

    return (
        <Link href="/" className="flex items-center space-x-2 sm:w-56">
            <Image
                src={logoUrl}
                alt="Wikibeerdia"
                className="w-[150px] sm:w-[230px]"
            />
        </Link>
    );
};

export default Logo;
