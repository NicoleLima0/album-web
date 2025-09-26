import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts";
import {
  albunsKey,
  appRoot,
  userStorageKey,
} from "../../../constants/defaultValues";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModalNewAlbum from "../../../components/modal-new-album";

function Home() {
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem(userStorageKey);
  const [modalNewAlbum, setModalNewAlbum] = useState(false);
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const existingAlbuns = localStorage.getItem(albunsKey);
    const albuns = existingAlbuns ? JSON.parse(existingAlbuns) : [];
    setItemData(albuns);
  }, []);

  const handleAlbumClick = (albumId) => {
    navigate(`${appRoot}/album/${albumId}`);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const getCols = () => {
    if (isMobile) {
      return 1;
    }
    if (isTablet) {
      return 2;
    }
    return 4;
  };

  return (
    <>
      <ModalNewAlbum
        open={modalNewAlbum}
        setOpen={setModalNewAlbum}
        setItemData={setItemData}
      />
      <div className="home-container">
        <div className="home-header">
          <h1 className="header-title">Meus álbuns de fotos</h1>
          <div className="user-info">
            <span>Olá, {userName}</span>
            <Button
              variant="text"
              onClick={() => {
                auth.signOut();
              }}
              className="logout-button"
            >
              [sair]
            </Button>
          </div>
        </div>
        <div className="albums-content">
          <Box sx={{ width: "100%" }}>
            <ImageList variant="standard" cols={getCols()} gap={30}>
              {itemData?.map((item) => (
                <ImageListItem
                  key={item.id}
                  className="album-item clickable"
                  onClick={() => handleAlbumClick(item.id)}
                >
                  <div className="album-placeholder" />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.description}
                    position="below"
                    className="album-info"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </div>
        <footer className="home-actions">
          <Button
            variant="contained"
            className="create-album-button"
            onClick={() => {
              setModalNewAlbum(true);
            }}
          >
            Criar novo álbum
          </Button>
        </footer>
      </div>
    </>
  );
}

export default Home;
