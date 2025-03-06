import Link from "next/link";

const TermsConditionsPage = () => {
    return (
        <>
            <div className="bg-privacy-bg h-80 bg-black bg-cover bg-center drop-shadow-lg">
                <div className="h-full bg-black/50">
                    <div className="container my-auto h-full content-center pt-20 text-5xl font-semibold text-white">
                        Terms and Conditions
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-8 px-4 py-10 md:container md:px-8 md:py-16">
                <p>
                    Thank you for visiting our website. This website is owned by
                    Wikibeerdia (ABN: 60 794 655 147). By accessing and/or using
                    this website and related services, you agree to these Terms
                    and Conditions, which include our Privacy Policy (available
                    here) (Terms). You should review our Privacy Policy and
                    these Terms carefully and immediately cease using our
                    website if you do not agree to these Terms.
                </p>
                <p>In these Terms, 'us', 'we' and 'our' means Wikibeerdia.</p>
                <p className="font-semibold">1. Registration</p>
                <p>
                    You may need to be a registered member to access certain
                    features of our website.{" "}
                </p>
                <p>
                    When you register and activate your account, you will
                    provide us with personal information such as your name,
                    email address location and date of birth. You must ensure
                    that this information is accurate and current. We will
                    handle all personal information we collect in accordance
                    with our{" "}
                    <Link href="/privacy" className="hover:text-primary">
                        Privacy Policy
                    </Link>
                    .
                </p>
                <p>
                    When you register and activate your account, we will provide
                    you with a user name (your email) and password. You are
                    responsible for keeping this user name and password secure
                    and are responsible for all use and activity carried out
                    under this user name.
                </p>
                <p>To create an account, you must be:</p>
                <ul className="list-disc pl-20">
                    <li>
                        at least the legal age to purchase alcohol within your
                        location;
                    </li>
                    <li>
                        possess the legal right and ability to enter into a
                        legally binding agreement with us; and
                    </li>
                    <li>
                        agree and warrant to use the website in accordance with
                        these Terms.
                    </li>
                </ul>
                <p className="font-semibold">2. Collection Notice </p>
                <p>
                    We collect personal information about you in order to
                    respond to your enquiries, process your registration,
                    provide you with functionality on the site and for purposes
                    otherwise set out in our{" "}
                    <Link href="/privacy" className="hover:text-primary">
                        Privacy Policy
                    </Link>
                    .
                </p>
                <p>
                    We may disclose that information to third parties that help
                    us deliver our services (including information technology
                    suppliers, communication suppliers and our business
                    partners) or as required by law. If you do not provide this
                    information, we may not be able to provide all of our
                    products to you. We may also disclose your personal
                    information to recipients that are located outside of
                    Australia.
                </p>
                <p>
                    Our Privacy Policy explains: (i) how we store and use, and
                    how you may access and correct your personal information;
                    (ii) how you can lodge a complaint regarding the handling of
                    your personal information; and (iii) how we will handle any
                    complaint. If you would like any further information about
                    our privacy policies or practices, please{" "}
                    <Link href="/contact" className="hover:text-primary">
                        contact us
                    </Link>
                    .
                </p>
                <p>
                    By providing your personal information to us, you consent to
                    the collection, use, storage and disclosure of that
                    information as described in the Privacy Policy and these
                    Terms.
                </p>
            </div>
        </>
    );
};
export default TermsConditionsPage;
