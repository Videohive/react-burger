import styles from "./app.module.css";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch } from "../../services/types";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { ProtectedRouted, UnProtectedRoute, HomePage, RegisterPage, LoginPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, ProfileEdit, ProfileOrders, IngredientDetailsPage, FeedPage, OrderDetailsPage } from "../../pages"
import Modal from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OrderDetailCard } from "../order-detail-card/order-detail-card";

export default function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const background =  location.state && location.state.background;

  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
    <div className={styles.container}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/feed" element={<FeedPage/>}/>
        <Route path='/feed/:orderId' element={<OrderDetailsPage/>} />
        <Route path="/register"  element={<UnProtectedRoute element={<RegisterPage/>}></UnProtectedRoute>}/>
        <Route path="/login" element={<UnProtectedRoute element={<LoginPage/>}></UnProtectedRoute>}/>
        <Route path="/forgot-password" element={<UnProtectedRoute element={<ForgotPasswordPage/>}></UnProtectedRoute>}/>
        <Route path="/reset-password" element={<UnProtectedRoute element={<ResetPasswordPage/>}></UnProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRouted element={<ProfilePage />}/>}>
          <Route index element={<ProtectedRouted element={<ProfileEdit />}/>} />
          <Route path="orders" element={<ProtectedRouted element={<ProfileOrders  />}/>} />
        </Route>
        <Route path='/ingredients/:ingredientId' element={<IngredientDetailsPage/>} />
        <Route path='/profile/orders/:orderId' element={<ProtectedRouted element={<OrderDetailsPage/>}/> }/>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:orderId"
            element={
              <Modal title="Детали заказа" onClose={closeModal}>
                <OrderDetailCard />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:orderId'
            element={
              <Modal title="Детали заказа" onClose={closeModal}>
                <OrderDetailCard />
              </Modal>
                }
            />
        </Routes>
      )}
      </div>
    </>
  );
}
