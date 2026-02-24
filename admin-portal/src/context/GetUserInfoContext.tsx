"use client";
import { UserContextType } from "@/types/UserInfoTypes";
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : {};
  }
  return {};
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<Record<string, unknown>>(
    getUserInfo()
  );

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
