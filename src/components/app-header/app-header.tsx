import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation } from "react-router-dom";

export default function AppHeader() {
  const location = useLocation();

  const getIconType = (path: string): "primary" | "secondary" => {
    return location.pathname === path ? "primary" : "secondary";
  };

  const getTextClass = (path: string): string => {
    return `text text_type_main-default ${location.pathname === path ? "" : "text_color_inactive"}`;
  };

  return (
    <header className={styles.appHeader}>
      <nav className={styles.navBar}>
        <NavLink to="/" className={`${styles.constructorElement} mr-2`}>
          <div className={"mr-2 mt-4 mb-4"}>
            <BurgerIcon type={getIconType("/")} />
          </div>
          <p className={getTextClass("/")}>Конструктор</p>
        </NavLink>
        <NavLink to="/feed" className={styles.constructorElement}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ListIcon type={getIconType("/feed")} />
          </div>
          <p className={getTextClass("/feed")}>
            Лента заказов
          </p>
        </NavLink>
        <NavLink to="/">
        <div className={styles.logoCenter}>
          <Logo />
        </div>
        </NavLink>
        <NavLink to="/profile" className={`${styles.constructorElement} ${styles.profileArea}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ProfileIcon type={getIconType("/profile") || getIconType("/profile/orders")} />
          </div>
          <p className={getTextClass("/profile") || getTextClass("/profile/orders")}>
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
}
