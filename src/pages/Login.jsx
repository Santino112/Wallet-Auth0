import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography, InputAdornment, IconButton, Alert, Snackbar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth0 } from '@auth0/auth0-react';

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

  //Definicion de dependencias de Auth0
  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    getIdTokenClaims,
    loginWithRedirect,
  } = useAuth0();

  //Llamada al endpoint de autenticación
  const auth0Authenticate = async (data) => {
    try {
      const res = await axios.post(`https://raulocoin.onrender.com/api/auth0/authenticate`, data)
      const response = res.data;

      if (response.success) {
        localStorage.setItem("datosLogin", JSON.stringify({
          name: response.user.name,
          username: response.user.username,
        }));
        navigate('/verify-account');
        return response;
      }
    } catch {
      console.log("Error en la autenticación");
      return null;
    }
  };

  //Funcion de login
  const handleLoginClick = () => {
    loginWithRedirect({
      authorizationParams: {
        prompt: 'login',
      },
    });
  };

  useEffect(() => {
    console.log("🟡 useEffect disparado");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
    const fetchTokens = async () => {
      try {
        if (!isAuthenticated || !user) return;

        const accessToken = await getAccessTokenSilently();
        const idTokenClaims = await getIdTokenClaims();

        const data = {
          auth0_payload: {
            iss: idTokenClaims.iss,
            sub: idTokenClaims.sub,
            aud: idTokenClaims.aud,
            iat: idTokenClaims.iat,
            exp: idTokenClaims.exp,
            email: user.email,
            name: user.name,
          },
          auth0_tokens: {
            access_token: accessToken,
            id_token: idTokenClaims.__raw,
          },
        };

        const res = await auth0Authenticate(data);
        console.log("✅ Respuesta del backend:", res);

        localStorage.setItem('userData', JSON.stringify({
          name: res.user.name,
          username: res.user.username,
          email: res.user.email,
          balance: res.user.balance,
          isVerified: res.user.isVerified,
          totpVerified: res.user.totpVerified,
          needsTotpSetup: res.needsTotpSetup,
          existingUser: res.existingUser
        }));
      } catch (error) {
        console.error("Error en el login:", error);
      }
    };
    fetchTokens();
  }, [isAuthenticated, navigate, getAccessTokenSilently, getIdTokenClaims, user]);

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
        backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7)), url(/images/fondo2.jpg)',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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
        <Box></Box>
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
              type="primary"
              variant="contained"
              disabled={loading}
              onClick={handleLoginClick}
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
