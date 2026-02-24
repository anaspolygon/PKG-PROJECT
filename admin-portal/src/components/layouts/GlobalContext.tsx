import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import getPendingCount from "@/app/(logged-in)/maker-checker/actions/getPendingCount";

type GlobalStateType = {
  pendingCount: number;
  fetchPendingCount: () => Promise<void>;
};

const GlobalContext = createContext<GlobalStateType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const fetchPendingCount = useCallback(async () => {
    const res = await getPendingCount();
    setPendingCount(res);
  }, []);

  useEffect(() => {
    fetchPendingCount();
  }, [fetchPendingCount]);

  return (
    <GlobalContext.Provider value={{ pendingCount, fetchPendingCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalState must be used within GlobalProvider");
  return context;
};
