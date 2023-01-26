import "./App.css";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { routes } from "./constants/routes";
import Home from "./components/Home";
import Login from "./components/Login";
import RouteWrapper from "./components/wrapper/RouteWrapper";
import PreAuth from "./components/PreAuth";
import AuthLayout from "./components/layout/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path={routes.APP} element={<RouteWrapper exact isPrivate={false} redirectToDashboard={false} path={routes.APP} component={AuthLayout} />}>
          <Route exact path={routes.APP + routes.HOME} element={<Home />} />
        </Route>

        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.PRE_AUTH} element={<PreAuth />} />

        <Route exact path={routes.OTHER} element={<RouteWrapper redirectHome={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
