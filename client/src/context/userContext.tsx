import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./authContext";
import axios from "axios";

interface User {
  name: string;
}

interface UserContextType {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  getCurrentUser: () => Promise<void>;
}

export const userDataContext = createContext<UserContextType | null>(null);

function UserContext({ children }: { children: React.ReactNode }) {

  const [userData, setUserData] = useState<User | null>(null);

  const serverUrl = useContext(authDataContext)?.serverUrl;

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getcurrentuser`,
        { withCredentials: true }
      );

      console.log(result);

      setUserData(result.data);

    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value: UserContextType = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
