import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions/register";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useForm } from "../../hooks/useForm";

export function RegisterPage() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    dispatch(register(values));
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to='/'
        replace
      />
    )
  }

  return (
    <main className={styles.container}>
      <h2 className={`text text_type_main-medium mb-6`}>Регистрация</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={values.password}
            name={"password"}
            onChange={handleChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="large"  disabled={values.name === ''  || values.email === '' || values.password === '' ? true : false}>
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link to="/login ">
          <Button htmlType="button" type="secondary" size="medium" extraClass={`${styles.button}`}>
            Войти
          </Button>
        </Link>
      </p>
    </main>
  );
}
