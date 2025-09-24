import { Eye, EyeOff } from "lucide-react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";

function MainLogin({ email, setEmail, password, setPassword, auth, setStep }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="login-container">
        <div className="title">
          Use sua conta para acessar o{" "}
          <span className="highlight">Álbum Web</span>
        </div>
        <Box
          component="form"
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            auth.signIn(email, password, isError, setIsError);
          }}
        >
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isError ? <Alert severity="error">Senha incorreta</Alert> : <></>}
          <div className="other-actions">
            <Button
              variant="text"
              className="action-button"
              onClick={() => {
                setStep("signUp_Login");
              }}
            >
              Criar conta
            </Button>
          </div>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            className="login-button"
          >
            Entrar
          </Button>
        </Box>
      </div>
    </>
  );
}

export default MainLogin;
