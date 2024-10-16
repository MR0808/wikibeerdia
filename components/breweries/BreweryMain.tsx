import Image from "next/image";

import { BreweryType } from "@/types/breweries";

const BreweryMain = ({ data }: { data: BreweryType }) => {
    return (
        <div className="container mx-auto mt-36 p-2">
            <div className="flex flex-row flex-wrap py-4">
                <main
                    role="main"
                    className="w-full px-2 pt-1 sm:w-2/3 md:w-3/4"
                >
                    <h1 className="text-2xl" id="home">
                        Main Content
                    </h1>
                    <p>
                        Let's look at the base Tailwind classNamees that are
                        used for this layout. There are 2 columns. The left
                        sidebar (aside), and the main content area on the right.{" "}
                    </p>
                    <p className="pt-4"> The flexbox (parent) container: </p>
                    <ul>
                        <li>
                            <span className="text-purple-700">flex</span> - for{" "}
                            <code>dislay:flex</code>
                        </li>
                        <li>
                            flex-row - for <code>flex-direction: row</code>
                        </li>
                        <li>
                            flex-wrap - for <code>flex-wrap: wrap</code>
                        </li>
                        <li>
                            py-4 - for <code>padding-(top|bottom): 1rem</code>
                        </li>
                    </ul>
                    <p className="pt-4"> The aside (left) column: </p>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 33% width on sm and larger</li>
                        <li>md:w-1/4 - for 25% width on md and larger</li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <p className="pt-4"> The main (right) column: </p>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                    <ul>
                        <li>w-full - for 100% width</li>
                        <li>sm:w-1/3 - for 66% width on sm and larger</li>
                        <li>md:w-1/4 - for 75% width on md and larger</li>
                        <li>
                            pt-1 - for <code>padding-top: .25rem</code>
                        </li>
                        <li>
                            px-2 - for <code>padding-(left|right): .5rem</code>
                        </li>
                    </ul>
                </main>
                <aside className="w-full px-2 sm:w-1/3 md:w-1/4">
                    <div className="sticky top-0 w-full rounded-xl bg-white p-4">
                        <ul className="nav flex flex-col overflow-hidden">
                            <li className="nav-item">
                                <a
                                    className="nav-link truncate text-purple-800 hover:text-purple-600"
                                    href="/#home"
                                >
                                    <span className="fa fa-home mr-2"></span>{" "}
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link truncate text-purple-800 hover:text-purple-600"
                                    href="/#orders"
                                >
                                    <span className="fa fa-list-alt mr-2"></span>{" "}
                                    Orders{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-purple-800 hover:text-purple-600"
                                    href="/#products"
                                >
                                    <span className="fa fa-cart-plus mr-2"></span>{" "}
                                    Products{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-purple-800 hover:text-purple-600"
                                    href="/#customers"
                                >
                                    <span className="fa fa-user mr-2"></span>{" "}
                                    Customers{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-purple-800 hover:text-purple-600"
                                    href="/#reports"
                                >
                                    <span className="fa fa-chart-bar mr-2"></span>{" "}
                                    Reports{" "}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link text-purple-800 hover:text-purple-600"
                                    href="/#int"
                                >
                                    <span className="fa fa-layer-group mr-2"></span>{" "}
                                    Integrations{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};
export default BreweryMain;
