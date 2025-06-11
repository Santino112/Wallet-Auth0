import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [codigo, setCodigo] = useState('');
  const [showCodigo, setShowCodigo] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggleShowCodigo = () => {
    setShowCodigo((prev) => !prev);
  };

  const handleRecuperarCodigo = () => {
    navigate('/recuperacionTotp');
  };

  const handleCuentaNueva = () => {
    navigate('/Register');
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
        localStorage.setItem("datosLogin", JSON.stringify({
          name: res.user.name,
          username: res.user.username,
          balance: res.user.balance,
          token: data.totpToken
        }));
        navigate('/account');
      } else {
        alert('Credenciales incorrectas');
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
        alert('Error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: 'url(/images/inicio.png)',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <Stack
        spacing={1}
        alignItems="center"
        flexDirection="column"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "35%",
            lg: "35%",
            xl: "40%",
          },
          backgroundColor: "#f9f9f9",
          boxShadow: 4,
          padding: {
            xs: "2rem",
            sm: "2rem",
            md: "2rem",
            lg: "2rem",
            xl: "2rem"
          }
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "2.5rem",
                sm: "2rem",
                md: "2rem",
                lg: "2rem",
                xl: "2.8rem",
              },
              textAlign: "center",
              color: "black",
              marginBottom: "1.3rem"
            }}
          >
            Iniciar sesión
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.2rem",
                lg: "1.1rem",
                xl: "1.5rem",
              },
              textAlign: "center",
              color: "black"
            }}
          >
            ¡Bienvenido de nuevo, te hemos echado de menos!
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
            maxWidth: 255,
            width: "100%"
          }}
        >
          <TextField
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputLabelProps={{ required: false }}
            sx={{
              input: { color: "black" },
              label: { color: "black" },
              "& label.Mui-focused": { color: "black" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "black"
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "black"
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black"
              },
              width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
            }}
          />
          <TextField
            label="Alias"
            variant="standard"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
            InputLabelProps={{ required: false }}
            sx={{
              input: { color: "black" },
              label: { color: "black" },
              "& label.Mui-focused": { color: "black" },
              "& .MuiInput-underline:before": {
                borderBottomColor: "black"
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "black"
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black"
              },
              width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
            }}
          />
          <TextField
            label="Código"
            variant="standard"
            type={showCodigo ? 'number' : 'password'}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
            InputLabelProps={{ required: false }}
            sx={{
              input: { color: 'black' },
              label: { color: 'black' },
              '& label.Mui-focused': { color: 'black' },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'black',
              },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: 'black',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
              width: { xs: '100%', sm: '100%', md: 250, lg: 250, xl: 255 },
              marginBottom: "1rem"
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleShowCodigo}
                    edge="end"
                    sx={{
                      color: "#000", // ahora el ícono será negro
                      "&:focus": { outline: "none", boxShadow: "none" },
                      "&:focus-visible": { outline: "none", boxShadow: "none" },
                    }}
                  >
                    {showCodigo ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            sx={{
              fontSize: "1rem",
              height: 50,
              width: {
                xs: "100%",
                sm: "100%",
                md: 250,
                lg: 250,
                xl: 255
              },
              backgroundColor: "#74c69d",
              "&:hover": {
                backgroundColor: "#52b788"
              }
            }}
            disableElevation
          >
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
          <Button
            component="a"
            onClick={handleCuentaNueva}
            color="primary"
            sx={{
              fontSize: "1rem",
              height: 25,
              width: {
                xs: "100%",
                sm: "100%",
                md: 250,
                lg: 250,
                xl: 255
              },
              color: "black"
            }}
          >Nueva cuenta
          </Button>
          <Button
            component="a"
            onClick={handleRecuperarCodigo}
            color="primary"
            sx={{
              fontSize: "1rem",
              height: 25,
              width: {
                xs: "100%",
                sm: "100%",
                md: 250,
                lg: 250,
                xl: 255
              },
              color: "black"
            }}
          >Recuperar código
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
