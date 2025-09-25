import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts";
import { appRoot, userStorageKey } from "../../../constants/defaultValues";
import ModalNewPhotos from "../../../components/modal-new-photos";
import {
  Button,
  Box,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";

const albumsData = {
  1: {
    title: "Álbum de aniversário",
    description: "Descrição do meu álbum",
    photos: [{ id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }],
  },
  2: {
    title: "Álbum de aniversário",
    description: "Descrição do meu álbum",
    photos: [{ id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }],
  },
  3: {
    title: "Álbum de aniversário",
    description: "Descrição do meu álbum",
    photos: [{ id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }],
  },
  4: {
    title: "Álbum de aniversário",
    description: "Descrição do meu álbum",
    photos: [{ id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }],
  },
  5: {
    title: "Álbum de aniversário",
    description: "Descrição do meu álbum",
    photos: [{ id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }],
  },
};

function AlbumDetail() {
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem(userStorageKey);
  const { albumId } = useParams();
  const navigate = useNavigate();
  const album = albumsData[albumId];
  const [isView, setIsView] = useState("miniature");
  const [modalNewPhoto, setModalNewPhoto] = useState(false);

  if (!album) {
    return (
      <div className="page-404">
        <h2>Álbum não encontrado!</h2>
        <Button onClick={() => navigate(`${appRoot}/home`)}>
          Voltar para a lista de álbuns
        </Button>
      </div>
    );
  }

  return (
    <>
      <ModalNewPhotos open={modalNewPhoto} setOpen={setModalNewPhoto} />
      <div className="album-detail-container">
        <div className="home-header">
          <h1 className="header-title">Meus álbuns de fotos</h1>
          <div className="user-info">
            <span>Olá, {userName}</span>
            <Button
              variant="text"
              onClick={() => auth.signOut()}
              className="logout-button"
            >
              [sair]
            </Button>
          </div>
        </div>
        <div className="album-info-header">
          <div className="album-text">
            <Typography
              variant="h4"
              component="h2"
              className="album-main-title"
            >
              {album.title}
            </Typography>
            <Typography variant="body1" className="album-description">
              {album.description}
            </Typography>
          </div>
          <div className="view-options">
            Visualizar como:
            <span
              className={isView === "table" ? "active" : ""}
              onClick={() => {
                setIsView("table");
              }}
            >
              Tabela
            </span>
            /
            <span
              className={isView === "miniature" ? "active" : ""}
              onClick={() => {
                setIsView("miniature");
              }}
            >
              Miniaturas
            </span>
          </div>
        </div>
        <div className="photos-content">
          {isView === "table" ? (
            <div>Tabela</div>
          ) : (
            <Box sx={{ width: "100%" }}>
              <ImageList variant="standard" cols={4} gap={30}>
                {album.photos.map((photo) => (
                  <ImageListItem key={photo.id} className="photo-item">
                    <div className="photo-placeholder" />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
        </div>
        <div className="album-detail-actions">
          <Button
            variant="contained"
            className="add-photos-button"
            onClick={() => {
              setModalNewPhoto(true);
            }}
          >
            Adicionar fotos
          </Button>
          <Button
            variant="contained"
            className="back-button"
            onClick={() => {
              navigate(`${appRoot}/home`);
            }}
          >
            Voltar
          </Button>
        </div>
      </div>
    </>
  );
}

export default AlbumDetail;
