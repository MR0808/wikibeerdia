"use client";

import { Share2, Mail } from "lucide-react";
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditShareButton,
    FacebookIcon,
    EmailIcon,
    XIcon,
    WhatsappIcon,
    RedditIcon
} from "react-share";

import { BreweryType } from "@/types/breweries";
import { Button } from "@/components/ui/button";

const BreweryShare = ({ data }: { data: BreweryType }) => {
    // return (
    //     <>
    //         <Button className="flex flex-row">
    //             <Share2 className="mr-2" />
    //             Share
    //         </Button>
    //     </>
    // );
    return (
        <>
            <li>
                <EmailShareButton
                    url={`https://${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
                    subject={`Check out this awesome brewery I found on Wikibeerdia - ${data.name}`}
                    body={`I found this cool brewery on Wikibeerdia.com, it's call ${data.name}. Check it out at the link below`}
                >
                    <EmailIcon size={48} round={true} />
                </EmailShareButton>
            </li>
            <li>
                <FacebookShareButton
                    url={`https://${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
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
                    url={`https://${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
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
            <li>
                <RedditShareButton
                    url={`https://${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
                    title={`Wikibeerdia - Brewery - ${data.name}`}
                >
                    <RedditIcon
                        size={48}
                        round={true}
                        className="transition duration-300 ease-in-out hover:opacity-75"
                    />
                </RedditShareButton>
            </li>
            <li>
                <WhatsappShareButton
                    url={`https://${process.env.NEXT_PUBLIC_APP_URL}/breweries/${data.id}`}
                    title={`Wikibeerdia - Brewery - ${data.name}`}
                >
                    <WhatsappIcon
                        size={48}
                        round={true}
                        className="transition duration-300 ease-in-out hover:opacity-75"
                    />
                </WhatsappShareButton>
            </li>
        </>
    );
};
export default BreweryShare;
