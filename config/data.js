//STORING DATA HERE SO IT"S EASY TO ACCESS EVERYWHERE

var data;
var currentRestaurant;

//individual arrays so it easier to access
var names;
var price;
var phoneNumbers;
var cover;
var restaurantLoc;
var yelpUrl;
var transactions;
var restaurantCoords;
var rating;
var reviewCount;
var tags;
var photos;

var userLocation;

export function storeData(_data) {
  data = _data;
}
export async function getData() {
  return await data;
}

export function storeCurrentRestaurant(_currentRestaurant) {
  currentRestaurant = _currentRestaurant;
}

export function getCurrentRestaurant() {
  return currentRestaurant;
}

export function storeNames(_names) {
  names = _names;
}

export async function getNames() {
  return await names;
}

export function storePrice(_price) {
  price = _price;
}

export async function getPrice() {
  return await price;
}

export function storePhoneNumbers(_phoneNum) {
  phoneNumbers = _phoneNum;
}

export async function getPhoneNumbers() {
  return await phoneNumbers;
}

export function storeCover(_cover) {
  cover = _cover;
}

export async function getCover() {
  return await cover;
}

export function storeRestaurantLoc(_loc) {
  restaurantLoc = _loc;
}

export async function getRestaurantLoc() {
  return await restaurantLoc;
}

export function storeYelpUrl(_url) {
  yelpUrl = _url;
}

export async function getYelpUrl() {
  return await yelpUrl;
}

export function storeTransactions(_transactions) {
  transactions = _transactions;
}

export async function getTransactions() {
  return await transactions;
}

export function storeRestaurantCoords(_coords) {
  restaurantCoords = _coords;
}

export async function getRestaurantCoords() {
  return await restaurantCoords;
}

export function storeRating(_rating) {
  rating = _rating;
}

export async function getRating() {
  return await rating;
}

export function storeReviewCount(_count) {
  reviewCount = _count;
}

export async function getReviewCount() {
  return await reviewCount;
}

export function storeTags(_tags) {
  tags = _tags;
}

export async function getTags() {
  return await tags;
}

export function storePhotos(_photos) {
  photos = _photos;
}

export async function getPhotos() {
  return await photos;
}

export function storeUserLocation(_userLocation) {
  userLocation = _userLocation;
}

export async function getUserLocation() {
  return await userLocation;
}
