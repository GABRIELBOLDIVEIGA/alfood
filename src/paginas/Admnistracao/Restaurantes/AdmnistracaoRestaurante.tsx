import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../../service";

const AdmnistracaoRestaurante = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        api
            .get<IRestaurante[]>("restaurantes/")
            .then((response) => {
                setRestaurantes(response.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, []);

    const excluirRestaurante = (restauranteAhSerExcluido: IRestaurante) => {
        console.log(restauranteAhSerExcluido.id);

        api.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
        .then((resp)=> {
            console.log(resp);
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
            console.log(listaRestaurantes);
            setRestaurantes([ ...listaRestaurantes])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome Restaurante</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => excluirRestaurante(restaurante)} variant="outlined" color="error">
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdmnistracaoRestaurante;
