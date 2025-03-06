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
        <div className="h-full bg-black pb-16 text-white">
            <div className="border-b-primary container mb-16 flex flex-row justify-between border-b py-16">
                <div>
                    <Image
                        src="/images/logo-icon.png"
                        alt="Wikibeerdia"
                        width={50}
                        height={50}
                        className="ease"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                    />
                </div>
                <div className="flex w-1/5 flex-col">
                    <div
                        className={`${sourceSerif.className} text-primary mb-8 text-4xl`}
                    >
                        Keep Exploring
                    </div>
                    <div className="flex flex-col space-y-1 text-lg">
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
                <div className="flex w-1/5 flex-col">
                    <div
                        className={`${sourceSerif.className} text-primary mb-8 text-4xl`}
                    >
                        Connect
                    </div>
                    <div className="flex flex-col space-y-9 text-lg">
                        <Link href="/contact" className="hover:text-primary">
                            Contact Us
                        </Link>
                        <div className="flex flex-row space-x-5">
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
                <div className="flex w-2/5 flex-col">
                    <div
                        className={`${sourceSerif.className} text-primary mb-8 text-4xl`}
                    >
                        Stay in the Know
                    </div>
                    <div className="flex flex-col space-y-9 text-lg">
                        <div>
                            Keep up to date with the going ons at Wikibeerdia,
                            get notified when new breweries are listed, and see
                            what's happening in the world of beer. Sign up for
                            our newsletter here!
                        </div>
                        <FooterSubscribe />
                    </div>
                </div>
            </div>
            <div className="container flex flex-row justify-between text-lg">
                <div className="flex flex-row">
                    <div className="border-r-primary mr-2 border-r pr-2">
                        &copy; {new Date().getFullYear()} Wikibeerdia
                    </div>
                    <div>All Rights Reserved</div>
                </div>
                <div className="flex flex-row">
                    <Link
                        href="/sitemap"
                        className="border-r-primary hover:text-primary mr-2 border-r pr-2"
                    >
                        Sitemap
                    </Link>
                    <Link
                        href="/termsconditions"
                        className="border-r-primary hover:text-primary mr-2 border-r pr-2"
                    >
                        Terms and Conditions
                    </Link>
                    <Link href="/privacy" className="hover:text-primary">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Footer;
