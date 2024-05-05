import { Route, Navigate, Routes } from 'react-router-dom';
import PageNotFound from '../../Pages/PageNotFound/PageNotFound';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => (
  <Routes>
       <Route
    {...rest}
    element={isAuthenticated ? <Element /> : <PageNotFound/>}
  />
  </Routes>
);

export default PrivateRoute;
