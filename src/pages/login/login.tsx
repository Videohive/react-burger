import styles from "../register/register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/types";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../../services/actions/login";
import { useForm } from "../../hooks/useForm";
import { TLogin } from "../../utils/types";

export function LoginPage() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const loginError = useSelector((store) => store.auth.loginError);
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login(values as TLogin));
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-medium mb-6`}>Вход</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            onChange={handleChange}
            value={values.email}
            {...({} as any)} // требует свойства, не понятно
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={values.password}
            name={"password"}
            onChange={handleChange}
            // onError={loginError}
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={
            values.email === "" || values.password === "" ? true : false
          }
        >
          Войти
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link to="/register" className={styles.link}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.button}`}
          >
            Зарегистрироваться
          </Button>
        </Link>
      </p>

      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={`${styles.button}`}
          >
            Восстановить пароль
          </Button>
        </Link>
      </p>
    </div>
  );
}
