import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { IoMdMenu } from 'react-icons/io';
import logo from '@/public/images/logo-black.png';
import Image from 'next/image';
import { links } from '@/utils/links';
import { BsSearch } from 'react-icons/bs';
import SingleMenuItem from './SingleMenuItem';
import MultiMenuItem from './MultiMenuItem';

function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="bg-primary rounded p-1">
                    <IoMdMenu className="text-4xl text-white" />
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetHeader className="p-5">
                    <SheetTitle>
                        <Image
                            src={logo}
                            alt="Wikibeerdia"
                            className="w-[200px]"
                        />
                    </SheetTitle>
                </SheetHeader>
                <div className="grid py-4">
                    <div className="py-4">
                        <div className="mx-5 p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-transparent text-foreground border-foreground border">
                            <BsSearch />
                            <input
                                type="search"
                                placeholder="Search Beers..."
                                className="text-[15px] ml-4 w-full bg-transparent focus:outline-none focus:border-none border-none text-foreground"
                            />
                        </div>
                    </div>
                    {links.map((link, index) => {
                        return link.subMenu ? (
                            <MultiMenuItem link={link} key={index} />
                        ) : (
                            <SingleMenuItem link={link} key={index} />
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
}
export default MobileMenu;
