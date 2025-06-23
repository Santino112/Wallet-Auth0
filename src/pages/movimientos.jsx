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
  Divider,
  InputAdornment
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Movimientos = () => {
  const navigate = useNavigate();
  const { username, email } = JSON.parse(localStorage.getItem("userData") || "{}");
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [aliasFiltro, setAliasFiltro] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

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

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (email && username) {
      obtenerHistorial();
    }
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    if (tx.amount === 0 && tx.description?.startsWith("Perfil actualizado:")) return false;

    const filtroAlias = aliasFiltro.toLowerCase().trim();
    const filtroFecha = fechaFiltro.trim();

    const coincideAlias =
      filtroAlias === "" ||
      tx.fromName?.toLowerCase().includes(filtroAlias) ||
      tx.toName?.toLowerCase().includes(filtroAlias) ||
      tx.fromUsername?.toLowerCase().includes(filtroAlias) ||
      tx.toUsername?.toLowerCase().includes(filtroAlias);

    const fechaTx = new Date(tx.createdAt * 1000).toISOString().slice(0, 10);
    const coincideFecha = filtroFecha === "" || fechaTx === filtroFecha;

    return coincideAlias && coincideFecha;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
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
          width: { xs: "100%", sm: "90%", md: 600, lg: 600, xl: 900 },
          backdropFilter: "blur(30px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          p: 4,
          borderRadius: 3,
          boxShadow: 6,
          color: "white",
          height: { xs: 700, sm: 700, md: 700, lg: 763, xl: 763 }
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%", color: "white", boxShadow: 6, p: 1 }}>
          <ReceiptLongIcon fontSize="large" />
          <Typography variant="h4" sx={{ fontSize: { xs: "1.2rem", md: "1.5rem", xl: "2rem" } }}>
            Lista de movimientos
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 3, md: 4, lg: 6 }} direction={{ xs: "column", lg: "row" }} alignItems="center">
          <TextField
            label="Buscar por nombre o alias"
            variant="standard"
            value={aliasFiltro}
            onChange={(e) => setAliasFiltro(e.target.value)}
            InputLabelProps={{ required: false }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchOutlinedIcon style={{ color: "white" }} />
                </InputAdornment>
              )
            }}
            fullWidth
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" }
              }
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
                "&:hover fieldset": { borderColor: "white" }
              }
            }}
          />
        </Stack>

        {errorMsg && <Typography color="error">{errorMsg}</Typography>}

        <Stack
          spacing={2}
          sx={{
            maxHeight: "700px",
            overflowY: "auto",
            height: { xs: 500, lg: 600 },
            backgroundColor: "rgba(158, 158, 158, 0.1)",
            p: 2
          }}
        >
          {paginatedTransactions.map((tx) => (
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
              <AccordionSummary expandIcon={
                <ArrowDropDownIcon
                  sx={{
                    color: '#fff',
                    backgroundColor: tx.type === 'sent' ? '#f44336' : '#4caf50'
                  }}
                />
              }>
                <Typography>
                  {tx.type === 'sent' ? (
                    <>
                      <ForwardToInboxIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
                      Enviado a {tx.toName}
                    </>
                  ) : (
                    <>
                      <CallReceivedIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 1 }} />
                      Recibido de {tx.fromName}
                    </>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1 }}>
                <Typography>Monto: ${tx.amount} Raulo coins</Typography>
                <Typography>Descripción: {tx.description}</Typography>
                <Typography>Fecha: {new Date(tx.createdAt * 1000).toLocaleString()}</Typography>
                {tx.awardedBy && <Typography>Premiado por: {tx.awardedBy}</Typography>}
                <Button
                  variant="outlined"
                  onClick={() => navigate("/comprobante", { state: tx })}
                  sx={{
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "white",
                    "&:hover": { color: "white" },
                    width: "100%",
                    mt: 1,
                    mb: 1
                  }}
                >
                  Ver recibo
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

          <Pagination
            count={Math.ceil(filteredTransactions.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            shape="rounded"
            sx={{
              m: 2,
              mx: "auto",
              display: "flex",
              justifyContent: "center"
            }}
          />
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
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
