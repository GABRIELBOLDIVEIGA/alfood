import { useEffect, useState } from "react";
import IPratos from "../../../interfaces/IPrato";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../../service";

const AdmnistracaoPratos = () => {
    const [pratos, setPratos] = useState<IPratos[]>([]);

    useEffect(() => {
        api
            .get<IPratos[]>("pratos/")
            .then((response) => {
                setPratos(response.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, []);

    const excluirPrato = (pratoAhSerExcluido: IPratos) => {
        console.log(pratoAhSerExcluido.id);

        api.delete(`pratos/${pratoAhSerExcluido.id}/`)
        .then((resp)=> {
            console.log(resp);
            const listaPratos = pratos.filter(restaurante => restaurante.id !== pratoAhSerExcluido.id)
            console.log(listaPratos);
            setPratos([ ...listaPratos])
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
                        <TableCell>Nome Prato</TableCell>
                        
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map((prato) => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell><a href={prato.imagem} target="blank">[Ver Imagem]</a></TableCell>
                            <TableCell>
                                [<Link to={`/admin/prato/${prato.id}`}>Editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => excluirPrato(prato)} variant="outlined" color="error">
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

export default AdmnistracaoPratos;
