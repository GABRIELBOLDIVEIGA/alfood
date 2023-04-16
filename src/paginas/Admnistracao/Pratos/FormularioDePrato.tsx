import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../service";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioDePrato = () => {
    const [nomePrato, setNomePrato] = useState("");
    const [descricao, setDescricao] = useState("");

    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState("");

    const [restautantes, setrestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState("");

    const [imagem, setImagem] = useState<File | null>(null);

    useEffect(() => {
        api.get<{ tags: ITag[] }>("tags/")
            .then((resp) => {
                setTags(resp.data.tags);
            })
            .catch((err) => {
                console.log(err);
            });

        api.get<IRestaurante[]>("restaurantes/")
            .then((resp) => {
                setrestaurantes(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();
        formData.append("nome", nomePrato);
        formData.append("descricao", descricao);
        formData.append("tag", tag);
        formData.append("restaurante", restaurante);

        if (imagem) {
            formData.append("imagem", imagem);
        }

        api.request({
            url: "pratos/",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        })
            .then(() => {
                setNomePrato("");
                setDescricao("");
                setTags([]);
                setTag("");
                setrestaurantes([]);
                setRestaurante("");
                setImagem(null);
                alert("Prato Cadastrado com sucesso !");
            })
            .catch((err) => console.log(err));
    };

    const selecionarArquivo = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files?.length) {
            setImagem(ev.target.files[0]);
        } else {
            setImagem(null);
        }
    };

    return (
        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                        <Typography component="h1" variant="h6">
                            Formulario de Pratos
                        </Typography>
                        <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                            <TextField
                                onChange={(ev) => {
                                    setNomePrato(ev.target.value);
                                }}
                                fullWidth={true}
                                value={nomePrato}
                                label="Nome do Prato"
                                variant="standard"
                                required={true}
                                margin="dense"
                            />
                            <TextField
                                onChange={(ev) => {
                                    setDescricao(ev.target.value);
                                }}
                                fullWidth={true}
                                value={descricao}
                                label="Descrição"
                                variant="standard"
                                required={true}
                                margin="dense"
                            />

                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-tag">Tag</InputLabel>
                                <Select
                                    required
                                    labelId="select-tag"
                                    value={tag}
                                    onChange={(ev) => {
                                        setTag(ev.target.value);
                                    }}
                                >
                                    {tags.map((tag) => (
                                        <MenuItem key={tag.id} value={tag.value}>
                                            {tag.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl margin="dense" fullWidth>
                                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                <Select
                                    required
                                    labelId="select-restaurante"
                                    value={restaurante}
                                    onChange={(ev) => {
                                        setRestaurante(ev.target.value);
                                    }}
                                >
                                    {restautantes.map((restaurante) => (
                                        <MenuItem key={restaurante.id} value={restaurante.id}>
                                            {restaurante.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <input type="file" onChange={(ev) => selecionarArquivo(ev)} />

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

export default FormularioDePrato;
