import Image from "next/image";
import Link from "next/link";
import { others, quickLinks, socialLinks } from "./data";

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto pt-9 md:pt-12">
        <div className="flex flex-col md:flex-row  gap-6 md:gap-20 font-satoshi text-[#575757] text-sm px-4 md:px-0">
          <div className="w-full md:w-118">
            {/* <Image src="/layouts/logo2.svg" width={172} height={36} alt="" /> */}
            <h2 className="font-inter font-semibold text-[26px] text-[#094E9E]">Prime Bank</h2>
            <p className="text-[#575757] font-normal mt-4 leading-5.5">
              Prime Bank PLC., founded in 1995, is a leading commercial bank in
              Bangladesh. Headquartered in Dhaka’s Gulshan Avenue, it operates
              147 branches and 153 ATMs across 140 locations.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Quick Links</h2>
            <ul className="space-y-2 md:space-y-4 mt-4 md:mt-6">
              {quickLinks.map((link, index) => (
                <li key={`quick-link-${index}`}>
                  <Link
                    href={link.url}
                    className="text-[#575757] font-normal leading-5"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Others</h2>
            <ul className="space-y-2 md:space-y-4 mt-4 md:mt-6">
              {others.map((link, index) => (
                <li key={`quick-link-${index}`}>
                  <Link
                    href={link.url}
                    className="text-[#575757] font-normal leading-5"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Contacts</h2>
            <div className="space-y-2 md:space-y-4 mt-4 md:mt-6">
              <p>Email: support@primebank.com</p>
              <p>Phone: +880 1234 567890</p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((link, index) => (
                  <Link key={`social-link-${index}`} href={link.url}>
                    <Image
                      key={index}
                      src={link.icon}
                      width={28}
                      height={28}
                      alt="social"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-[#D2D2D2]/50 mt-6 md:mt-12">
          <p className="text-center text-sm text-[#575757]">
            &copy; 2025 primebank. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
