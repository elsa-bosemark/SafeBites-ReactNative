import Category from '../models/category';

export const CATEGORIES = [
  new Category('restaurant_reservation', 'Reserve', require('../assets/categoryIcons/dine-inIcon.png')),
  new Category('pickup', 'Pickup', require('../assets/categoryIcons/curbsidePickupIcon.png')),
  new Category('delivery', 'Delivery', require('../assets/categoryIcons/deliveryIcon.png')),
  new Category('outdoor-sitting', 'Ourdoor Sitting', require('../assets/categoryIcons/deliveryIcon.png')),
];