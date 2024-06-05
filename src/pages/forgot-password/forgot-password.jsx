import styles from "../register/register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../services/actions/forgot-password";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useForm } from "../../hooks/useForm";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const forgotPasswordSuccess = useSelector(
    (store) => store.auth.forgotPasswordSuccess
  );
  const forgotPasswordError = useSelector(
    (store) => store.auth.forgotPasswordError
  );
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const { values, handleChange } = useForm({
    email: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    dispatch(forgotPassword(values));
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (forgotPasswordSuccess) {
    return <Navigate to="/reset-password" />;
  }

  return (
    <main className={styles.container}>
      <h2 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            onChange={handleChange}
            value={values.email}
            error={forgotPasswordError}
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={values.email === "" ? true : false}
        >
          Восстановить
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
