import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack, Typography, TextField, Menu, MenuItem, Snackbar, AlertTitle, Alert, ListItemIcon, Avatar, Divider, Card, CardContent, InputAdornment } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

const perfilUsuario = () => {
  const { email } = JSON.parse(localStorage.getItem("userData"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("");
  const [tocado, setTocado] = useState(false);
  const navigate = useNavigate();
  const [severity, setSeverity] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");
  const [openn, setOpenn] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cuenta = () => {
    navigate('/Account')
  };

  const error = (tocado && name.trim() === "") || name.length > 100;
  const errorUsername = (tocado && username.trim() === "") || (username.length > 0 && (username.length < 3 || username.length > 30));

  const helperText = name.length > 100 ? "Máximo 100 caracteres" : (tocado && name.trim() === "" ? "Este campo no puede estar vacio" : "");
  const helperTextUsername = (tocado && username.trim() === "")
    ? "Este campo no puede estar vacío"
    : (username.length < 3 || username.length > 30
      ? "Debe tener entre 3 y 30 caracteres"
      : "");

  const datosDeBalance = async () => {
    try {
      const response = await axios.post("https://raulocoin.onrender.com/api/auth0/balance", { email })
      const respuesta = response.data;

      if (respuesta.success) {
        setName(respuesta.user.name);
        setUsername(respuesta.user.username);
        setBalance(respuesta.user.balance);
      }
    } catch (error) {
      console.log("Error al obtener los datos: ", error)
    }
  };

  useEffect(() => {
    datosDeBalance();
  }, []);

  const editarPerfil = async () => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log("Datos enviados:", { email, name, username })
      const response = await axios.post("https://raulocoin.onrender.com/api/auth0/edit-profile", {
        email,
        name,
        username
      });

      console.log("Respuesta de la API:", response);

      const datosActuales = JSON.parse(localStorage.getItem("userData")) || {};

      const nuevosDatos = {
        ...datosActuales,
        name: name,
        username: username
      };

      localStorage.setItem("userData", JSON.stringify(nuevosDatos));
      setName(name);
      setUsername(username);

      if (response.data.message === "Perfil actualizado correctamente") {
        setTitulo("Éxito");
        setMensaje(response.data.message);
        setSeverity("success");
      } else if (response.data.message === "No se detectaron cambios en el perfil") {
        setTitulo("Sin cambios");
        setMensaje(response.data.message);
        setSeverity("info");
      } else {
        setTitulo("Error");
        setMensaje("Error en la actualización.");
        setSeverity("error");
      }
    } catch (error) {
      console.error("Error al editar perfil:", error);
      setTitulo("Error");
      setMensaje("Error en la actualización");
      setSeverity("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" sx={{
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 2
    }}>
      <Snackbar
        open={Boolean(mensaje)}
        autoHideDuration={5000}
        onClose={() => setMensaje(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: "2rem" }}
      >
        {mensaje && (
          <Alert variant="filled" severity={severity} sx={{ color: "#ffffff", width: { xs: "100%", sm: "100%", md: 450, lg: 450, xl: 450 }, height: 95 }}>
            <AlertTitle>{titulo}</AlertTitle>
            {mensaje}
          </Alert>
        )}
      </Snackbar>
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "row", xl: "row" }}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: 1000,
            lg: 1250,
            xl: 1500
          },
          height: { xs: "auto", sm: "auto", md: 550, lg: 600, xl: 763 },
          p: 3,
        }}
      >
        <Card sx={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          backdropFilter: "blur(30px)",
          boxShadow: 6,
          height: "auto",
          overflow: {
            md: "auto",
            lg: "auto"
          },
          width: "100%",
          height: { xs: "auto", sm: "auto", md: 550, lg: 600, xl: 763 },
          p: 3
        }}>
          <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%", color: "white", boxShadow: 6, p: 2, mb: 3 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              fontSize: {
                xs: "1rem",
                sm: "1.3rem",
                md: "1.6rem",
                lg: "1.6rem",
                xl: "1.6rem"
              },
              verticalAlign: "middle",
              ml: 1
            }}>
              Perfil de usuario
            </Typography>
            <Button id="basic-button" onClick={handleClick} sx={{
              cursor: "pointer",
              fontSize: "1rem",
              color: "white",
              "&:hover": {
                color: "white"
              },
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            }} disableElevation>
              <MenuIcon fontSize="large" />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem onClick={() => {
                handleClose();
                cuenta();
              }}>
                <ListItemIcon>
                  <AccountBoxOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Cuenta
              </MenuItem>
            </Menu>
          </Stack>
          <CardContent sx={{ width: "100%" }}>
            <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="space-between" spacing={3} sx={{ mb: 3 }}>
              <Avatar alt="Travis Howard" src="/images/ImagenPerfil.jpeg" sx={{ width: { xs: 50, sm: 50, md: 65, lg: 65, xl: 75 }, height: { xs: 50, sm: 50, md: 65, lg: 65, xl: 75 } }} />
              <Button variant="outlined" sx={{
                cursor: "pointer",
                fontSize: "1rem",
                color: "white",
                "&:hover": {
                  color: "white"
                },
                width: { xs: "100%", sm: "100%", md: 300, lg: 250, xl: 250 },
              }} >
                Cambiar
              </Button>
            </Stack>
            <Divider />
            <Box
              component="form"
              onSubmit={editarPerfil}
            >
              <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="space-between" spacing={3} sx={{ mt: 3, mb: 4 }}>
                <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="center">
                  <Typography variant="body1" value={name} sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.2rem",
                      md: "1.35rem",
                      lg: "1.35rem",
                      xl: "1.35rem"
                    },
                    mr: 3,
                    mb: {
                      xs: 1,
                      sm: 1,
                      md: 0,
                      lg: 0,
                      xl: 0
                    },
                    textAlign: "center"
                  }}>
                    <strong>Editar</strong> nombre del usuario
                  </Typography>
                  <TextField
                    label="Nombre"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTocado(true)}
                    error={error}
                    helperText={helperText}
                    InputLabelProps={{ required: false }}
                    fullWidth
                    sx={{ width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
                  />
                </Stack>
              </Stack>
              <Divider />
              <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="space-between" spacing={3} sx={{ mt: 3, mb: 4 }}>
                <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="center">
                  <Typography variant="body1" value={name} sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.2rem",
                      md: "1.35rem",
                      lg: "1.35rem",
                      xl: "1.35rem"
                    },
                    mr: 3,
                    textAlign: "center"
                  }}>
                    <strong>Editar</strong> alias del usuario
                  </Typography>
                  <TextField
                    label="Alias"
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => setTocado(true)}
                    error={errorUsername}
                    helperText={helperTextUsername}
                    InputLabelProps={{ required: false }}
                    fullWidth
                    sx={{ width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
                  />
                </Stack>
              </Stack>
              <Divider />
              <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="space-between" spacing={3} sx={{ mt: 3, mb: 4 }}>
                <Stack direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} alignItems="center" justifyContent="center">
                  <Typography variant="body1" value={name} sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.2rem",
                      md: "1.35rem",
                      lg: "1.35rem",
                      xl: "1.35rem"
                    },
                    mr: 3,
                    textAlign: "center"
                  }}>
                    Email del usuario
                  </Typography>
                  <TextField
                    label="Email"
                    disabled
                    variant="standard"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                    InputLabelProps={{ required: false }}
                    fullWidth
                    sx={{ width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
                  />
                </Stack>
              </Stack>
              <Divider />
              <Stack
                direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                sx={{ mt: 3, width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{
                    fontSize: "1rem",
                    width: "100%",
                    backgroundColor: "#2485e9",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#1f73ca",
                      color: "white",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#1f73ca",
                      color: "white",
                    },
                    width: { xs: 290, sm: 290, md: 270, lg: 250, xl: 250 },
                    boxShadow: 3,
                    mt: "0.8rem"
                  }}
                >
                  {loading ? "Cargando..." : "Guardar"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );

};

export default perfilUsuario;