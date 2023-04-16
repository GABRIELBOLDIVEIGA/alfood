import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdmnistracaoRestaurante from "./paginas/Admnistracao/Restaurantes/AdmnistracaoRestaurante";
import FormularioRestaurante from "./paginas/Admnistracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Admnistracao/PaginaBaseAdmin";
import AdmnistracaoPratos from './paginas/Admnistracao/Pratos/AdministracaoDePratos';
import FormularioDePrato from './paginas/Admnistracao/Pratos/FormularioDePrato';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<VitrineRestaurantes />} />

            <Route path="/admin" element={<PaginaBaseAdmin />}>

                <Route path="restaurantes" element={<AdmnistracaoRestaurante />} />
                <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
                <Route path="restaurantes/novo" element={<FormularioRestaurante />} />

                <Route path="pratos" element={<AdmnistracaoPratos />} />
                <Route path="pratos/novo" element={<FormularioDePrato />} />
            </Route>

        </Routes>
    );
}

export default App;
