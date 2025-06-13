import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography, InputAdornment, IconButton, Alert, Snackbar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [showCodigo, setShowCodigo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleToggleShowCodigo = () => {
    setShowCodigo((prev) => !prev);
  };

  const handleRecuperarCodigo = () => {
    navigate('/recuperacionTotp');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username: alias,
      totpToken: codigo,
    };

    try {
      const response = await axios.post('https://raulocoin.onrender.com/api/user-details', data);
      const res = response.data;

      if (res.success && res.user) {
        setMensaje("Datos ingresados correctos");
        setSeverity("success");
        setTimeout(() => {
          setMensaje('');
          setOpen(true);
          navigate('/account');
        }, 2000);
        localStorage.setItem("datosLogin", JSON.stringify({
          name: res.user.name,
          username: res.user.username,
          balance: res.user.balance,
          token: data.totpToken
        }));

      } else {
        setMensaje("Error en los datos ingresados");
        setSeverity("error");
        setTimeout(() => {
          setMensaje('');
        }, 5000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.message === "Debes completar la verificación TOTP para acceder a los detalles del usuario"
      ) {
        navigate('/verify-account', {
          state: { alias },
        });
      } else {
        setMensaje("Error en los datos ingresados");
        setSeverity("error");
        setTimeout(() => {
          setMensaje('');
        }, 3000);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setAlias("");
      setCodigo("");
    }
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row"
        },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: 'url(/images/fondo2.jpg)',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row"
        },
        justifyContent: "center",
        padding: 5,
        marginBottom: {
          xs: "1rem",
          sm: "1rem"
        }
      }}>
        <Box
          component="img"
          alt="RauloCoinImage"
          src={"/images/raulo.png"}
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "35%",
              lg: "40%",
              xl: "40%",
            },
            backgroundColor: "#f9f9f9",
            boxShadow: 6,
          }}
        >
        </Box>
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{
            position: "relative",
            width: {
              xs: "100%",
              sm: "100%",
              md: "35%",
              lg: "35%",
              xl: "35%",
            },
            boxShadow: 6,
            padding: {
              xs: "2rem",
              sm: "2rem",
              md: "2rem",
              lg: "2rem",
              xl: "2rem"
            },
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(255, 255, 255, 0.10)",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2rem",
                  md: "2rem",
                  lg: "2rem",
                  xl: "2.8rem",
                },
                textAlign: "center",
                color: "white",
              }}
            >
              Iniciar sesión
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1rem",
                  md: "1.2rem",
                  lg: "1.1rem",
                  xl: "1.5rem",
                },
                textAlign: "center",
                color: "white",
                marginBottom: "1.1rem"
              }}
            >
              ¡Bienvenido de vuelta Santino!
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              },
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 3,
              maxWidth: 280,
              width: "100%"
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                fontSize: "1rem",
                height: 50,
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: 250,
                  lg: 250,
                  xl: 280
                },
                color: "white",
                backgroundColor: "#2485e9",
                "&:hover": {
                  backgroundColor: "#1f73ca"
                },
                "&.Mui-disabled": {
                  backgroundColor: "#1f73ca",
                  color: "white",
                  opacity: 6
                }
              }}
              disableElevation
            >
              {loading ? "Cargando..." : (
                <>
                  <LoginIcon style={{ color: "white", marginRight: "0.7rem" }} />
                  Ingresar
                </>
              )}
            </Button>
            <Button
              component="a"
              variant="outlined"
              onClick={handleRecuperarCodigo}
              color="primary"
              sx={{
                fontSize: "1rem",
                height: 50,
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: 250,
                  lg: 250,
                  xl: 280
                },
                color: "white",
                "&:hover": {
                  color: "white"
                },
              }}
            >Recuperar código
            </Button>
            <Snackbar
              open={Boolean(mensaje)}
              autoHideDuration={4000}
              onClose={() => setMensaje(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={() => setMensaje(null)}
                variant="filled"
                severity={severity}
                sx={{
                  color: "#ffff",
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: 300,
                    lg: 300,
                    xl: 280
                  }
                }}
              >
                {mensaje}
              </Alert>
            </Snackbar>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
