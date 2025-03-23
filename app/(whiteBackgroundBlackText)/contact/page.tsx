import Image from "next/image";

import { questrial } from "@/app/fonts";
import ContactForm from "@/components/contact/ContactForm";
import siteMetadata from "@/utils/siteMetaData";

export async function generateMetadata() {
    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;
    const title = "Contact";
    const description = "Contact us!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/contact`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "website",
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages
        }
    };
}

const ContactPage = async () => {
    return (
        <div className="bg-primary-foreground/15 pb-16">
            <div className="container mt-5 flex w-full flex-col-reverse items-center justify-items-center space-y-4 pt-36 md:flex-col">
                <div className="flex flex-col space-y-4">
                    <h1
                        className={`${questrial.className} text-center text-3xl leading-snug font-medium sm:leading-snug md:text-6xl md:leading-[1.2]`}
                    >
                        Get In Touch
                    </h1>
                    <h2
                        className={`${questrial.className} pt-5 text-center md:w-[750px]`}
                    >
                        Questions, comments, feedback, want to let us know your
                        favourite beer or brewery? Just use the form below to
                        get in touch and we'll get back to you as soon as
                        possible! In the meantime, enjoy a nice beer and have a
                        great day!
                    </h2>
                </div>
                <div className="flex w-full flex-row items-stretch justify-between space-x-10 md:mt-10">
                    <Image
                        src="/images/contact-bg.jpg"
                        width={600}
                        height={600}
                        alt="People enjoying beer"
                        sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                        className="my-auto h-full flex-1 rounded-2xl object-cover"
                    />
                    <div className="flex h-full flex-1 items-center">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactPage;
