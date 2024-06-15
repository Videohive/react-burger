import {FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/actions/profile";
import { Navigate, useLocation } from "react-router-dom";

interface IUnProtected {
  element: JSX.Element;
}

const UnProtectedRoute: FC<IUnProtected> = ({ element }) => {
  const isAuthenticated = useSelector((store: any) => store.auth.isAuthenticated);
  const getUserRequest = useSelector((store: any) => store.auth.getUserRequest);
  const dispatch = useDispatch();
  const location = useLocation();

  const preloader = <p>Загружаем...</p>;

  useEffect(() => {
    //@ts-ignore
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

export default UnProtectedRoute;
