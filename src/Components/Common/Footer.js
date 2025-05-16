import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="text-white bg-black border-t border-gray-700">
      <div className="w-full max-w-screen-xl mx-auto p-3">
        <div className="flex lg:flex-row flex-col gap-4 justify-between">
          {/* Logo Section */}
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center space-x-3 mb-4 cursor-pointer">
              <img
                src="/footerlogo.webp"
                alt="Logo"
                width={120}
                height={120}
                loading="lazy"
              />
            </Link>
            <h2 className="lg:text-xl text-base font-bold text-center">
              Inspiring Spaces for Life
            </h2>
          </div>

          {/* Text + Social Section */}
          <div className="lg:w-9/12 flex flex-col">
            <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg shadow-lg">
              {/* Description */}
              <div className="lg:w-4/5 text-center lg:text-left">
                <h2 className="lg:text-lg text-sm text-white text-center">
                  HomImprovement is part of HomeMedia Group, the new generation
                  of digital publishers focused on delivering expert insight and
                  inspiration for all your home improvement needs. For more
                  information you can visit our corporate site:{' '}
                  <a
                    href="https://clickorbits.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-400"
                  >
                    www.ClickOrbits.com
                  </a>
                </h2>
              </div>

              {/* Social Links */}
              <div className="flex gap-8 mt-4 lg:mt-0">
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href="https://www.facebook.com/homimprovement9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="text-white text-2xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/Improvemen53343"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter className="text-white text-2xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/homimprovement97"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="text-white text-2xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="my-2 border-gray-500" />

            {/* Footer Navigation */}
            <div className="text-center">
              <ul className="grid lg:grid-cols-4 grid-cols-2 gap-2 items-center text-sm font-medium justify-between lg:divide-x-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-condition"
                    className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
                  >
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <hr className="my-2 border-gray-500" />
            <div className="lg:text-lg text-xs text-white text-center">
              <h2>
                @ClickOrbitsPteLtd, 10 ANSON ROAD, #33-10, INTERNATIONAL PLAZA,
                SINGAPORE (079903)
              </h2>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-1 border-gray-700 lg:my-2" />

      {/* Bottom copyright */}
      <div className="text-center">
        <span className="block text-sm text-white py-2">
          © 2024{' '}
          <Link href="/" className="hover:underline text-white">
            Homimprovement
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
