import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth";
import {
  albunsKey,
  appRoot,
  photosKey,
  userStorageKey,
} from "../../../constants/defaultValues";
import ModalNewPhotos from "../../../components/modal-new-photos";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Button,
  Box,
  ImageList,
  ImageListItem,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import ModalAlert from "../../../components/modal-alert";
import { toast } from "react-toastify";
import { formatBytes, formatDate } from "../../../helpers/utils";
import ModalExpandPhoto from "../../../components/modal-expand-photo";

function AlbumDetail() {
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem(userStorageKey);
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({});
  const [isView, setIsView] = useState("miniature");
  const [modalNewPhoto, setModalNewPhoto] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [photos, setPhotos] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalExpand, setModalExpand] = useState(false);
  const [imageExpand, setImageExpand] = useState({});

  useEffect(() => {
    const existingAlbuns = localStorage.getItem(albunsKey);
    const albuns = existingAlbuns ? JSON.parse(existingAlbuns) : [];
    const albumFound = albuns.find(
      (album) => album.id === parseInt(albumId, 10)
    );

    setAlbum(albumFound);
  }, [albumId]);

  useEffect(() => {
    const existingPhotos = localStorage.getItem(photosKey);
    const photos = existingPhotos ? JSON.parse(existingPhotos) : [];
    const photosFound = photos.filter(
      (item) => item.albumId === Number(albumId)
    );
    setPhotos(photosFound);
  }, [albumId]);

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

  const getCols = () => {
    if (isMobile) {
      return 2;
    }
    if (isTablet) {
      return 3;
    }
    return 4;
  };

  function deleteAlbum() {
    const indexToDelete = photos.findIndex(
      (photo) => photo.imageId === idDelete
    );

    if (indexToDelete !== -1) {
      photos.splice(indexToDelete, 1);
      localStorage.setItem(photosKey, JSON.stringify(photos));
      setModalDelete(false);
      setIdDelete(null);
      toast.success("Imagem deletada");
    }
  }

  return (
    <>
      <ModalNewPhotos
        open={modalNewPhoto}
        setOpen={setModalNewPhoto}
        setPhotos={setPhotos}
      />
      <ModalExpandPhoto
        open={modalExpand}
        setOpen={setModalExpand}
        imageExpand={imageExpand}
        setImageExpand={setImageExpand}
      />
      <ModalAlert
        open={modalDelete}
        title="Atenção!"
        text="Deseja realmente excluir essa foto?"
        onConfirm={() => {
          deleteAlbum();
        }}
        onCancel={() => {
          setModalDelete(false);
        }}
      />
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
            <>
              <TableContainer
                component={Paper}
                className="photos-table-container"
              >
                <Table sx={{ minWidth: 650 }} aria-label="tabela de fotos">
                  <TableHead className="photos-table-head">
                    <TableRow>
                      <TableCell>Foto</TableCell>
                      <TableCell>Tamanho</TableCell>
                      <TableCell>Data de aquisição</TableCell>
                      <TableCell>Cor predominante</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {photos.length >= 1 ? (
                      <>
                        {photos.map((photo) => (
                          <TableRow key={photo.imageId}>
                            <TableCell>{photo.imageName}</TableCell>
                            <TableCell>
                              {formatBytes(photo.imageSize)}
                            </TableCell>
                            <TableCell>{formatDate(photo.date)}</TableCell>
                            <TableCell>
                              <Box className="color-cell-content">
                                <Box
                                  className="color-swatch"
                                  style={{ background: photo.color }}
                                />
                                <Typography variant="body2">
                                  {photo.color}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <>Nenhuma imagem encontrada</>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <footer className="album-actions">
                <Button variant="contained" className="btn-delete">
                  Excluir álbum
                </Button>
              </footer> */}
            </>
          ) : (
            <Box sx={{ width: "100%" }}>
              {photos.length >= 1 ? (
                <ImageList variant="standard" cols={getCols()} gap={30}>
                  {photos?.map((photo) => (
                    <ImageListItem key={photo.imageId} className="photo-item">
                      <img
                        src={photo.image}
                        onClick={() => {
                          setImageExpand(photo);
                          setModalExpand(true);
                        }}
                      />
                      <Button
                        onClick={() => {
                          setModalDelete(true);
                          setIdDelete(photo.imageId);
                        }}
                        className="delete-photo"
                      >
                        <Trash2 />
                      </Button>
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <>Nenhuma imagem encontrada</>
              )}
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
            Adicionar foto
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
