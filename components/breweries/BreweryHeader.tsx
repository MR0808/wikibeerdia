import Link from "next/link";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BreweryType } from "@/types/breweries";

const BreweryHeader = ({ data }: { data: BreweryType }) => {
    return (
        <div className="flex flex-row">
            <div className="w-1/2">
                <h3 className="text-6xl font-semibold">{data.name}</h3>
                <div className="mt-10 flex flex-wrap">
                    {data.status !== "APPROVED" && <Badge>{data.status}</Badge>}
                    <div className="mt-15 ml-4 flex flex-row opacity-70">
                        <MapPin className="mr-1 h-5 w-5 align-middle opacity-70" />
                        {data.formattedAddress}
                    </div>
                </div>
            </div>
            <div className="col-lg-6 text-lg-end">
                <div className="d-inline-block md-mt-40">
                    <div className="price color-dark fw-500">
                        Price: $1,67,000
                    </div>
                    <div className="est-price fs-20 mt-25 mb-35 md-mb-30">
                        Est. Payment{" "}
                        <span className="fw-500 color-dark">$8,343/mo*</span>
                    </div>
                    <ul className="style-none d-flex align-items-center action-btns">
                        <li className="fw-500 color-dark me-auto">
                            <i className="fa-sharp fa-regular fa-share-nodes me-2"></i>
                            Share
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`d-flex align-items-center justify-content-center tran3s rounded-circle`}
                            >
                                <i className="fa-light fa-heart"></i>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`d-flex align-items-center justify-content-center tran3s rounded-circle`}
                            >
                                <i className="fa-light fa-bookmark"></i>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`d-flex align-items-center justify-content-center tran3s rounded-circle`}
                            >
                                <i className="fa-light fa-circle-plus"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BreweryHeader;
