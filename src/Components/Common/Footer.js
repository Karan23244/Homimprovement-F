import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="text-white bg-black border-t border-gray-700">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Side: Logo & Description */}
          <div className="flex flex-col lg:w-1/2 items-center text-center lg:text-left">
            <Link href="/" className="mb-4">
              <img
                src="/footerlogo.webp"
                alt="Logo"
                width={120}
                height={120}
                loading="lazy"
                className="mx-auto lg:mx-0"
              />
            </Link>
            <p className="text-lg font-bold mb-2">
              Inspiring Spaces for Life
            </p>
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              HomImprovement is part of HomeMedia Group, the new generation of
              digital publishers focused on delivering expert insight and
              inspiration for all your home improvement needs.
              <br />
              Visit our corporate site:{" "}
              <a
                href="https://clickorbits.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-400">
                www.ClickOrbits.com
              </a>
            </p>
          </div>

          {/* Right Side: Links & Social */}
          <div className="flex flex-col md:flex-row justify-center lg:gap-20">
            {/* Quick Links */}
            <div className="flex flex-col gap-3 text-center md:text-left">
              <p className="text-lg font-semibold mb-2">Quick Links</p>
              <Link href="/privacy-policy" className="hover:underline text-sm">
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-condition"
                className="hover:underline text-sm">
                Terms & Conditions
              </Link>
              <Link href="/disclaimer" className="hover:underline text-sm">
                Disclaimer
              </Link>
              <Link href="/about-us" className="hover:underline text-sm">
                About Us
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-lg font-semibold mb-2">Follow Us</p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/homimprovement9"
                target="_blank"
                rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-500 transition-all duration-300" />
              </a>
              <a
                href="https://x.com/Improvemen53343"
                target="_blank"
                rel="noopener noreferrer">
                <FaXTwitter className="text-2xl hover:text-blue-500 transition-all duration-300" />
              </a>
              <a
                href="https://www.instagram.com/homimprovement97"
                target="_blank"
                rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          © 2024{" "}
          <Link href="/" className="hover:underline text-white">
            Homimprovement
          </Link>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
