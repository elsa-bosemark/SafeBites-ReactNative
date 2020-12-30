import Category from '../models/category';

export const CATEGORIES = [
  // new Category('c1', 'Dine-in', require('../assets/svg/dine-inIcon.svg')),
  // new Category('c2', 'Curbside Pickup', require('../assets/svg/curbsidePickupIcon.svg')),
  // new Category('c3', 'Outdoor Seating', require('../assets/svg/deliveryIcon.svg')),
  // new Category('c4', 'Delivery', require('../assets/svg/deliveryIcon.svg')),
  new Category('restaurant_reservation', 'Reserve', require('../assets/categoryIcons/dine-inIcon.png')),
  new Category('pickup', 'Pickup', require('../assets/categoryIcons/curbsidePickupIcon.png')),
  new Category('delivery', 'Delivery', require('../assets/categoryIcons/deliveryIcon.png')),
  //new Category('c4', 'Delivery', require('../assets/categoryIcons/deliveryIcon.png')),
];