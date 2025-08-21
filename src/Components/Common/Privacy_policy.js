import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
       <>
      <Head>
        <title>Home Improvement Ideas & Design | HomImprovement</title>
        <meta
          name="description"
          content="Upgrade your home with the best home improvement tips & interior design ideas..."
        />
        <meta
          name="keywords"
          content="Home improvement, Home renovation tips, Interior design ideas..."
        />
        <meta
          property="og:title"
          content="Home Improvement Ideas & Design | HomImprovement"
        />
        <meta
          property="og:description"
          content="Upgrade your home with the best home improvement tips & interior design ideas..."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homimprovement.com/privacy-policy" />
        <link rel="canonical" href="https://homimprovement.com/privacy-policy" />
      </Head>
    <div className="lg:mx-[13%] lg:my-8 mx-[2%] my-[1%]">
      <h1 className="lg:text-5xl text-xl font-bold text-gray-900 lg:mt-10 lg:mb-14 my-5">
        Privacy Policy
      </h1>

      <p className="lg:mb-10 mb-5 text-justify">
        At Homimprovement, found at{" "}
        <strong>
          <a href="https://homimprovement.com/">www.homimprovement.com</a>
        </strong>{" "}
        we care about your privacy. This Privacy Policy explains how we gather,
        use, and protect your personal details when you reach our website.
      </p>

      <p className="lg:mb-10 mb-5 text-justify">
        We obtain certain data in order to upgrade your online experience and
        our services. The email address may be joined by your name if you sign
        up for newsletters and contact forms. We collect details automatically
        when you navigate our website, as well as your IP address, browser type,
        and pages accessed.
      </p>

      <p className="lg:mb-10 mb-5 text-justify">
        We use your data to improve our services, communicate with you, and
        secure our website. You may receive updates or relevant content if you
        opt in. However, you should feel free knowing that we never sell or rent
        your personal information, though we may share the same with trusted
        service providers who help us maintain and improve our website.
      </p>

      <p className="lg:mb-10 mb-5 text-justify">
        We're not liable for linked sites' privacy policies. Check third-party
        privacy policies. Your location may allow you to access, correct, or
        delete your personal data. Use the contact information below to exercise
        these rights.
      </p>

      <p className="lg:mb-10 mb-5 text-justify">
        We take precautions to protect your details from uncertified access,
        disclosure, and alteration. but, since no internet communication is
        totally secure, we cannot guarantee absolute security.
      </p>

      <p className="lg:mb-10 mb-5 text-justify">
        We keep the right to upgrade this Privacy Policy from time to time. Any
        changes will be added to this page. The date at the top of the policy
        reflects the most recent update. We recommend you periodically review
        this page to see if there are any changes to our practices.
      </p>

      <p className="lg:mb-10 mb-5 text-justify">
        For questions about this Privacy Policy or to exercise your data rights,
        email us at <strong>info@homimprovement.com</strong>
      </p>
    </div>
    </>
  );
};

export default PrivacyPolicy;
