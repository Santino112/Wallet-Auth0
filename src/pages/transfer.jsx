import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Stack, Box, Button, TextField, Typography, Autocomplete, Alert, Modal, InputAdornment, IconButton, textFieldClasses } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaidIcon from '@mui/icons-material/Paid';
import InfoIcon from '@mui/icons-material/Info';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Transferencia = (e) => {
    const [loading, setLoading] = useState(false);
    const [alias, setAlias] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [detalle, setDetalle] = useState("");
    const [codigo, setCodigo] = useState("");
    const [showCodigo, setShowCodigo] = useState(false);
    const [severity, setSeverity] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const [fechaTransferencia, setFechaTransferencia] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [transferData, setTransferData] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const AliasUsuarios = ["alejo.daloia", "barbimol", "SamirFrascarelli.alias", "tobias.rc.alias", "Fransay.alias", "misaSSJ", "FabriRuma912", "anto.p", "Agus", "guada", "jogani", "virpedraza47", "Loki", "lupigliacampi", "maxibergese", "facundogrosso", "sqlenjoyer.alias", "santiagolazos", "otakuemo", "jgp.raulo", "dam", "JulietaGonella.alias"];


    const { name, username } = JSON.parse(
        localStorage.getItem("userData")
    );

    const handleToggleShowCodigo = () => {
        setShowCodigo((prev) => !prev);
    };

    const Account = () => {
        navigate("/Account");
    };

    const transferencia = async (e) => {
        e.preventDefault();
        setLoading(true);

        const datosVerify = {
            username,
            totpToken: codigo
        };

        try {
            const response = await axios.post("https://raulocoin.onrender.com/api/verify-totp", datosVerify);
            const res = response.data;

            if (res.success) {
                const datosTransferencia = {
                    fromUsername: username,
                    toUsername: alias,
                    amount: cantidad,
                    description: detalle,
                    operationToken: datosVerify.totpToken
                };

                try {
                    const transferResponse = await axios.post("https://raulocoin.onrender.com/api/transfer", datosTransferencia);
                    const transferRes = transferResponse.data;

                    if (transferRes.success) {
                        setMensaje(transferRes.message);
                        setTransferData({
                            username,
                            alias,
                            cantidad,
                            detalle
                        });
                        setFechaTransferencia(new Date());
                        setSeverity("success");
                        setTimeout(() => {
                            setMensaje('');
                            setOpen(true);
                        }, 50000000);

                        const datosActuales = JSON.parse(localStorage.getItem("userData"));
                        const nuevoBalance = transferRes.transfer.from.newBalance;

                        const nuevosDatos = {
                            ...datosActuales,
                            balance: nuevoBalance,
                            token: datosActuales.token
                        };

                        localStorage.setItem("userData", JSON.stringify(nuevosDatos));
                    } else {
                        setMensaje(transferRes.message || "Error en la transferencia.");
                        setSeverity("error");
                        setTimeout(() => {
                            setMensaje('');
                        }, 5000);
                    }
                } catch (error) {
                    setMensaje(error.response?.data?.message || "Error desconocido al hacer la transferencia.");
                    setSeverity("error");
                    setTimeout(() => {
                        setMensaje('');
                    }, 5000);
                }
            } else {
                setMensaje(res.message || "Error en la verificación del TOTP.");
                setSeverity("error");
                setTimeout(() => {
                    setMensaje('');
                }, 5000);
            }
        } catch (error) {
            setMensaje(error.response?.data?.message || "Error desconocido al verificar el TOTP.");
            setSeverity("error");
            setTimeout(() => {
                setMensaje('');
            }, 5000);
        }
        finally {
            setLoading(false);
            setAlias("");
            setCantidad("");
            setDetalle("");
            setCodigo("");
        }
    };

    return (
        <Box
            component="section"
            sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7)), url(/images/fondo2.jpg)',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                px: { xs: 2, sm: 2 }
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: { xs: 350, sm: 350, md: 400, lg: 650, xl: 670 },
                    height: {
                        xs: "100%",
                        sm: "100%",
                        md: "auto",
                        lg: "auto",
                        xl: "auto",
                    },
                    backdropFilter: "blur(30px)",
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    boxShadow: 6,
                    borderRadius: 2,
                    py: 5,
                    px: { xs: 2, sm: 4 }
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 12px rgba(0, 0, 0, 0.39)",
                        width: "100%",
                        height: "12%",
                        textAlign: "center"
                    }}
                >
                    <Typography variant="h2" sx={{
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.2rem",
                            md: "1.5rem",
                            lg: "1.5rem",
                            xl: "1.8rem"
                        }
                    }}>
                        ¿Listo para transferir {name}?
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={transferencia}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        gap: 3
                    }}
                >
                    <Box sx={{ width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}>
                        <Autocomplete
                            value={alias}
                            onChange={(event, newValue) => setAlias(newValue)}
                            options={[...AliasUsuarios]}
                            sx={{
                                mb: 3,
                                input: { color: "white" },
                                label: { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" }
                                },
                                width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Alias"
                                    variant="standard"
                                    required
                                    InputLabelProps={{ required: false }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon style={{ color: "white" }} />
                                                </InputAdornment>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                    fullWidth
                                />
                            )}
                        />

                        <TextField
                            label="Cantidad"
                            type="text"
                            variant="standard"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            InputLabelProps={{ required: false }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PaidIcon style={{ color: "white" }} />
                                    </InputAdornment>
                                )
                            }}
                            required
                            fullWidth
                            sx={{
                                mb: 3,
                                input: { color: "white" },
                                label: { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" }
                                },
                                width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                            }}
                        />

                        <TextField
                            label="Detalle"
                            type="text"
                            variant="standard"
                            value={detalle}
                            onChange={(e) => setDetalle(e.target.value)}
                            InputLabelProps={{ required: false }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <InfoIcon style={{ color: "white" }} />
                                    </InputAdornment>
                                )
                            }}
                            required
                            fullWidth
                            sx={{
                                mb: 3,
                                input: { color: "white" },
                                label: { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" }
                                },
                                width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                            }}
                        />
                        <TextField
                            label="Código"
                            variant="standard"
                            type={showCodigo ? 'text' : 'password'}
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            required
                            InputLabelProps={{ required: false }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon style={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleToggleShowCodigo}
                                            edge="end"
                                            sx={{
                                                color: "#ffff",
                                                outline: "focus",
                                                boxShadow: "none",
                                                "&:focus": {
                                                    outline: "none",
                                                    boxShadow: "none"
                                                },
                                                "&:focus-visible": {
                                                    outline: "none",
                                                    boxShadow: "none"
                                                }
                                            }}
                                        >
                                            {showCodigo ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            sx={{
                                mb: 3,
                                input: { color: 'white' },
                                label: { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' },
                                },
                                width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 },
                                mb: 4
                            }}
                        />
                        <Stack
                            direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                            sx={{ mt: 2, width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
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
                                    width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 },
                                    marginBottom: {
                                        xs: "1.4rem",
                                        sm: "1.4rem",
                                        md: 0,
                                        lg: 0,
                                        xl: 0
                                    },
                                    marginRight: {
                                        xs: 0,
                                        sm: 0,
                                        md: "1rem",
                                        lg: "1.5rem",
                                        xl: "1.5rem"
                                    },
                                }}
                            >
                                {loading ? "Cargando..." : "Transferir"}
                            </Button>
                            <Button
                                variant="outlined"

                                onClick={Account}
                                sx={{
                                    fontSize: "1rem",
                                    width: "100%",
                                    color: "white",
                                    "&:hover": {
                                        color: "white"
                                    },
                                    width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                                }}
                            >
                                Volver
                            </Button>
                        </Stack>
                    </Box>
                </Box>
                <Stack spacing={3}
                    alignItems="center"
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "auto",
                            lg: "auto",
                            xl: "auto",
                        },
                    }}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            backdropFilter: "blur(20px)",
                            backgroundColor: "rgba(52, 0, 129, 0.23)",
                            boxShadow: "0 1px 12px rgba(0, 0, 0, 0)",
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Recibo de la transferencia
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                De: {transferData.username}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Para: {transferData.alias}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Cantidad: {transferData.cantidad}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Detalle: {transferData.detalle}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Fecha: {fechaTransferencia ? fechaTransferencia.toLocaleString() : "Cargando"}
                            </Typography>
                        </Box>
                    </Modal>
                </Stack>
                {mensaje && (
                    <Alert variant="filled" severity={severity} sx={{ color: "#ffff" }}>
                        {mensaje}
                        <Link to="/comprobante" sx={{color: "inherit", textDecoration: "none"}}>
                             <Button sx={{color: "black"}}>Ver recibo</Button>
                        </Link>
                    </Alert>
                )}
            </Stack>
        </Box>
    );
};

export default Transferencia;
