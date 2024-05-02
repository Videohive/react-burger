import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <nav className={styles.navBar}>
        <a href="#" className={`${styles.constructorElement} mr-2`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <BurgerIcon type="primary" />
          </div>
          <p className={`text text_type_main-default`}>Конструктор</p>
        </a>
        <a href="#" className={styles.constructorElement}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ListIcon type="secondary" />
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            Лента заказов
          </p>
        </a>
        <div className={styles.logoCenter}>
          <Logo />
        </div>
        <a href="#" className={`${styles.constructorElement} ${styles.profileArea}`}>
          <div className={"ml-5 mr-2 mt-4 mb-4"}>
            <ProfileIcon type="secondary" />
          </div>
          <p className={"text text_type_main-default text_color_inactive"}>
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
};
