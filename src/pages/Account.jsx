import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Account = () => {
  const { name, username, balance } = JSON.parse(localStorage.getItem("datosLogin"))
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const transferir = () => {
    navigate('/transfer')
  }

  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const obtenerHistorial = async () => {
    try {
      const response = await axios.post("https://raulocoin.onrender.com/api/transactions", {
        username,
        totpToken: codigo
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
      backgroundImage: 'url(/images/Cuenta.png)',
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
            width: { xs: "100%", sm: "100%", md: 300, lg: 400, xl: 500 },
            backgroundColor: "#212121",
            p: 3,
            borderRadius: 2,
            height: "auto",
            justifyContent: "center",
            height: 500,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(52, 0, 129, 0.23)",
            boxShadow: "0 1px 12px rgba(0, 0, 0, 0)"
          }}
        >
          <Stack spacing={4} direction="column" sx={{ width: "100%", color: "white" }}>
            <Typography variant="body1" sx={{
              fontSize: {
                xs: "1.7rem",
                sm: "1.6rem",
                md: "1.6rem",
                lg: "2rem",
                xl: "2rem"
              }
            }}>Hola {name}, bienvenido de vuelta! <i className="fa-regular fa-face-smile"></i></Typography>
            <Typography variant="h4" sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "1.5rem",
                xl: "1.6rem"
              }
            }}>Tu saldo actual es de R$ {balance}</Typography>
            <Typography variant="body1" sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "1.5rem",
                md: "1.5rem",
                lg: "1.5rem",
                xl: "1.6rem"
              }
            }}>Tu alias de transferencia es: {username}</Typography>
            <Button variant="contained" onClick={transferir} sx={{
              cursor: "pointer",
              fontSize: "1rem",
              backgroundColor: "#74c69d",
              "&:hover": {
                backgroundColor: "#52b788"
              }
            }} disableElevation>
              Transferir
            </Button>
            <Button variant="contained" onClick={handleLogout} sx={{
              cursor: "pointer",
              fontSize: "1rem",
              backgroundColor: "#d8f3dc",
              "&:hover": {
                backgroundColor: "#b7e4c7"
              }
            }} disableElevation>
              <LogoutIcon fontSize="medium" sx={{ marginRight: "0.3rem" }} />Logout
            </Button>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          direction="column"
          sx={{
            width: { xs: "100%", sm: "100%", md: 400, lg: 500, xl: 600 },
            height: 500,
            overflowY: "auto",
            backgroundColor: "#121212",
            p: 3,
            borderRadius: 2,
            color: "white",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(52, 0, 129, 0.23)",
            boxShadow: "0 1px 12px rgba(0, 0, 0, 0)",
            marginBottom: { xs: "1rem", sm: "1rem" }
          }}
        >
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              obtenerHistorial();
            }}
            sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 2 }}
          >
            <TextField
              label="Código TOTP"
              variant="outlined"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              InputLabelProps={{ required: false }}
              sx={{ flexGrow: 1, width: "100px", color: "white" }}
            />
            <Button variant="contained" type="submit" sx={{
              cursor: "pointer",
              fontSize: "1rem",
              backgroundColor: "#74c69d",
              "&:hover": {
                backgroundColor: "#52b788"
              }
            }} disableElevation>
              Ver historial
            </Button>
          </Box>

          {transactions.map((tx) => (
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
                  {tx.type === 'sent' ? `Enviado a ${tx.toName}` : `Recibido de ${tx.fromName}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Monto: {tx.amount} R$</Typography>
                <Typography>Descripción: {tx.description}</Typography>
                <Typography>Fecha: {new Date(tx.createdAt * 1000).toLocaleString()}</Typography>
                {tx.awardedBy && <Typography>Premiado por: {tx.awardedBy}</Typography>}
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Account;
