export const URL = "https://norma.nomoreparties.space/api";

// Вспомогательная функция для обработки ответа
export function checkResponse(res) {
  if (!res.ok) {
    return res.json().then(err => Promise.reject(`Ошибка ${res.status}: ${err.message}`));
  }
  return res.json();
}

// Вспомогательная функция для выполнения API-запросов с заголовками
async function fetchWithHeaders(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const finalOptions = {
    headers: { ...defaultHeaders, ...options.headers },
    ...options,
  };

  const response = await fetch(url, finalOptions);
  return checkResponse(response);
}

// Функция для получения ингредиентов
export function getIngredients() {
  return fetchWithHeaders(`${URL}/ingredients`);
}

// Функция для отправки данных заказа
export const fetchOrderData = (ingredients) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ ingredients }),
  };

  return fetchWithHeaders(`${URL}/orders`, options);
};
