"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
