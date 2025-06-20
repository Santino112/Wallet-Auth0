import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Button,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";


const Movimientos = () => {
  const navigate = useNavigate();
  const { username, email } = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [aliasFiltro, setAliasFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");

  const obtenerHistorial = async () => {
    try {
      const response = await axios.post(
        "https://raulocoin.onrender.com/api/auth0/transactions",
        { username, email }
      );
      const res = response.data;
      if (res.success) {
        setTransactions(res.transactions);
        console.log("Respuesta del servidor:", res);
      } else {
        setErrorMsg(res.message || "No se pudo obtener el historial.");
      }
    } catch (error) {
      console.error("Error al obtener historial:", error);
      setErrorMsg("Error al conectarse con el servidor.");
    }
  };

  const Account = () => {
    navigate("/Account");
  };

  useEffect(() => {
    if (email && username) {
      obtenerHistorial();
    }
  }, []);

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage:
          "linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7)), url(/images/fondo2.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2
      }}
    >
      <Stack
        spacing={3}
        flexDirection="column"
        alignContent="center"
        justifyContent="Center"
        sx={{
          width: { xs: "100%", sm: "90%", md: 600 },
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          p: 4,
          borderRadius: 3,
          boxShadow: 6,
          color: "white",
          height: {
              xs: 500,
              sm: 500,
              md: 500,
              lg: 600,
              xl: 600
          },
        }}
      >

        <Stack direction="row" alignItems="center" spacing={1}>
          <ReceiptLongIcon fontSize="large" />
          <Typography variant="h4" sx={{ fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.5rem", lg: "1.5rem", xl: "1.5rem" } }}>Lista de movimientos</Typography>
        </Stack>

        <TextField
          label="Buscar por alias o nombre"
          variant="standard"
          value={aliasFiltro}
          onChange={(e) => setAliasFiltro(e.target.value)}
          InputLabelProps={{ required: false }}
          fullWidth
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />

        <TextField
          label="Filtrar por fecha"
          variant="standard"
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
            },
          }}
        />

        {errorMsg && <Typography color="error">{errorMsg}</Typography>}

        <Stack spacing={2} sx={{ 
          maxHeight: "400px", 
          overflowY: "auto",
          height: {
              xs: 500,
              sm: 500,
              md: 500,
              lg: 600,
              xl: 600
          },
          }}>
          {transactions
            .filter((tx) => {
              const filtroAlias = aliasFiltro.toLowerCase().trim();
              const filtroFecha = fechaFiltro.trim(); // formato YYYY-MM-DD

              const coincideAlias =
                filtroAlias === "" ||
                tx.fromName?.toLowerCase().includes(filtroAlias) ||
                tx.toName?.toLowerCase().includes(filtroAlias) ||
                tx.fromUsername?.toLowerCase().includes(filtroAlias) ||
                tx.toUsername?.toLowerCase().includes(filtroAlias);

              const fechaTx = new Date(tx.createdAt * 1000)
                .toISOString()
                .slice(0, 10);

              const coincideFecha =
                filtroFecha === "" || fechaTx === filtroFecha;

              return coincideAlias && coincideFecha;
            })
            .map((tx) => {
              return (
                <Accordion
                  key={tx.id}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    boxShadow: "none",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: "#fff",
                          backgroundColor:
                            tx.type === "sent" ? "#f44336" : "#4caf50",
                          borderRadius: "50%",
                        }}
                      />
                    }
                  >
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        fontWeight: 500,
                        "&:hover": {
                          color: "#90caf9",
                        },
                      }}
                    >
                      {tx.type === "sent"
                        ? `Enviado a ${tx.toName}`
                        : `Recibido de ${tx.fromName}`}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Monto: {tx.amount} R$</Typography>
                    <Typography>Descripción: {tx.description}</Typography>
                    <Typography>
                      Fecha: {new Date(tx.createdAt * 1000).toLocaleString()}
                    </Typography>
                    {tx.awardedBy && (
                      <Typography>Premiado por: {tx.awardedBy}</Typography>
                    )}
                  </AccordionDetails>
                </Accordion>

              );
            })}
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2}}
        >
          <Button
            variant="outlined"
            onClick={Account}
            sx={{
              fontSize: "1rem",
              width: { xs: 290, sm: 290, md: 360, lg: 400, xl: 370 },
              color: "white",
              "&:hover": {
                color: "white"
              }
            }}
          >
            Volver
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Movimientos;
