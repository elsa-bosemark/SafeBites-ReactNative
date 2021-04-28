import Category from "../models/category";

export const CATEGORIES = [
  new Category("takeout", "Takeout", require("../assets/icons/takeout.png")),
  new Category(
    "pickup",
    "Pickup",
    require("../assets/icons/curbsidePickup.png")
  ),
  new Category("delivery", "Delivery", require("../assets/icons/delivery.png")),
  new Category(
    "outdoor-sitting",
    "Outdoor Sitting",
    require("../assets/icons/outdoorDining.png")
  ),
];
