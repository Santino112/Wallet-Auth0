import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Button,Typography, TextField } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: nombre,
      username: alias,
      email: email,
    };

    axios.post('https://raulocoin.onrender.com/api/register', data)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          navigate('/totp', { state: res.totpSetup });
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundImage: 'url(/images/Registro.png)',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
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
              }}
            >
              Registrate
            </Typography>
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
              }}
            >
              ¡Empecemos esta aventura juntos!
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
              gap: 2,
            }}
          >
            <TextField
              label="Nombre"
              variant="outlined"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              InputLabelProps={{ required: false }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
              }}
            />
            <TextField
              label="Correo electrónico"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{ required: false }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
              }}
            />
            <TextField
              label="Alias"
              variant="outlined"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              required
              InputLabelProps={{ required: false }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                width: { xs: "100%", sm: "100%", md: 250, lg: 250, xl: 255 }
              }}
            />

            <Box
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
                marginTop: "1rem",
                gap: 2,
                width: "100%",
                justifyContent: "center",
              }}
            >
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
                    md: "30%",
                    lg: "25%",
                    xl: "25%",
                  },
                  backgroundColor: "#74c69d",
                  "&:hover": {
                    backgroundColor: "#52b788"
                  }
                }}
                disableElevation
              >
                {loading ? "Cargando..." : "Registrarme"}
              </Button>
              <Button
                variant="contained"
                component="a"
                onClick={handleLogin}
                color="primary"
                sx={{
                  fontSize: "1rem",
                  height: 50,
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "30%",
                    lg: "20%",
                    xl: "20%",
                  },
                  backgroundColor: "#d8f3dc",
                  "&:hover": {
                    backgroundColor: "#b7e4c7",
                    color: "#000"
                  }
                }}
              >Volver a login
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Register;
