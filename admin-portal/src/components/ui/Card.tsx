import Image from "next/image";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  className?: string;
  showBackButton?: boolean;
  fn?: () => void;
}
const Card = ({
  title,
  subTitle,
  children,
  className = "md:p-10 md:my-9 md:w-[701px]",
  showBackButton = false,
  fn,
}: CardProps) => {
  return (
    <div
      className={`w-full p-4 ${className} rounded-2xl bg-white border border-[#D2D2D2] relative`}
    >
      <>
        {showBackButton ? (
          <button className="mb-9 cursor-pointer" onClick={fn}>
            <Image
              src="/layouts/back_button.svg"
              width={33}
              height={24}
              alt="back_button"
            />
          </button>
        ) : null}
        <h2 className="text-center font-satoshi font-bold text-[28px] mb-2">
          {title}
        </h2>
        <p className="text-center font-satoshi text-base text-[#909090]">
          {subTitle}
        </p>
        {children}
      </>
    </div>
  );
};

export default Card;
