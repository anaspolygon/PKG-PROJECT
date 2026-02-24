import Image from "next/image";
import Link from "next/link";
// import { navbarLinks } from "./data";
import LocaleSwitcher from "../ui/LocaleSwitcher";
import { usePathname } from "next/navigation";
// import { chekLoggedIn } from "./checkLoggedIn";

const Header = () => {
  const pathname = usePathname();
  // const router = useRouter();

  // const isUserloggedIn = async () => {
  //   const res = await chekLoggedIn();
  //   if (!res) {
  //     router.push("/auth/login");
  //   } else {
  //     router.push("/applications");
  //   }
  // };
  return (
    <div className="bg-white  border-b border-b-[#D2D2D2] hidden md:block md:px-4">
      <div className="container mx-auto flex items-center justify-between py-5">
        <div className="flex items-center">
          <Link href="/onboarding">
            {" "}
            <Image src="/layouts/logo.svg" width={182} height={36} alt="logo" />
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {pathname === "/onboarding/login" && <LocaleSwitcher />}
          {/* <button
            onClick={isUserloggedIn}
            className="text-white text-base font-satoshi font-medium py-[14px] px-[35px] bg-[#094E9E] rounded-lg cursor-pointer "
          >
            Application List
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
