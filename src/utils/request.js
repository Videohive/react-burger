const request = (url, options) => {
	return fetch(url, options).then(res => {

		if(res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка ${res.status}`);
	})
}

export default request
