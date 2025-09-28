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
  Link,
} from "@mui/material";

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

  useEffect(() => {
    const existingAlbuns = localStorage.getItem(albunsKey);
    const albuns = existingAlbuns ? JSON.parse(existingAlbuns) : [];
    const albumFound = albuns.find(
      (album) => album.id === parseInt(albumId, 10)
    );

    setAlbum(albumFound);
  }, [albumId]);

  useEffect (() => {
    const existingPhotos = localStorage.getItem(photosKey);
    const photos = existingPhotos ? JSON.parse(existingPhotos) : [];
    const photosFound = photos.filter(item => item.albumId === Number(albumId));
    setPhotos(photosFound)
  },[albumId]);

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

  const photosData = [
    {
      id: 1,
      fileName: "1.jpg",
      sizeInBytes: 261120, // 255kb * 1024
      acquisitionDate: new Date("2021-04-12T10:24:00"),
      dominantColor: "#ccbbff",
    },
    {
      id: 2,
      fileName: "2.png",
      sizeInBytes: 96,
      acquisitionDate: new Date("2020-03-14T15:00:00"),
      dominantColor: "#42fbcc",
    },
  ];

  const formatBytes = (bytes, decimals = 0) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const formatDate = (date) => {
    return date
      .toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");
  };

  const getCols = () => {
    if (isMobile) {
      return 2;
    }
    if (isTablet) {
      return 3;
    }
    return 4;
  };

  return (
    <>
      <ModalNewPhotos
        open={modalNewPhoto}
        setOpen={setModalNewPhoto}
        setPhotos={setPhotos}
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
                    {photosData.map((photo) => (
                      <TableRow key={photo.id}>
                        <TableCell>{photo.fileName}</TableCell>
                        <TableCell>{formatBytes(photo.sizeInBytes)}</TableCell>
                        <TableCell>
                          {formatDate(photo.acquisitionDate)}
                        </TableCell>
                        <TableCell>
                          <Box className="color-cell-content">
                            <Box
                              className="color-swatch"
                              style={{ backgroundColor: photo.dominantColor }}
                            />
                            <Typography variant="body2">
                              {photo.dominantColor}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <footer className="album-actions">
                <Button variant="contained" className="btn-delete">
                  Excluir álbum
                </Button>
              </footer>
            </>
          ) : (
            <Box sx={{ width: "100%" }}>
              <ImageList variant="standard" cols={getCols()} gap={30}>
                {photos?.map((photo) => (
                  <ImageListItem key={photo.id} className="photo-item">
                    {/* <div className="photo-placeholder" /> */}
                    <img src={photo.image}/>
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
