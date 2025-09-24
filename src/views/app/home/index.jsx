import { useContext } from "react";
import { AuthContext } from "../../../contexts";
import { Button } from "@mui/material";
import { userStorageKey } from "../../../constants/defaultValues";

function Home() {
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem(userStorageKey);

  return (
    <div className="home">
      <div className="nav-home">
        <div>Meu álbuns de fotos</div>
        <div>
          Olá, {userName}
          <Button
            variant="text"
            onClick={() => {
              auth.signOut();
            }}
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
