import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import api from "../../../service";

const FormularioRestaurante = () => {
    const parametros = useParams();

    const [nomeRestaurante, setNomeRestaurante] = useState("");

    useEffect(() => {
        api.get<IRestaurante>(`restaurantes/${parametros.id}/`)
            .then((response) => {
                console.log(response.data);
                setNomeRestaurante(response.data.nome);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [parametros]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            api.put(`restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then((resp) => {
                    console.log(resp);
                    alert("Restaurante Atualizado com sucesso!");
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            api.post(`restaurantes/`, { nome: nomeRestaurante })
                .then((resp) => {
                    console.log(resp);
                    alert("Restaurante cadastrado com sucesso!");
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    return (
        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">
                            Formulario de restaurantes
                        </Typography>
                        <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                            <TextField
                                onChange={(ev) => {
                                    setNomeRestaurante(ev.target.value);
                                }}
                                fullWidth={true}
                                value={nomeRestaurante}
                                label="Nome do Restaurante"
                                variant="standard"
                                required={true}
                            />
                            <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth={true}>
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default FormularioRestaurante;
