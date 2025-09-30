import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth";
import {
  albunsKey,
  appRoot,
  photosKey,
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
import { Frown, ImageUp, Pencil, Trash2 } from "lucide-react";
import ModalAlert from "../../../components/modal-alert";
import { toast } from "react-toastify";

function Home() {
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem(userStorageKey);
  const [modalNewAlbum, setModalNewAlbum] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();
  const [albumsWithCovers, setAlbumsWithCovers] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [albumEmEdicao, setAlbumEmEdicao] = useState(null);

  useEffect(() => {
    const existingAlbuns = localStorage.getItem(albunsKey);
    const albuns = existingAlbuns ? JSON.parse(existingAlbuns) : [];
    setItemData(albuns);
  }, []);

  useEffect(() => {
    if (itemData.length >= 1) {
      const existingPhotos = localStorage.getItem(photosKey);
      const photos = existingPhotos ? JSON.parse(existingPhotos) : [];

      const processedAlbums = itemData.map((album) => {
        const coverPhoto = photos.find((photo) => photo.albumId === album.id);

        return {
          ...album,
          coverImage: coverPhoto ? coverPhoto.image : null,
        };
      });

      setAlbumsWithCovers(processedAlbums);
    }
  }, [itemData]);

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

  function handleEditAlbum(album) {
    setAlbumEmEdicao(album);
    setModalNewAlbum(true);
  }

  const handleOpenCreateModal = () => {
    setAlbumEmEdicao(null);
    setModalNewAlbum(true);
  };

  const handleSaveAlbum = (albumData) => {
    const existingAlbuns = localStorage.getItem(albunsKey);
    const albuns = existingAlbuns ? JSON.parse(existingAlbuns) : [];

    if (albumEmEdicao) {
      const updatedAlbuns = albuns.map((album) =>
        album.id === albumEmEdicao.id ? { ...album, ...albumData } : album
      );
      localStorage.setItem(albunsKey, JSON.stringify(updatedAlbuns));
      setItemData(updatedAlbuns);
      toast.success("Álbum atualizado com sucesso!");
    } else {
      const newAlbum = {
        ...albumData,
        id: new Date().getTime(),
      };
      const updatedAlbuns = [...albuns, newAlbum];
      localStorage.setItem(albunsKey, JSON.stringify(updatedAlbuns));
      setItemData(updatedAlbuns);
      toast.success("Álbum criado com sucesso!");
    }

    setModalNewAlbum(false);
    setAlbumEmEdicao(null); 
  };

  function deleteAlbum() {
    const albumParaExcluir = albumsWithCovers.find(
      (album) => album.id === idDelete
    );

    if (albumParaExcluir?.coverImage !== null) {
      toast.warn(
        `AVISO: O álbum "${albumParaExcluir.title}" não pode ser excluído pois possui fotos`
      );
      return;
    }

    const _list = albumsWithCovers.filter((album) => album.id !== idDelete);
    setAlbumsWithCovers(_list);
    localStorage.setItem(albunsKey, JSON.stringify(_list));
    setModalDelete(false);
    setIdDelete(null);
    toast.success("Album excluído com sucesso!");
  }

  return (
    <>
      <ModalNewAlbum
        open={modalNewAlbum}
        setOpen={setModalNewAlbum}
        onSave={handleSaveAlbum} 
        albumData={albumEmEdicao}
        onClose={() => setAlbumEmEdicao(null)} 
      />
      <ModalAlert
        PaperProps={{
          className: "modal-delete",
        }}
        open={modalDelete}
        title="Atenção!"
        text="Deseja realmente excluir esse álbum?"
        onConfirm={() => {
          deleteAlbum();
        }}
        onCancel={() => {
          setModalDelete(false);
        }}
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
            {albumsWithCovers.length >= 1 ? (
              <>
                <ImageList variant="standard" cols={getCols()} gap={30}>
                  {albumsWithCovers?.map((item) => (
                    <ImageListItem
                      key={item.id}
                      className="album-item clickable"
                    >
                      {item.coverImage ? (
                        <img
                          onClick={() => handleAlbumClick(item.id)}
                          src={item.coverImage}
                        />
                      ) : (
                        <div
                          className="album-placeholder"
                          onClick={() => handleAlbumClick(item.id)}
                        >
                          <ImageUp />
                          Nenhuma foto neste álbum
                        </div>
                      )}
                      <ImageListItemBar
                        title={item.title}
                        subtitle={
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="subtitle-container">
                              {item.description}
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  handleEditAlbum(item);
                                }}
                                className="edit-album"
                              >
                                <Pencil />
                              </Button>
                              <Button
                                onClick={() => {
                                  setModalDelete(true);
                                  setIdDelete(item.id);
                                }}
                                className="delete-album"
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        }
                        position="below"
                        className="album-info"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            ) : (
              <div className="no-data">
                Nenhum álbum foi cadastrado! <Frown />
              </div>
            )}
          </Box>
        </div>
        <footer className="home-actions">
          <Button
            variant="contained"
            className="create-album-button"
            onClick={handleOpenCreateModal}
          >
            Criar novo álbum
          </Button>
        </footer>
      </div>
    </>
  );
}

export default Home;
