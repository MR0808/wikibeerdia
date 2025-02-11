"use client";

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    EmailIcon,
    XIcon
} from "react-share";

import { BreweryType } from "@/types/breweries";

const BreweryShare = ({ data }: { data: BreweryType }) => {
    return (
        <>
            <li>
                <div>
                    <EmailShareButton
                        url={`${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.slug}`}
                        subject={`Check out this awesome brewery I found on Wikibeerdia - ${data.name}`}
                        body={`I found this cool brewery on Wikibeerdia.com, it's call ${data.name}. Check it out at the link below`}
                        {...({} as any)}
                    >
                        <EmailIcon size={48} round={true} />
                    </EmailShareButton>
                </div>
            </li>
            <li>
                <div>
                    <FacebookShareButton
                        url={`${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.slug}`}
                        hashtag="#Wikibeerdia"
                        {...({} as any)}
                    >
                        <FacebookIcon
                            size={48}
                            round={true}
                            className="transition duration-300 ease-in-out hover:opacity-75"
                        />
                    </FacebookShareButton>
                </div>
            </li>
            <li>
                <div>
                    <TwitterShareButton
                        title={`Wikibeerdia - Brewery - ${data.name}`}
                        url={`${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.slug}`}
                        hashtags={[
                            "Wikibeerdia",
                            `${data.name.replace(/[^A-Z0-9]/gi, "")}`
                        ]}
                        related={["wikibeerdia"]}
                        {...({} as any)}
                    >
                        <XIcon
                            size={48}
                            round={true}
                            className="transition duration-300 ease-in-out hover:opacity-75"
                        />
                    </TwitterShareButton>
                </div>
            </li>
        </>
    );
};
export default BreweryShare;
