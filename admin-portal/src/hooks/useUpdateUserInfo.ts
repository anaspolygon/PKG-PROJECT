import { useUserContext } from "@/context/GetUserInfoContext";

export const useUpdateUserInfo = () => {
    const { userInfo, setUserInfo } = useUserContext();
  
    const updateUserInfo = (updates: Record<string, unknown>) => {
      setUserInfo({
        ...userInfo,
        ...updates,
      });
    };
  
    return updateUserInfo;
  };
  