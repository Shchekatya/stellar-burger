export const checkResponse=(res) => {
    if (res.ok) {
        console.log('все ок')
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
}