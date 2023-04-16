import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdmnistracaoRestaurante from "./paginas/Admnistracao/Restaurantes/AdmnistracaoRestaurante";
import FormularioRestaurante from "./paginas/Admnistracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Admnistracao/PaginaBaseAdmin";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />

            <Route path="/admin" element={<PaginaBaseAdmin />}>

                <Route path="restaurantes" element={<AdmnistracaoRestaurante />} />
                <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
                <Route path="restaurantes/novo" element={<FormularioRestaurante />} />

            </Route>

        </Routes>
    );
}

export default App;
