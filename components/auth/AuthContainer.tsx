import { Typewriter } from 'nextjs-simple-typewriter';
import logo from '@/public/images/logo.png';
import Link from 'next/link';
import Image from 'next/image';

const AuthContainer = ({ paragraph }: { paragraph: string }) => {
    const cheers = [
        'Cheers',
        'Cin! Cin!',
        'Sláinte',
        'Şerefe',
        '乾杯',
        'Salud',
        'Prost',
        'Santé',
        'Saúde',
        '건배',
        'Skål',
        'Gesondheid',
        '干杯',
        'Υγεία',
        'Na Zdrowie',
        'Tagay',
        'ชนแก้ว',
        'за здоровье',
        'לַחַיִּים'
    ];
    return (
        <div
            className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-60 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative bg-[url('/images/signup-bg.jpg')]"
            // style={{
            //     backgroundImage: 'url(/signup-bg.jpg)'
            // }}
        >
            <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0" />
            <div className="absolute triangle min-h-screen right-0 w-15" />
            <Link
                href="/"
                className="pt-20 flex absolute top-5 text-center text-gray-100 focus:outline-none"
            >
                <Image
                    src={logo}
                    alt="Wikibeerdia logo"
                    className="object-cover mx-auto rounded-full w-60"
                />
            </Link>
            <div className="w-full max-w-md z-10">
                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                    <Typewriter
                        words={cheers}
                        loop={0}
                        cursor
                        typeSpeed={70}
                        deleteSpeed={70}
                        delaySpeed={300}
                    />
                </div>
                <div className="sm:text-sm xl:text-lg text-gray-200 font-normal">
                    {paragraph}
                </div>
            </div>
            {/*-remove custom style*/}
            <ul className="circles">
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
            </ul>
        </div>
    );
};
export default AuthContainer;
