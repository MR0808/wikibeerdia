import Link from "next/link";

import siteMetadata from "@/utils/siteMetaData";

export async function generateMetadata() {
    const publishedAt = new Date("2025-03-16T00:00:00Z").toISOString;
    const modifiedAt = new Date("2025-03-16T00:00:00Z").toISOString;

    let imageList = [siteMetadata.siteLogo];

    const ogImages = imageList.map((img) => {
        return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
    });

    const authors = siteMetadata.author;
    const title = "Terms and Conditions";
    const description =
        "Welcome to Wikibeerdia, read our terms and conditions!";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${siteMetadata.siteUrl}/termsconditions`,
            siteName: siteMetadata.title,
            locale: "en_AU",
            type: "article",
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
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
                <p className="font-semibold">
                    3. Accuracy, completeness and timeliness of information
                </p>
                <p>
                    The information on our website is not comprehensive and is
                    intended to provide a summary of the subject matter covered.
                    While we use all reasonable attempts to ensure the accuracy
                    and completeness of the information on our website, to the
                    extent permitted by law, including the Australian Consumer
                    Law, we make no warranty regarding the information on this
                    website. You should monitor any changes to the information
                    contained on this website.
                </p>
                <p>
                    We are not liable to you or anyone else if interference with
                    or damage to your computer systems occurs in connection with
                    the use of this website or a linked website. You must take
                    your own precautions to ensure that whatever you select for
                    your use from our website is free of viruses or anything
                    else (such as worms or Trojan horses) that may interfere
                    with or damage the operations of your computer systems.
                </p>
                <p>
                    We may, from time to time and without notice, change or add
                    to the website (including the Terms) or the information,
                    products or services described in it. However, we do not
                    undertake to keep the website updated. We are not liable to
                    you or anyone else if errors occur in the information on the
                    website or if that information is not up-to-date.
                </p>
                <p className="font-semibold">4. Promotions and competitions</p>
                <p>
                    For certain campaigns, promotions or contests, additional
                    terms and conditions may apply. If you want to participate
                    in such a campaign, promotion or contest, you need to agree
                    to the relevant terms and conditions applicable to that
                    campaign, promotion or contest. In case of any inconsistency
                    between such terms and conditions and these Terms, those
                    terms and conditions will prevail.
                </p>
                <p className="font-semibold">5. Linked sites</p>
                <p>
                    Our website may contain links to websites operated by third
                    parties. Those links are provided for convenience and may
                    not remain current or be maintained. Unless expressly stated
                    otherwise, we do not endorse and are not responsible for the
                    content on those linked websites and have no control over or
                    rights in those linked websites.
                </p>
                <p className="font-semibold">6. Intellectual property rights</p>
                <p>
                    Unless otherwise indicated, we own or license from third
                    parties all rights, title and interest (including copyright,
                    designs, patents, trademarks and other intellectual property
                    rights) in this website and in all of the material
                    (including all text, graphics, logos, audio and software)
                    made available on this website (
                    <span className="font-bold italic">Content</span>).
                </p>
                <p>
                    Your use of this website and use of and access to any
                    Content does not grant or transfer any rights, title or
                    interest to you in relation to this website or the Content.
                    However we do grant you a licence to access the website and
                    view the Content on the terms and conditions set out in this
                    Agreement and, where applicable, as expressly authorised by
                    us and/or our third party licensors.
                </p>
                <p>
                    Any reproduction or redistribution of this website or the
                    Content is prohibited and may result in civil and criminal
                    penalties. In addition, you must not copy the Content to any
                    other server, location or support for publication,
                    reproduction or distribution is expressly prohibited.
                </p>
                <p>
                    All other use, copying or reproduction of this website, the
                    Content or any part of it is prohibited, except to the
                    extent permitted by law.
                </p>
                <p className="font-semibold">7. Unacceptable activity</p>
                <p>
                    You must not do any act that we would deem to be
                    inappropriate, is unlawful or is prohibited by any laws
                    applicable to our website, including but not limited to:
                </p>
                <ul className="list-disc pl-20">
                    <li>
                        any act that would constitute a breach of either the
                        privacy (including uploading private or personal
                        information without an individual's consent) or any
                        other of the legal rights of individuals;
                    </li>
                    <li>
                        using this website to defame or libel us, our employees
                        or other individuals;
                    </li>
                    <li>
                        uploading files that contain viruses that may cause
                        damage to our property or the property of other
                        individuals;
                    </li>
                    <li>
                        posting or transmitting to this website any
                        non-authorised material including, but not limited to,
                        material that is, in our opinion, likely to cause
                        annoyance, or which is defamatory, racist, obscene,
                        threatening, pornographic or otherwise or which is
                        detrimental to or in violation of our systems or a third
                        party's systems or network security.
                    </li>
                </ul>
                <p>
                    If we allow you to post any information to our website, we
                    have the right to take down this information at our sole
                    discretion and without notice.
                </p>
                <p className="font-semibold">8. Warranties and disclaimers</p>
                <p>
                    To the maximum extent permitted by law, including the
                    Australian Consumer Law, we make no warranties or
                    representations about this website or the Content, including
                    but not limited to warranties or representations that they
                    will be complete, accurate or up-to-date, that access will
                    be uninterrupted or error-free or free from viruses, or that
                    this website will be secure. We reserve the right to
                    restrict, suspend or terminate without notice your access to
                    this website, any Content, or any feature of this website at
                    any time without notice and we will not be responsible for
                    any loss, cost, damage or liability that may arise as a
                    result.{" "}
                </p>
                <p className="font-semibold">9. Liability</p>
                <p>
                    To the maximum extent permitted by law, including the
                    Australian Consumer Law, in no event shall we be liable for
                    any direct and indirect loss, damage or expense –
                    irrespective of the manner in which it occurs – which may be
                    suffered due to your use of our website and/or the
                    information or materials contained on it, or as a result of
                    the inaccessibility of this website and/or the fact that
                    certain information or materials contained on it are
                    incorrect, incomplete or not up-to-date.
                </p>
                <p className="font-semibold">
                    10. Jurisdiction and governing law
                </p>
                <p>
                    Your use of the website and these Terms are governed by the
                    law of Victoria, Australia and you submit to the
                    non-exclusive jurisdiction of the courts exercising
                    jurisdiction in Victoria, Australia.
                </p>
            </div>
        </>
    );
};
export default TermsConditionsPage;
