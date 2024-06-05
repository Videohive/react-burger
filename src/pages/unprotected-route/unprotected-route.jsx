import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/profile";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const UnProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const getUserRequest = useSelector((store) => store.auth.getUserRequest);
  const dispatch = useDispatch();
  const location = useLocation();

  const preloader = <p>Загружаем...</p>;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (getUserRequest) {
    return preloader;
  }

  return isAuthenticated ? (
    <Navigate to={location.state?.path || "/"} replace />
  ) : (
    element
  );
};

UnProtectedRoute.propTypes = {
  element: PropTypes.element,
};

export default UnProtectedRoute;
