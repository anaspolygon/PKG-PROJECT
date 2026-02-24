export const Error = ({ errorMessage }: { errorMessage?: string }) => {
  if (!errorMessage) return null;
  return <p className="text-start text-[#FF5722] text-xs">{errorMessage}</p>;
};
