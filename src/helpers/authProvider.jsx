import { useNavigate } from "react-router-dom";
import {
  appRoot,
  tokenStorageKey,
  userStorageKey,
} from "../constants/defaultValues";
import { AuthContext } from "../contexts";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const signIn = async (email, password, isError, setIsError) => {
    if (email === "adm" && password === "123") {
      localStorage.setItem(userStorageKey, email);
      localStorage.setItem(tokenStorageKey, Math.random() * 1001);
      isError && setIsError(false);
      navigate(`${appRoot}/home`);
    } else {
      setIsError(true);
    }
  };

  const signOut = async () => {
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(userStorageKey);
    navigate("/");
  };

  const value = {
    signOut,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
