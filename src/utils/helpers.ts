import { TOrders, TCorrectOrder, TIngredient } from "./types";

export const getIngredients = (ids: string[], data: TIngredient[]) => {
  const result: TIngredient[] = [];
  const counts = new Map<string, number>();
  const buns = new Map<string, boolean>();

  ids.forEach((id) => {
    counts.set(id, (counts.get(id) || 0) + 1);
  });

  data.forEach((ingredient) => {
    const count = counts.get(ingredient._id);
    if (count !== undefined) {
      if (ingredient.type === "bun") {
        buns.set(ingredient._id, true);
        counts.set(ingredient._id, 2);
      }
      result.push({ ...ingredient, count });
    }
  });

  if (buns.size === 1) {
    return result;
  }

  return [];
};

export const getCorrectOrders = (orders: TOrders, data: TIngredient[]) => {
  const correctOrders: TCorrectOrder[] = [];
  orders.forEach((order) => {
    const { ingredients, ...rest } = order;
    const correctIngredients = getIngredients(order.ingredients, data);
    if (correctIngredients.length) {
      correctOrders.push({ ...rest, ingredients: correctIngredients });
    }
  });
  return correctOrders;
};

export function formatDate(date: string) {
  const dateToFormat = new Date(date);
  const currentDate = new Date();

  // Установка времени на начало дня для обеих дат
  dateToFormat.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Вычисление разницы в днях
  const daysAgo = Math.floor((currentDate.getTime() - dateToFormat.getTime()) / (1000 * 3600 * 24));
  const hours = new Date(date).getHours().toString().padStart(2, '0');
  const minutes = new Date(date).getMinutes().toString().padStart(2, '0');

  let formattedDate = "";
  const time = `${hours}:${minutes} i-GMT+${-new Date(date).getTimezoneOffset() / 60}`;
  switch (true) {
    case daysAgo === 0:
      formattedDate += "Сегодня, ";
      break;
    case daysAgo === 1:
      formattedDate += "Вчера, ";
      break;
    case daysAgo > 1 && daysAgo < 5:
      formattedDate += `${daysAgo} дня назад, `;
      break;

    default:
        formattedDate += `${daysAgo} дней назад, `;
        break;
  }
  return `${formattedDate + time}`;
}
