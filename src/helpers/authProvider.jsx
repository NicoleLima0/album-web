import { useNavigate } from "react-router-dom";
import {
  accountsKey,
  appRoot,
  tokenStorageKey,
  userStorageKey,
} from "../constants/defaultValues";
import { AuthContext } from "../contexts/auth";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const signIn = (email, password, isError, setIsError) => {
    const existingAccountsRaw = localStorage.getItem(accountsKey);

    if (!existingAccountsRaw) {
      alert("Login falhou: Nenhuma conta cadastrada.");
      setIsError(true);
      return null;
    }

    const accounts = JSON.parse(atob(existingAccountsRaw));

    const foundUser = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (foundUser) {
      localStorage.setItem(userStorageKey, foundUser.user);
      localStorage.setItem(tokenStorageKey, Math.random() * 1001);
      isError && setIsError(false);
      navigate(`${appRoot}/home`);
    } else {
      alert("Login falhou: E-mail ou senha inválidos.");
      setIsError(true);
    }
  };

  const signUp = (
    userNameCreated,
    setUserNameCreated,
    emailCreated,
    setEmailCreated,
    passwordConfirmCreated,
    setPasswordConfirmCreated,
    setPasswordCreated,
    setOpenSnack
  ) => {
    const payload = {
      user: userNameCreated,
      email: emailCreated,
      password: passwordConfirmCreated,
    };

    try {
      const existingAccountsRaw = localStorage.getItem(accountsKey);
      const accounts = existingAccountsRaw
        ? JSON.parse(atob(existingAccountsRaw))
        : [];

      const userExists = accounts.some(
        (account) => account.email === emailCreated
      );
      if (userExists) {
        alert(`Erro: Uma conta com o e-mail "${emailCreated}" já existe.`);
        return;
      }

      accounts.push(payload);
      localStorage.setItem(accountsKey, btoa(JSON.stringify(accounts)));

      setOpenSnack(true);

      setUserNameCreated("");
      setEmailCreated("");
      setPasswordConfirmCreated("");
      setPasswordCreated("");
    } catch (error) {
      alert("Falha ao cadastrar usuário");
      console("Falha ao cadastrar usuário:", error);
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
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
