import { Typewriter } from 'nextjs-simple-typewriter';
import { ActionButton } from '@/components/form/ActionButton';
import { LogOutIcon } from 'lucide-react';

function Hero() {
    const styles = [
        'Pale Ales',
        'American Amber Ales',
        'American Red Ales',
        'India Pale Ales',
        'American IPA'
    ];
    return (
        <div className="relative overflow-hidden bg-[url('/images/main-bg.jpg')] h-[90vh] bg-center">
            <div className="bg-blue-950 bg-opacity-75 w-full h-full">
                <div className="mx-4 flex flex-wrap items-center pt-[120px] md:pt-[130px] lg:pt-[240px]">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[980px] text-center items-center">
                            <h1 className="mb-6 text-4xl font-bold leading-snug text-white sm:text-5xl sm:leading-snug lg:text-7xl lg:leading-[1.2] uppercase">
                                Find all your favourite
                            </h1>
                            <h1 className="mb-6 text-2xl font-bold leading-snug md:text-4xl sm:leading-snug lg:text-6xl lg:leading-[1.2] uppercase text-orange-400">
                                <Typewriter
                                    words={styles}
                                    loop={0}
                                    cursor
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                />
                            </h1>
                            <form className="max-w-[850px] mx-auto pt-2 md:pt-20">
                                <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-3 justify-between">
                                    <div className="items-center mr-4 md:w-4/12 pb-2 md:pb-0">
                                        <input
                                            className="text-base text-gray-400 flex-grow px-4 w-full outline-none"
                                            type="text"
                                            placeholder="What beer are you looking for?"
                                        />
                                    </div>
                                    {/* <SearchSelect
                                        name="location"
                                        data={countries}
                                    />
                                    <SearchSelect name="style" data={styles} /> */}
                                    <div className="items-center px-2 mx-auto md:border-l md:w-2/12">
                                        <button className="btn btn-accent rounded-md w-full">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hero;
