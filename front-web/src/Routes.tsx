import Auth from "core/pages/Auth";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Navbar from "./core/components/Navbar";
import Admin from "./core/pages/Admin";
import Catalog from "./core/pages/Catalog";
import ProductDetails from "./core/pages/Catalog/components/ProductDetails";
import Home from "./core/pages/Home";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/products" exact>
            <Catalog />
        </Route>
        <Route path="/products/:productId">
            <ProductDetails />
        </Route>
        <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
        <Route path="/admin/auth">
            <Auth />
        </Route>

        <Redirect from="/admin" to="/admin/products" exact/>
        <Route path="/admin">            
            <Admin />
        </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
