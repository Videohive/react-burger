import styles from './profile-orders.module.css';
import {useEffect} from "react";
import { useDispatch, useSelector} from "../../services/types";
import OrderList from "../../components/order-list/order-list";
import {getCorrectOrders} from "../../utils/helpers";
import {WS_USER_ORDERS_URL} from "../../utils/const";
import {wsConnectionUserOrdersStartAction, wsConnectionUserOrdersClosedAction} from "../../services/actions/wsUserOrderActions";
import { setCorrectOrdersAction } from "../../services/actions/feed";


export function ProfileOrders() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");
    const accessTokenWithoutBearer = accessToken && accessToken.replace('Bearer ', '');
    const url = WS_USER_ORDERS_URL + `?token=${accessTokenWithoutBearer}`;
    const { loading } = useSelector(store => store.ws);

    useEffect(() => {
        dispatch(wsConnectionUserOrdersStartAction(url));
        return () => {
            dispatch(wsConnectionUserOrdersClosedAction());
        }
    }, [dispatch, url]);

    const orders  = useSelector((store) => store.userOrders.orders);
    const ingredientsData = useSelector((store) => store.data.ingredients);

    const correctOrders = orders && getCorrectOrders(orders, ingredientsData).reverse();

    useEffect(() => {
        dispatch(setCorrectOrdersAction(correctOrders))
    }, [dispatch, correctOrders]);

    if (loading) {
      return <p>Загружаем...</p>;
    }

    if (!correctOrders) {
        return (<p className={`${styles.text} text text_type_main-large text_color_inactive`}>Список заказов пуст</p>)
    }

    return (
        <div className={`${styles.section} custom-scroll pr-2`}>
            <OrderList orders={correctOrders}/>
        </div>
    )
}
