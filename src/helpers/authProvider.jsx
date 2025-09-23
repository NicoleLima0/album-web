import { useNavigate } from "react-router-dom";
import {
  appRoot,
  tokenStorageKey,
  userStorageKey,
} from "../constants/defaultValues";
import { AuthContext } from "../contexts";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    if (email === "adm" && password === "123") {
      localStorage.setItem(userStorageKey, "ADM");
      localStorage.setItem(tokenStorageKey, Math.random() * 1001);
      navigate(appRoot);
    } else {
      alert("Senha errada!");
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
