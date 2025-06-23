import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, Menu, MenuItem, ListItemIcon, Avatar, Divider, Card, CardContent } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Account = () => {
  const { name, username, email, balance } = JSON.parse(localStorage.getItem("userData"))
  const [codigo, setCodigo] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const transferir = () => {
    navigate('/transfer')
  };

  const perfilUsuario = () => {
    navigate('/perfilUsuario')
  };

  const movimientos = () => {
    navigate('/movimientos')
  };


  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const obtenerHistorial = async () => {
    try {
      const response = await axios.post("https://raulocoin.onrender.com/api/auth0/transactions", {
        email
      });
      const res = response.data;
      if (res.success) {
        setTransactions(res.transactions);
      } else {
        setErrorMsg(res.message || "No se pudo obtener el historial.");
      }
    } catch (error) {
      console.error("Error al obtener historial:", error);
      setErrorMsg("Error al conectarse con el servidor.");
    }
  };

  useEffect(() => {
    obtenerHistorial();
  }, [username, codigo]);

  return (
    <Box component="section" sx={{
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-around"
        alignItems="center"
        spacing={3}
        sx={{ width: "100%", p: 3 }}
      >
        <Stack
          direction="row"
          sx={{
            width: { xs: "100%", sm: "100%", md: 500, lg: 500, xl: 500 },
            backgroundColor: "#212121",
            p: 3,
            borderRadius: 2,
            justifyContent: "center",
            height: {
              xs: "auto",
              sm: "auto",
              md: 500,
              lg: 500,
              xl: 500
            },
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            boxShadow: 6,
          }}
        >
          <Stack spacing={4} direction="column" sx={{ width: "100%", color: "white", fontFamily: "Inter" }}>
            <Stack spacing={4} direction="row" justifyContent="space-between" sx={{ width: "100%", color: "white", boxShadow: 6, p: 1 }}>
              <Avatar alt="Travis Howard" src="/images/ImagenPerfil.jpeg" sx={{ width: 50, height: 50 }} />
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
                  perfilUsuario();
                }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  handleClose();
                  logout({ returnTo: window.location.origin + "/login" });
                }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </Stack>
            <Card sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 3,
              backdropFilter: "blur(30px)",
              boxShadow: 3,
              height: {
                xs: "100%",
                sm: "100%",
                md: 500,
                lg: 500,
                xl: 500
              },
              width: "100%",
              px: 5,
              py: 2
            }}>
              <CardContent sx={{width: "100%"}}>
                <Typography variant="h5" sx={{
                  fontWeight: 600,
                  mb: 3,
                  fontSize: {
                    xs: "1.3rem",
                    sm: "1.3rem",
                    md: "1.6rem",
                    lg: "1.6rem",
                    xl: "1.6rem"
                  }
                }}>
                  Hola {name}, bienvenido de vuelta! 😊
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.2rem",
                    md: "1.35rem",
                    lg: "1.35rem",
                    xl: "1.35rem"
                  }
                  }}>
                  <strong>Tú saldo actual:</strong> ${balance} raulo coins
                </Typography>
                <Typography variant="body1" sx={{
                   fontSize: {
                    xs: "1.2rem",
                    sm: "1.2rem",
                    md: "1.35rem",
                    lg: "1.35rem",
                    xl: "1.35rem"
                  }
                }}>
                  <strong>Alias de transferencia:</strong> {username}
                </Typography>
              </CardContent>
            </Card>
            <Button variant="contained" onClick={transferir} sx={{
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "white",
                  backgroundColor: "#2485e9",
                  "&:hover": {
                    backgroundColor: "#1f73ca",
                    color: "white",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#1f73ca",
                    color: "white",
                  },
                  boxShadow: 3,
                  width: "100%"

                }} disableElevation>
                  Transferir
                </Button>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          direction="column"
          sx={{
            width: { xs: "100%", sm: "100%", md: 550, lg: 550, xl: 700 },
            height: {
              xs: 500,
              sm: 500,
              md: 500,
              lg: 500,
              xl: 500
            },
            overflowY: "auto",
            backgroundColor: "#121212",
            p: 3,
            borderRadius: 2,
            color: "white",
            backdropFilter: "blur(30px)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            boxShadow: 6,
            marginBottom: { xs: "1rem", sm: "1rem" }
          }}
        >
          <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }} justifyContent="space-between" sx={{ width: "100%", color: "white", boxShadow: 6, p: 1 }}>
            <Stack spacing={1} direction={{ xs: "row", sm: "row", md: "row", lg: "row", xl: "row" }}>
              <ReceiptLongIcon fontSize="large" />
              <Typography variant="Body1" sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.5rem",
                  md: "1.5rem",
                  lg: "1.5rem",
                  xl: "1.6rem"
                }
              }}>Últimos movimientos</Typography>
            </Stack>
            <Button variant="outlined" type="submit" onClick={movimientos} sx={{
              cursor: "pointer",
              fontSize: "1rem",
              color: "white",
              "&:hover": {
                color: "white"
              }
            }} disableElevation>
              Ver todos
            </Button>
          </Stack>
          {[...transactions]
            .filter ((tx) => {
              if (tx.amount === 0 && tx.description?.startsWith("Perfil actualizado:")) {
                return false;
              }
              return true;
            })
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 6)
            .map((tx) => (
              <Accordion
                key={tx.id}
                sx={{
                  backdropFilter: "blur(5px)",
                  backgroundColor: "rgba(34, 2, 81, 0)",
                  boxShadow: "0 1px 12px rgba(0, 0, 0, 0)",
                  color: '#fff',
                  '&.Mui-expanded': { margin: 0 },
                  '& .MuiAccordionSummary-root:focus-visible': { outline: 'none' }
                }}
              >
                <AccordionSummary expandIcon={<ArrowDropDownIcon sx={{ color: '#fff', backgroundColor: tx.type === 'sent' ? '#f44336' : '#4caf50' }} />}>
                  <Typography>
                    {tx.type === 'sent' ?
                      <>
                        <ForwardToInboxIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} /> Enviado a {tx.toName}
                      </>
                      :
                      <>
                        <CallReceivedIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} /> Recibido de {tx.fromName}
                      </>
                    }
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                  <Typography>Monto: ${tx.amount} Raulo coins</Typography>
                  <Typography>Descripción: {tx.description}</Typography>
                  <Typography>Fecha: {new Date(tx.createdAt * 1000).toLocaleString()}</Typography>
                  {tx.awardedBy && <Typography>Premiado por: {tx.awardedBy}</Typography>}
                  <Button variant="outlined" onClick={() => navigate("/comprobante", { state: tx })} sx={{
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "white",
                    "&:hover": {
                      color: "white"
                    },
                    width: { xs: "100%", sm: "100%" },
                    mt: 1
                  }} >
                    Ver recibo
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Account;
