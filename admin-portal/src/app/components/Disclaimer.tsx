import Image, { ImageProps } from "next/image";
import React from "react";

interface DisclaimerProps {
  showIcon?:boolean;
  message: string;
  icon?: ImageProps["src"] | string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  className?:string;
  iconSize?: number;
}

const Disclaimer: React.FC<DisclaimerProps> = ({
  showIcon,
  message,
  icon,
  bgColor = "#F0F5FF",
  borderColor = "#8EAED2",
  textColor = "text-darkblack",
  className="mb-4 mt-6",
  iconSize = 20,
}) => {
  return (
    <div
      className={`flex gap-4 p-3 rounded-sm text-center justify-center items-center border ${className}`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      {icon && showIcon &&  (
        <Image
          src={icon}
          alt="Disclaimer icon"
          width={iconSize}
          height={iconSize}
        />
      )}
      <p className={`text-md  text-left ${textColor}`}>{message}</p>
    </div>
  );
};

export default Disclaimer;
