import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import React from "react";

const TermandConditionCheck = ({
  onChange,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslation("terms"); 
  return (
    <div className="flex items-center  gap-3">
      <input id="terms" type="checkbox" name="checkbox" onChange={onChange} />

      <label
        className="font-satoshi font-medium text-sm text-[#221E1F]"
        htmlFor="terms"
      >
        {t('agreement')}{" "}
        <Link target="_blank"  rel="noopener noreferrer" className="underline text-blue" href={"/onboarding/terms-conditions"}>
          {/* terms and conditions */}
          {t('linkText')}
        </Link>
      </label>
    </div>
  );
};

export default TermandConditionCheck;
