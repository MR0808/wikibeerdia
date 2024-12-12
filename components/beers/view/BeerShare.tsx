"use client";

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    EmailIcon,
    XIcon
} from "react-share";

import { BeerType } from "@/types/beers";

const BeerShare = ({ data }: { data: BeerType }) => {
    return (
        <>
            <li>
                <EmailShareButton
                    url={`${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
                    subject={`Check out this awesome beer I found on Wikibeerdia - ${data.name}`}
                    body={`I found this cool beer on Wikibeerdia.com, it's call ${data.name}. Check it out at the link below`}
                >
                    <EmailIcon size={48} round={true} />
                </EmailShareButton>
            </li>
            <li>
                <FacebookShareButton
                    url={`${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
                    hashtag="#Wikibeerdia"
                >
                    <FacebookIcon
                        size={48}
                        round={true}
                        className="transition duration-300 ease-in-out hover:opacity-75"
                    />
                </FacebookShareButton>
            </li>
            <li>
                <TwitterShareButton
                    title={`Wikibeerdia - Brewery - ${data.name}`}
                    url={`${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
                    hashtags={[
                        "Wikibeerdia",
                        `${data.name.replace(/[^A-Z0-9]/gi, "")}`
                    ]}
                    related={["wikibeerdia"]}
                >
                    <XIcon
                        size={48}
                        round={true}
                        className="transition duration-300 ease-in-out hover:opacity-75"
                    />
                </TwitterShareButton>
            </li>
        </>
    );
};
export default BeerShare;
