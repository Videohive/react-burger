import styles from "./profile-edit.module.css";

import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { editProfile } from "../../services/actions/profile";
import { useForm } from "../../hooks/useForm";

export function ProfileEdit() {
  const dispatch = useDispatch();

  const { name, email, password } = useSelector((store) => store.auth.user);

  const { values, handleChange, setValues } = useForm({
    name: name || "",
    email: email || "",
    password: password || "",
  });

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });

  const isChanged = useMemo(() => {
    return (
      name !== values.name ||
      email !== values.email ||
      password !== values.password
    );
  }, [values, name, email, password]);

  function onCancel(e) {
    e.preventDefault();
    setValues({ name, email, password });
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(editProfile(values));
  }

  function onFocus(evt) {
    setFocus({
      ...focus,
      [evt.target.name]: true,
    });
  }

  function onBlur(evt) {
    setFocus({
      ...focus,
      [evt.target.name]: false,
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          onChange={handleChange}
          value={values.name}
          onFocus={onFocus}
          onBlur={onBlur}
          icon={focus.name ? "CloseIcon" : "EditIcon"}
        />
      </div>
      <div className="mb-6">
        <Input
          type={"email"}
          placeholder={"Логин"}
          name={"email"}
          onChange={handleChange}
          value={values.email}
          onFocus={onFocus}
          onBlur={onBlur}
          icon={focus.email ? "CloseIcon" : "EditIcon"}
        />
      </div>
      <div className="mb-6">
        <Input
          type={focus.password ? "text" : "password"}
          placeholder={"Пароль"}
          value={values.password}
          name={"password"}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleChange}
          icon={focus.password ? "CloseIcon" : "EditIcon"}
        />
      </div>
      {isChanged && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="large"
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={values.name === "" || values.email === "" ? true : false}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
