import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography } from '@mui/material';

const Totp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totpSetup = location.state;

  const handleLogin = () => {
    navigate('/Login');
  };

  if (!totpSetup) {
    message.warning('No hay configuración TOTP. Regístrate primero.');
    navigate('/');
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        height: "100vh",
        minWidth: "100vw",
        backgroundImage: 'url(/images/Inicio.png)',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden"
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "auto",
            lg: "auto",
            xl: "auto",
          },
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(52, 0, 129, 0.23)",
          boxShadow: "0 1px 12px rgba(0, 0, 0, 0)",
          padding: "2rem"
        }}>
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
          }}
        >Autenticación</Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1rem",
              md: "1.2rem",
              lg: "1.5rem",
              xl: "1.5rem",
            },
            textAlign: "center",
            wordBreak: "break-word"
          }}
        >
          Escanea este código QR con tu aplicación de autenticación o copia el texto de abajo
        </Typography>

        <img className='qr-img' src={totpSetup.qrCodeUrl} alt="TOTP QR Code" style={{ maxWidth: 300 }} />

        <Typography
          variant='body1'
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1rem",
              md: "1.2rem",
              lg: "1.5rem",
              xl: "1.5rem",
            },
            textAlign: "center",
          }}
          className="auth-code"
          onClick={() => navigator.clipboard.writeText(totpSetup.manualSetupCode)}
          title="Haz clic para copiar"
        >
          {totpSetup.manualSetupCode}
        </Typography>
        <Button
          type="primary"
          variant="contained"
          component="a"
          onClick={handleLogin}
          color="primary"
          sx={{
            fontSize: "1rem",
            height: 50,
            width: {
              xs: "50%",
              sm: "60%",
              md: "30%",
              lg: "30%",
              xl: "25%",
            },
            backgroundColor: "#d8f3dc",
            "&:hover": {
              backgroundColor: "#b7e4c7",
              color: "#000"
            }
          }}>
          Volver al login
        </Button>
      </Stack>
    </Box>
  );
};

export default Totp;
