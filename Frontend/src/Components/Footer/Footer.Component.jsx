import logo from "../../assets/Logo.png";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-700 font-outfit [box-shadow:0_0_5px_rgba(117,_117,_117,_0.6)]">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className=" text-center">
            <div className="flex justify-center text-white lg:justify-start">
              <img className="h-16 w-16" src={logo} alt="Your Company" />
              <h1 className=" text-lg font-bold ml-2 font-mdBold flex items-center">
                Material Explorer
              </h1>
            </div>

            <p className="mt-6  max-w-[90%] mx-auto lg:mx-0 text-center leading-relaxed text-white lg:w-full lg:text-left">
              Online Search Platform For Scientific Materials for Phd Students
              and Researchers
            </p>

            <ul className="mt-8 flex justify-center gap-6 lg:justify-start lg:gap-8">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-teal-100/75"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="h-7 w-7" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-teal-100/75"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-7 w-7" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-teal-100/75"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-7 w-7" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-teal-100/75"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-7 w-7" />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-teal-100/75"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-7 w-7" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-center lg:text-left">
              <p className="text-lg font-medium text-white">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 lg:justify-start"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className=" text-white tracking-[0.09rem] first-letter:capitalize hover:text-teal-300">
                      materialexplorerpfe@gmail.com
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 lg:justify-start"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span className=" text-white tracking-[0.09rem] hover:text-teal-300">
                      +213554206816
                    </span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 lg:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address className="-mt-0.5 not-italic text-white">
                    Annaba , Algeria
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-white">
              <span className="block sm:inline">All rights reserved. </span>

              <a
                className="inline-block text-white underline transition hover:text-teal-100/75"
                href="#"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className="inline-block text-white underline transition hover:text-teal-100/75"
                href="#"
              >
                Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-sm text-white sm:order-first sm:mt-0">
              &copy; 2024 Material Explorer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
