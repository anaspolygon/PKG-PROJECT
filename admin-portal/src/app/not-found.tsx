"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Custom404 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClicked = () => {
    router.push("/auth/login");
  };

  return (
    <main
      style={{ background: "var(--color-primary-bg)" }}
      className="min-h-screen min-w-screen flex items-center justify-center px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-10 max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
      >
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-900 via-red-800 to-gray-500 px-4 py-2 rounded-full text-white font-bold text-sm tracking-wide shadow-md">
          Error
        </div>
        <h1 className="text-6xl font-extrabold text-white text-center mb-4 tracking-wide">
          404
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-pink-300 text-center mb-2">
          Page Not Found
        </p>
        <p className=" text-gray-200 text-center mb-6">
          The URL <span className="text-green-300 font-mono">{pathname}</span>{" "}
          doesn’t seem to exist.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleClicked}
            className="relative px-6 py-2 text-white font-medium bg-gradient-to-r cursor-pointer from-red-800 to-gray-600 rounded-full shadow-lg hover:from-red-600 hover:to-red-900 transition-transform hover:-translate-y-1"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default Custom404;
