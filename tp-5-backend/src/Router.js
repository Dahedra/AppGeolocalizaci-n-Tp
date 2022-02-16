import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PaisesList from './components/PaisesList';
import PaisesForm from './components/PaisesForm';
import CiudadesList from './components/CiudadesList';
import CiudadesForm from './components/CiudadesForm';
import ProvinciasList from './components/ProvinciasList';
import ProvinciasForm from './components/ProvinciasForm';
import Menu from './components/Menu';

const Router = () => {

    return (
        <BrowserRouter>

            <Switch>
                <Route path='/menu' exact component={Menu}/>
                <Route path='/paises' exact component={PaisesList} />
                <Route path='/paises/nuevo' exact component={PaisesForm} />
                <Route path='/paises/:idPais' exact component={PaisesForm} />

                <Route path='/provincias' exact component={ProvinciasList} />
                <Route path='/provincias/nuevo' exact component={ProvinciasForm} />
                <Route path='/provincias/:idProvincia' exact component={ProvinciasForm} />

                <Route path='/ciudades' exact component={CiudadesList} />
                <Route path='/ciudades/nuevo' exact component={CiudadesForm} />
                <Route path='/ciudades/:idCiudad' exact component={CiudadesForm} />
                
                <Route path='/'>
                    <Redirect to='/menu' />
                </Route>
            </Switch>

        </BrowserRouter>
    )
}

export default Router;