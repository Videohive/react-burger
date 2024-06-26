import { useSelector, useDispatch } from "../../services/types";
import { Navigate } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { getUser } from "../../services/actions/profile";

interface IProtected {
  element: JSX.Element;
}

const ProtectedRouted: FC<IProtected> = ({ element }) => {
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

export default ProtectedRouted;
