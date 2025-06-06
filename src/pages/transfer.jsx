import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Stack, Box, Button, TextField, Typography, Autocomplete, Alert, Modal, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
        localStorage.getItem("datosLogin")
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
                        }, 5000);

                        const datosActuales = JSON.parse(localStorage.getItem("datosLogin"));
                        const nuevoBalance = transferRes.transfer.from.newBalance;

                        const nuevosDatos = {
                            ...datosActuales,
                            balance: nuevoBalance,
                            token: datosActuales.token
                        };

                        localStorage.setItem("datosLogin", JSON.stringify(nuevosDatos));
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
                backgroundImage: 'url(/images/Transferencia.png)',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                px: { xs: 2, sm: 4 }
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "60%",
                        lg: "40%",
                        xl: "45%",
                    },
                    height: {
                        xs: "100%",
                        sm: "100%",
                        md: "auto",
                        lg: "auto",
                        xl: "auto",
                    },
                    backdropFilter: "blur(5px)",
                    backgroundColor: "rgba(255, 255, 255, 0.10)",
                    boxShadow: "0 1px 12px rgba(25, 25, 25, 0.8)",
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
                        width: "100%",
                        height: "100%",
                        gap: 5
                    }}
                >
                    <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%" } }}>
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
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Alias"
                                    variant="outlined"
                                    required
                                    InputLabelProps={{ required: false }}
                                    fullWidth
                                />
                            )}
                        />

                        <TextField
                            label="Cantidad"
                            type="number"
                            variant="outlined"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            InputLabelProps={{ required: false }}
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
                            }}
                        />

                        <TextField
                            label="Detalle"
                            type="text"
                            variant="outlined"
                            value={detalle}
                            onChange={(e) => setDetalle(e.target.value)}
                            InputLabelProps={{ required: false }}
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
                            }}
                        />
                        <TextField
                            label="Código"
                            variant="outlined"
                            type={showCodigo ? 'number' : 'password'}
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            required
                            InputLabelProps={{ required: false }}
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
                                }
                            }}
                            InputProps={{
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
                                            {showCodigo ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Stack
                            spacing={2}
                            direction={{ xs: "column", sm: "column", md: "row" }}
                            sx={{ mt: 2 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    fontSize: "1rem",
                                    width: "100%",
                                    backgroundColor: "#74c69d",
                                    "&:hover": {
                                        backgroundColor: "#52b788"
                                    }
                                }}
                            >
                                {loading ? "Cargando..." : "Transferir"}
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={Account}
                                sx={{
                                    fontSize: "1rem",
                                    width: "100%",
                                    backgroundColor: "#d8f3dc",
                                    "&:hover": {
                                        backgroundColor: "#b7e4c7"
                                    }
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
                    </Alert>
                )}
            </Stack>
        </Box>
    );
};

export default Transferencia;
