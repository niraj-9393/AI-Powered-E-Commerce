import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "../../../client/src/context/authContext";
import axios from "axios";


interface AdminContextType {
  adminData: any;
  setAdminData: React.Dispatch<React.SetStateAction<any>>;
  getCurrentAdmin: () => Promise<void>;
}

export const adminDataContext = createContext<AdminContextType | null>(null);


function AdminContext({ children }: { children: React.ReactNode }) {
  const [adminData, setAdminData] = useState<any>(null);
  const serverUrl = useContext(authDataContext)?.serverUrl;

  const getCurrentAdmin = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/user/getcurrentadmin`,
        { withCredentials: true }
      );

      console.log(response);

      setAdminData(response.data.email);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCurrentAdmin();
  }, []);

  const value = {
    adminData,
    setAdminData,
    getCurrentAdmin,
  };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;