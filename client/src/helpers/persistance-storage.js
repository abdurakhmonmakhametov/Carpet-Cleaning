export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, data);
    } catch (err) {
        console.log(err + 'Error in setting item');
    }
}
export const getItem = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (err) {
        console.log(err + 'Error in getting item');
    }
}
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.log(err + 'Error in removing item');
    }
}