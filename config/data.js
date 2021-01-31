//STORING DATA HERE SO IT"S EASY TO ACCESS EVERYWHERE

var data;
var currentRestaurant;

export function storeData(_data) {
    data = _data
}
export async function getData() {
    return await data;
}

export function storeCurrentRestaurant(_currentRestaurant) {
    currentRestaurant = _currentRestaurant
}

export function getCurrentRestaurant() {
    return currentRestaurant;
}
