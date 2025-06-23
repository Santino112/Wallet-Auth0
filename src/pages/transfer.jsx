import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link as RouterLink } from "react-router-dom";
import { Stack, Box, Button, TextField, Typography, Autocomplete, Alert, Modal, InputAdornment, IconButton, Snackbar, AlertTitle } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as MuiLink } from '@mui/material';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const Transferencia = (e) => {
    const [loading, setLoading] = useState(false);
    const [alias, setAlias] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [detalle, setDetalle] = useState("");
    const [codigo, setCodigo] = useState("");
    const [showCodigo, setShowCodigo] = useState(false);
    const [severity, setSeverity] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [titulo, setTitulo] = useState("");
    const navigate = useNavigate();
    const [fechaTransferencia, setFechaTransferencia] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [transferData, setTransferData] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const AliasUsuarios = ["alejo.daloia", "barbimol", "practicosuniygeneral.alias", "SamirFrascarelli.alias", "tobias.rc.alias", "Fransay.alias", "misaSSJ", "FabriRuma912", "anto.p", "Agus", "guada", "jogani", "virpedraza47", "Loki", "lupigliacampi", "maxibergese", "facundogrosso", "sqlenjoyer.alias", "santiagolazos", "otakuemo", "jgp.raulo", "dam", "JulietaGonella.alias"];


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

                const reciboConFecha = {
                    ...datosTransferencia,
                    createdAt: Date.now()
                };

                try {
                    const transferResponse = await axios.post("https://raulocoin.onrender.com/api/transfer", datosTransferencia);
                    const transferRes = transferResponse.data;

                    if (transferRes.success) {
                        localStorage.setItem("reciboTransferencia", JSON.stringify(reciboConFecha));
                        setTitulo("Éxito")
                        setMensaje(transferRes.message);
                        setTransferData({
                            username,
                            alias,
                            cantidad,
                            detalle
                        });
                        setFechaTransferencia(new Date());
                        setSeverity("success");
                        setOpen(true);

                        const datosActuales = JSON.parse(localStorage.getItem("userData"));
                        const nuevoBalance = transferRes.transfer.from.newBalance;

                        const nuevosDatos = {
                            ...datosActuales,
                            balance: nuevoBalance,
                            token: datosActuales.token
                        };
                        localStorage.setItem("userData", JSON.stringify(nuevosDatos));
                    } else {
                        setTitulo("Error");
                        setMensaje(transferRes.message || "Error en la transferencia.");
                        setSeverity("error");
                        setTimeout(() => {
                            setMensaje('');
                        }, 5000);
                    }
                } catch (error) {
                    setTitulo("Error");
                    setMensaje(error.response?.data?.message || "Error desconocido al hacer la transferencia.");
                    setSeverity("error");
                    setTimeout(() => {
                        setMensaje('');
                    }, 5000);
                }
            } else {
                setTitulo("Error");
                setMensaje(res.message || "Error en la verificación del TOTP.");
                setSeverity("error");
                setTimeout(() => {
                    setMensaje('');
                }, 5000);
            }
        } catch (error) {
            setTitulo("Error");
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
                backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                px: { xs: 2, sm: 2 },
                padding: 3
            }}
        >
            <Snackbar
                open={Boolean(mensaje)}
                autoHideDuration={null}
                onClose={() => setMensaje(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ mt: "2rem" }}
            >
                {mensaje && (
                    <Alert variant="filled" severity={severity} {...(severity === "success" && { onClose: () => setMensaje(null) })} sx={{ color: "#ffffff", width: { xs: "100%", sm: "100%", md: 450, lg: 450, xl: 450 }, height: 95 }}>
                        <AlertTitle>{titulo}</AlertTitle>
                        {mensaje}
                        {severity === "success" && (
                            <MuiLink component={RouterLink} to="/comprobante" underline="none">
                                <Button sx={{ color: "inherit", ml: 1 }}>Ver recibo</Button>
                            </MuiLink>
                        )}
                    </Alert>
                )}
            </Snackbar>
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
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
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
                        boxShadow: 6,
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
                                                    <PersonSearchOutlinedIcon style={{ color: "white" }} />
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
                                        <PaidOutlinedIcon style={{ color: "white" }} />
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
                                        <InfoOutlinedIcon style={{ color: "white" }} />
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
                                        <VpnKeyOutlinedIcon style={{ color: "white" }} />
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
                                    boxShadow: 3
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
            </Stack>
        </Box>
    );
};

export default Transferencia;
