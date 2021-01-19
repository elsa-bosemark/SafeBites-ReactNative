//STORING DATA HERE SO IT"S EASY TO ACCESS EVERYWHERE

var data;
var currentRestaurant;

export function storeData(data) {
    data = data
}

export function getData() {
    return data;
}

export function storeCurrentRestaurant(_currentRestaurant) {
    currentRestaurant = _currentRestaurant
}

export function getCurrentRestaurant() {
    return currentRestaurant;
}