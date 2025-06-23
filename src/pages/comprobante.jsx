import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, TextField, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Comprobante = () => {
    const location = useLocation();
    const datosHistorial = location.state;
    const reciboRef = useRef();
    const navigate = useNavigate();
    const [datos, setDatos] = useState(() => {
        if (datosHistorial) {
            return datosHistorial;
        };

        const datosRecibo = localStorage.getItem("reciboTransferencia");
        return datosRecibo ? JSON.parse(datosRecibo) : null;
    });

    const generarPdf = async () => {
        const canvas = await html2canvas(reciboRef.current);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("comprobanteTransferencia.pdf");
    };

    useEffect(() => {

        if (!datos) {
            navigate("/transfer");
        }

    }, [datos, navigate]);

    const Account = () => {
        navigate("/Account");
    };

    if (!datos) {
        return <Typography sx={{ color: "black" }}>Cargando recibo...</Typography>
    }

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
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: "auto",
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
                    py: 3,
                    px: { xs: 2, sm: 4 }
                }}
            >
                <Stack spacing={4} direction="column" ref={reciboRef} sx={{
                    width: { xs: 350, sm: 350, md: 400, lg: 350, xl: 450 },
                    height: {
                        xs: "100%",
                        sm: "100%",
                        md: "auto",
                        lg: "auto",
                        xl: "auto",
                    },
                    p: 3,
                    boxShadow: 6,
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(0, 0, 0, 0.38)",
                    color: "white"
                }}>
                    <Typography variant='h2' sx={{
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.2rem",
                            md: "1.5rem",
                            lg: "1.5rem",
                            xl: "1.8rem"
                        },
                        textAlign: "center"
                    }}>Recibo de transferencia</Typography>
                    <Divider />
                    <Typography sx={{ fontFamily: "arial" }}>
                        <PermIdentityIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        De: {datos.fromUsername}
                    </Typography>
                    <Typography sx={{ fontFamily: "arial" }}>
                        <PersonSearchOutlinedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        Para: {datos.toUsername}
                    </Typography>
                    <Typography sx={{ fontFamily: "arial" }}>
                        <CurrencyExchangeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        Cantidad transferida: ${datos.amount} raulo coins
                    </Typography>
                    <Typography sx={{ wordBreak: "break-word" }}>
                        <DescriptionOutlinedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        Descripción: {datos.description}
                    </Typography>
                    {datos.operationToken && (
                        <Typography sx={{ fontFamily: "arial" }}>
                            <PasswordIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                            Token: {datos.operationToken}
                        </Typography>
                    )}
                    <Typography sx={{ fontFamily: "arial" }}>
                        <CalendarMonthIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        Fecha: {datos.createdAt
                            ? new Date(
                                typeof datos.createdAt === "number" && datos.createdAt < 9999999999
                                    ? datos.createdAt * 1000
                                    : datos.createdAt
                            ).toLocaleString()
                            : "Fecha no disponible"}
                    </Typography>
                    <Divider />
                    <Stack
                        spacing={3}
                        direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
                        sx={{
                            mt: 2,
                            width: { xs: 290, sm: 290, md: 360, lg: "100%", xl: "100%" },
                            height: {
                                xs: "100%",
                                sm: "100%",
                                md: "auto",
                                lg: "auto",
                                xl: "auto",
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={generarPdf}
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
                            Descargar
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
                </Stack>
            </Stack>
        </Box>
    )
}

export default Comprobante;