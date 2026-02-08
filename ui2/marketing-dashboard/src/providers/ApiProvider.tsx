import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const ApiContext = createContext<any>(null);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded } = useAuth();
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!isLoaded) return;

    getToken().then((token) => {
      const instance = axios.create({
        baseURL: "http://localhost:3001",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApi(instance);
    });
  }, [isLoaded, getToken]);

  if (!api) return null;

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
