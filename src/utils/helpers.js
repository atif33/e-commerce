export const fetchFromLocalStorage = (item) => {
    const data = localStorage.getItem(item);
    return (data) ? JSON.parse(data) : [];
}

export const storeOnLocalStorage = (item, data) => {
    localStorage.setItem(item, JSON.stringify(data));
}