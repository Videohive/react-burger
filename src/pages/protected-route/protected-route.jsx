import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../services/actions/profile";

const ProtectedRouted = ({ element }) => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const getUserRequest = useSelector((store) => store.auth.getUserRequest);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    setUserLoaded(true);
  }, [dispatch]);

  const preloader = <p>Загружаем...</p>;

  if (!isUserLoaded) {
    return preloader;
  }

  return getUserRequest && !isAuthenticated ? (
    preloader
  ) : isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace />
  );
};

ProtectedRouted.propTypes = {
  element: PropTypes.element,
};

export default ProtectedRouted;
