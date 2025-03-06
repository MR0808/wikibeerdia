import Image from "next/image";
import { sourceSerif } from "@/app/fonts";
import Link from "next/link";
import {
    DividerHorizontalIcon,
    InstagramLogoIcon,
    TwitterLogoIcon
} from "@radix-ui/react-icons";
import { XIcon } from "../global/Icons";
import FooterSubscribe from "./FooterSubscribe";

const Footer = () => {
    return (
        <div className="h-full w-full bg-black px-4 pb-16 text-white">
            <div className="border-b-primary mb-16 flex flex-col items-center justify-center space-y-9 border-b py-16 md:container md:flex-row md:justify-between md:space-y-0">
                <div className="hidden md:block">
                    <Image
                        src="/images/logo-icon.png"
                        alt="Wikibeerdia"
                        width={50}
                        height={50}
                        className="ease"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    />
                </div>
                <div className="flex flex-col items-center justify-center md:w-1/5 md:justify-start">
                    <div
                        className={`${sourceSerif.className} text-primary mb-4 text-xl md:mb-8 md:text-4xl`}
                    >
                        Keep Exploring
                    </div>
                    <div className="flex flex-col space-y-1 text-base md:text-lg">
                        <Link href="/" className="hover:text-primary">
                            Home
                        </Link>
                        <Link href="/about" className="hover:text-primary">
                            About
                        </Link>
                        <Link href="/blog" className="hover:text-primary">
                            Blog
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center md:w-1/5 md:justify-start">
                    <div
                        className={`${sourceSerif.className} text-primary mb-4 text-xl md:mb-8 md:text-4xl`}
                    >
                        Connect
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-9 text-base md:text-lg">
                        <Link href="/contact" className="hover:text-primary">
                            Contact Us
                        </Link>
                        <div className="flex w-14 flex-row justify-between">
                            <Link
                                href="https://www.instagram.com/wikibeerdiabeers/"
                                target="_blank"
                                className="hover:text-primary"
                            >
                                <InstagramLogoIcon className="size-5" />
                            </Link>
                            <Link
                                href="https://x.com/wikibeerdia"
                                target="_blank"
                                className="hover:text-primary"
                            >
                                <XIcon className="size-5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center md:w-2/5 md:justify-start">
                    <div
                        className={`${sourceSerif.className} text-primary mb-4 text-xl md:mb-8 md:text-4xl`}
                    >
                        Stay in the Know
                    </div>
                    <div className="flex flex-col space-y-9 text-base md:text-lg">
                        <div className="px-4 text-center md:px-0 md:text-left">
                            Keep up to date with the going ons at Wikibeerdia,
                            get notified when new breweries are listed, and see
                            what's happening in the world of beer. Sign up for
                            our newsletter here!
                        </div>
                        <FooterSubscribe />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between space-y-10 text-lg md:container md:flex-row md:space-y-0">
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <div className="md:border-r-primary md:mr-2 md:border-r md:pr-2">
                        &copy; {new Date().getFullYear()} Wikibeerdia
                    </div>
                    <div>All Rights Reserved</div>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Link
                        href="/sitemap"
                        className="border-r-primary hover:text-primary my-auto mr-2 flex h-14 items-center border-r pr-2 text-center md:h-full"
                    >
                        Sitemap
                    </Link>
                    <Link
                        href="/termsconditions"
                        className="border-r-primary hover:text-primary mr-2 flex h-14 items-center border-r pr-2 text-center md:h-full"
                    >
                        Terms and Conditions
                    </Link>
                    <Link
                        href="/privacy"
                        className="hover:text-primary flex h-14 items-center text-center md:h-full"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Footer;
