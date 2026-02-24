import Image from "next/image";

const PrimeLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <Image src="/assests/prime_bank.svg" alt="" width={70} height={70} />
      <p className="font-satoshi text-base mt-1">Loading...</p>
    </div>
  );
};

export default PrimeLoader;
