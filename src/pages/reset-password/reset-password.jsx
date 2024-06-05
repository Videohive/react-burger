import styles from "../register/register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { resetPassword } from "../../services/actions/reset-password";
import { useForm } from "../../hooks/useForm";

export function ResetPasswordPage() {
  const forgotPasswordSuccess = useSelector(
    (store) => store.auth.forgotPasswordSuccess
  );
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const resetPasswordSuccess = useSelector(
    (store) => store.auth.resetPasswordSuccess
  );
  const resetPasswordError = useSelector(
    (store) => store.auth.resetPasswordError
  );

  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    password: "",
    token: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    dispatch(resetPassword(values));
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!forgotPasswordSuccess && !isAuthenticated) {
    return <Navigate to="/forgot-password" />;
  }

  if (resetPasswordSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <main className={styles.container}>
      <h2 className={`text text_type_main-medium  mb-6`}>
        Восстановление пароля
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <PasswordInput
            value={values.password}
            name={"password"}
            onChange={handleChange}
            error={resetPasswordError}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Ведите код из письма"}
            name={"token"}
            value={values.token}
            onChange={handleChange}
            error={resetPasswordError}
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={
            values.password === "" || values.token === "" ? true : false
          }
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link to="/login">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.button}`}
          >
            Войти
          </Button>
        </Link>
      </p>
    </main>
  );
}
