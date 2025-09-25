import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts";
import { appRoot, userStorageKey } from "../../../constants/defaultValues";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModalNewAlbum from "../../../components/modal-new-album";



const itemData = [
  {
    id: 1,
    title: "Álbum 1",
    description: "Descrição do álbum 1",
  },
  {
    id: 2,
    title: "Álbum 2",
    description: "Descrição do álbum 2",
  },
  {
    id: 3,
    title: "Álbum 3",
    description: "Descrição do álbum 3",
  },
  {
    id: 4,
    title: "Álbum 4",
    description: "Descrição do álbum 4",
  },
  {
    id: 5,
    title: "Álbum 5",
    description: "Descrição do álbum 5",
  },
];

function Home() {
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem(userStorageKey);
  const [modalNewAlbum, setModalNewAlbum] = useState(false);
  const navigate = useNavigate();

  const handleAlbumClick = (albumId) => {
    navigate(`${appRoot}/album/${albumId}`);


  };

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
    <ModalNewAlbum open={modalNewAlbum} setOpen={setModalNewAlbum}/>
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
            {itemData.map((item) => (
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
