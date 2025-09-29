import { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

function SignUpLogin({
  emailCreated,
  setEmailCreated,
  passwordCreated,
  setPasswordCreated,
  passwordConfirmCreated,
  setPasswordConfirmCreated,
  userNameCreated,
  setUserNameCreated,
  auth,
  setStep,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (passwordCreated !== passwordConfirmCreated) {
      toast.warn("Senhas diferentes. Verifique!");
      return;
    } else {
      auth.signUp(
        userNameCreated,
        setUserNameCreated,
        emailCreated,
        setEmailCreated,
        passwordConfirmCreated,
        setPasswordConfirmCreated,
        setPasswordCreated
      );
    }
  };

  const handleCancel = () => {
    setStep("main_login");
    setUserNameCreated("");
    setEmailCreated("");
    setPasswordCreated("");
    setPasswordConfirmCreated("");
  };

  return (
    <>
      <div className="signup-container">
        <div className="title">
          Crie sua conta no <span className="highlight">Álbum Web</span>
        </div>
        <Box
          component="form"
          className="signup-form"
          onSubmit={handleFormSubmit}
        >
          <TextField
            label="Nome do usuário"
            variant="outlined"
            fullWidth
            required
            value={userNameCreated}
            onChange={(e) => setUserNameCreated(e.target.value)}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={emailCreated}
            onChange={(e) => setEmailCreated(e.target.value)}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            value={passwordCreated}
            onChange={(e) => setPasswordCreated(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirme sua senha"
            variant="outlined"
            fullWidth
            required
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirmCreated}
            onChange={(e) => setPasswordConfirmCreated(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordConfirm((s) => !s)}
                    edge="end"
                  >
                    {showPasswordConfirm ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="actions-signup">
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={handleCancel}
              className="cancel-button"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="signup-button"
            >
              Criar conta
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}

export default SignUpLogin;
