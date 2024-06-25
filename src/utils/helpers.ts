import { TOrders, TCorrectOrder, TIngredient } from "./types";

export const getIngredients = (ids: string[], data: TIngredient[]) => {
  const result: TIngredient[] = [];
  const counts: { [id: string]: number } = {};
  const buns: { [id: string]: boolean } = {};

  ids.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  data.forEach((ingredient) => {
    const count = counts[ingredient._id];
    if (count !== undefined) {
      if (ingredient.type === "bun") {
        buns[ingredient._id] = true;
        counts[ingredient._id] = 2;
      }
      result.push({ ...ingredient, count });
    }
  });

  if (Object.keys(buns).length === 1) {
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
  const daysAgo = currentDate.getDay() - dateToFormat.getDay();
  const hours =
    dateToFormat.getHours() > 9
      ? dateToFormat.getHours().toString()
      : "0" + dateToFormat.getHours().toString();
  const minutes =
    dateToFormat.getMinutes() > 9
      ? dateToFormat.getMinutes().toString()
      : "0" + dateToFormat.getMinutes().toString();

  let formattedDate = "";
  const time = `${hours}:${minutes} i-GMT+${
    -dateToFormat.getTimezoneOffset() / 60
  }`;
  switch (true) {
    case daysAgo === 0: {
      formattedDate += "Сегодня, ";
      break;
    }
    case daysAgo === 1: {
      formattedDate += "Вчера, ";
      break;
    }
    case daysAgo > 9 && daysAgo % 10 === 1: {
      formattedDate += `${daysAgo} день назад, `;
      break;
    }
    case daysAgo % 10 > 1 && daysAgo % 10 < 5: {
      formattedDate += `${daysAgo} дня назад, `;
      break;
    }
    default: {
      formattedDate += `${daysAgo} дней назад, `;
      break;
    }
  }
  return `${formattedDate + time}`;
}
