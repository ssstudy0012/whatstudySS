import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Form from "./page/Form";
import Login from "./page/Login";
import AdminRoute from "./AdminRoute";
import Home from './page/Home';
const App = lazy(() => import("./App"));
const Edit = lazy(() => import("./page/Edit"));
const MyRoute = () => {
  return (
    <Suspense>
      <Router>
        <Routes>
            <Route path="/" exact element={<Home />}></Route>
          <Route exact path="/" element={<AdminRoute />}>
            <Route path="/form" exact element={<Form />}></Route>
          </Route>

          <Route exact path="/" element={<AdminRoute />}>
            <Route path="/find" exact element={<App />}></Route>
          </Route>

          <Route exact path="/" element={<AdminRoute />}>
            <Route path="/edit/:slug" exact element={<Edit />}></Route>
          </Route>

          <Route path="/login" exact element={<Login />}></Route>
        </Routes>
      </Router>
    </Suspense>
  );
};
export default MyRoute;
