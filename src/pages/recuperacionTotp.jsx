import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, TextField, Typography, InputAdornment } from "@mui/material";
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const recuperacionTotp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [totpSetup, setTotpSetup] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from;
    const textButton = from === "verify-account" ? "Volver a inicio" : "Volver a verificar"

    const handleVolver = () => {
        if (from === "verify-account") {
            navigate("/verify-account");
        } else {
            navigate("/Login")
        }
    };

    const handleLogin = () => {
        navigate("/Login")
    };

    const data = {
        username: username,
        email: email
    };

    const handleRecuperar = async (e) => {
        e.preventDefault();
        setTotpSetup(null);
        setLoading(true);

        try {
            const response = await axios.post("https://raulocoin.onrender.com/api/regenerate-totp", data)
            const res = response.data;

            if (res.success) {
                setTotpSetup(res.totpSetup);
            }
        } catch (error) {
            console.error("Error al obtener el QR:", error);
        } finally {
            setUsername("");
            setEmail("");
            setLoading(false);
        }
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
                minWidth: "100vw",
                backgroundImage: 'linear-gradient(115deg, rgba(0, 0, 0, 0.8), rgba(78, 78, 78, 0.7))',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: 3
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "60%",
                        lg: "35%",
                        xl: "32%"
                    },
                    height: {
                        xs: "100%",
                        sm: "100%",
                        md: "auto",
                        lg: "auto",
                        xl: "auto"
                    },
                    backdropFilter: "blur(30px)",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    boxShadow: 6,
                    borderRadius: 2,
                    py: 6,
                    px: { xs: 1, sm: 3 }
                }}
            >
                {!totpSetup ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: 4,
                                width: "100%",
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
                                Regenerar QR de TOTP
                            </Typography>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleRecuperar}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "auto",
                                mx: "auto",
                                height: "100%"
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                mx: "auto"
                            }}>
                                <TextField
                                    label="Alias"
                                    type="text"
                                    variant="standard"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputLabelProps={{ required: false }}
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon style={{ color: "white" }} />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        mb: 3.5,
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
                                    label="Email"
                                    type="text"
                                    variant="standard"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputLabelProps={{ required: false }}
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AlternateEmailOutlinedIcon style={{ color: "white" }} />
                                            </InputAdornment>
                                        )
                                    }}
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

                                <Stack
                                    direction={{ xs: "column", sm: "column", md: "row", lg: "row,", xl: "row" }}
                                    sx={{ mt: 2, width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 } }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                        sx={{
                                            fontSize: "1rem",
                                            height: 45,
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "50%",
                                                lg: "50%",
                                                xl: "50%",
                                            },
                                            marginRight: {
                                                xs: 0,
                                                sm: 0,
                                                md: "1rem",
                                                lg: "1.5rem",
                                                xl: "1.5rem"
                                            },
                                            marginBottom: {
                                                xs: "1.5rem",
                                                sm: "1.5rem",
                                                md: 0,
                                                lg: 0,
                                                xl: 0
                                            },
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
                                            width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                                        }}
                                    >
                                        {loading ? "Cargando..." : "Generar"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        component="a"
                                        onClick={handleLogin}
                                        color="primary"
                                        sx={{
                                            fontSize: "1rem",
                                            height: 45,
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "50%",
                                                lg: "50%",
                                                xl: "50%",
                                            },
                                            color: "white",
                                            "&:hover": {
                                                color: "white",
                                            },
                                            width: { xs: 290, sm: 290, md: 360, lg: 370, xl: 370 }
                                        }}
                                    >Volver
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
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
                                    xs: "1.5rem",
                                    sm: "1.5rem",
                                    md: "1.3rem",
                                    lg: "1.3rem",
                                    xl: "1.8rem"
                                }
                            }}>
                                Codigo QR generado
                            </Typography>
                        </Box>

                        <Box
                            component="form"
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
                                <Typography variant="h2" sx={{
                                    fontSize: {
                                        xs: "1.2rem",
                                        sm: "1.2rem",
                                        md: "1.1rem",
                                        lg: "1.2rem",
                                        xl: "1.4rem"
                                    },
                                    textAlign: "center",
                                    marginBottom: "1rem"
                                }}>
                                    Escanea este código QR con Google Authenticator o ingresa el código manualmente
                                </Typography>
                                <Box
                                    component="img"
                                    src={totpSetup.qrCodeUrl}
                                    alt="TOTP QR Code"
                                    sx={{
                                        maxWidth: 500,
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: 2,
                                        boxShadow: 6
                                    }}
                                />
                                <Box sx={{
                                    maxWidth: 700,
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    p: 2,
                                    marginTop: "1rem",
                                    marginBottom: "1rem"
                                }}>
                                    <Typography variant="h2" sx={{
                                        fontSize: {
                                            xs: "1.2rem",
                                            sm: "1.2rem",
                                            md: "1.1rem",
                                            lg: "1.2rem",
                                            xl: "1.4rem"
                                        },
                                        textAlign: "center",
                                        wordBreak: "break-word"
                                    }}>{totpSetup.manualSetupCode}</Typography>
                                </Box>
                                <Stack
                                    spacing={2}
                                    direction={{ xs: "column", sm: "column", md: "row" }}
                                    sx={{ mt: 2 }}
                                >
                                    <Button
                                        variant="contained"
                                        component="a"
                                        onClick={handleVolver}
                                        color="primary"
                                        sx={{
                                            fontSize: "1rem",
                                            height: 50,
                                            width: {
                                                xs: "100%",
                                                sm: "100%",
                                                md: "100%",
                                                lg: "100%",
                                                xl: "100%",
                                            },
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
                                            boxShadow: 3
                                        }}
                                    >
                                        {textButton}
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </>
                )}
            </Stack>
        </Box >
    )
};

export default recuperacionTotp;