"use client";

import React from "react";
import { motion } from "framer-motion";
import { clearUserSession } from "@/utils/tokenUtils";
import { logout } from "@/hooks/logout";

const AccessDeniedPage = () => {
  const handleLogout = async () => {
    clearUserSession();
    logout();
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
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-900 via-red-800 to-gray-500 px-4 py-2 rounded-full text-white font-medium text-sm tracking-wide shadow-md">
          Permission Denied
        </div>

        <h1 className="text-5xl font-extrabold text-white text-center mb-4 tracking-wide">
          Access Denied
        </h1>

        <p className="text-xl sm:text-2xl font-medium text-white text-center mb-2">
          You do not have permission to view this page.
        </p>

        <p className="text-gray-200 text-center mb-6">
          If you believe this is a mistake, please contact your administrator or
          support team.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleLogout}
            className="relative px-6 py-2 text-white font-medium bg-gradient-to-r cursor-pointer from-red-800 to-gray-600 rounded-full shadow-lg hover:from-red-600 hover:to-pink-500 transition-transform hover:-translate-y-1"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default AccessDeniedPage;
