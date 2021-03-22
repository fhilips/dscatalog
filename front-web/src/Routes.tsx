import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "./core/components/Navbar";
import Admin from "./core/pages/Admin";
import Catalog from "./core/pages/Catalog";
import Home from "./core/pages/Home";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/catalog">
            <Catalog />
        </Route>
        <Route path="/admin">
            <Admin />
        </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
