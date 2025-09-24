import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/index";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import MainLogin from "../../../components/stepsLogin/main";
import SignUpLogin from "../../../components/stepsLogin/signUp";
import { Card, CardContent } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCreated, setEmailCreated] = useState("");
  const [passwordCreated, setPasswordCreated] = useState("");
  const [passwordConfirmCreated, setPasswordConfirmCreated] = useState("");
  const [userNameCreated, setUserNameCreated] = useState("");
  const auth = useContext(AuthContext);
  const [step, setStep] = useState("main_login");

  const renderCurrentStep = () => {
    switch (step) {
      case "main_login":
        return (
          <MainLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            auth={auth}
            setStep={setStep}
          />
        );
      case "signUp_Login":
        return (
          <SignUpLogin
            emailCreated={emailCreated}
            setEmailCreated={setEmailCreated}
            passwordCreated={passwordCreated}
            setPasswordCreated={setPasswordCreated}
            passwordConfirmCreated={passwordConfirmCreated}
            setPasswordConfirmCreated={setPasswordConfirmCreated}
            userNameCreated={userNameCreated}
            setUserNameCreated={setUserNameCreated}
            auth={auth}
            setStep={setStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="login-page">
        <Card className="login-card" elevation={5}>
          <CardContent className="login-card-content">
            <AnimatePresence mode="wait">
              <motion.div
                style={{ width: "100%" }}
                key={step}
                initial={
                  step === "main_login"
                    ? { opacity: 0 }
                    : { rotateY: 90, opacity: 0 }
                }
                animate={
                  step === "main_login"
                    ? { opacity: 1 }
                    : { rotateY: 0, opacity: 1 }
                }
                exit={
                  step === "main_login"
                    ? { opacity: 0 }
                    : { rotateY: 90, opacity: 0 }
                }
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login;
