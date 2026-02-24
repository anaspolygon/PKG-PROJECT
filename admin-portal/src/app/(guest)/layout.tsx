import PathnameWatcher from "@/components/PathnameWatcher";

/* eslint-disable @next/next/no-img-element */
export default async function AdminDynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full flex items-center relative"
      style={{
        backgroundImage: "url(/login-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "-webkit-optimize-contrast",
      }}
    >
      {/* Optional overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="flex items-center justify-between w-full gap-6 xl:gap-8 px-48">
          {/* Left Side - Login Form */}
          <div className="w-full lg:w-auto shrink-0 py-8">
            <PathnameWatcher>{children}</PathnameWatcher>
          </div>

          {/* Right Side - Side Image - Full Height */}
          <div className="hidden lg:flex lg:w-[50%] xl:w-[45%] h-screen items-end justify-end">
            <img
              src="/login-side.png"
              alt="Login illustration"
              className="w-full h-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
