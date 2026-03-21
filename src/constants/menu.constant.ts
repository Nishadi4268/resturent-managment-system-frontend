import Caesar from "/menu/Caesar.webp";
import Coffee from "/menu/Coffee.jpg";
import GrilledSalmon from "/menu/GrilledSalmon.jpg";
import Margherita from "/menu/Margherita.webp";
import CakeSlice from "/menu/CakeSlice.webp";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: "veg" | "non-veg" | "sweets" | "drinks";
  rating: number;
  popular: boolean;
  image: string;
};

export type MenuCategory = {
  label: string;
  value: string;
};

export const MENU_CATEGORIES: MenuCategory[] = [
  { label: "All", value: "all" },
  { label: "Starters", value: "Starters" },
  { label: "Main Course", value: "Main Course" },
  { label: "Drinks", value: "Drinks" },
  { label: "Desserts", value: "Desserts" }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Salmon",
    description: "Fresh salmon with herbs and lemon",
    price: 24.99,
    category: "Main Course",
    type: "non-veg",
    rating: 4.8,
    popular: true,
    image: GrilledSalmon
  },
  {
    id: "2",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan",
    price: 12.99,
    category: "Starters",
    type: "veg",
    rating: 4.5,
    popular: true,
    image: Caesar
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato and mozzarella",
    price: 18.99,
    category: "Main Course",
    type: "veg",
    rating: 4.7,
    popular: true,
    image: Margherita
  },
  {
    id: "4",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache",
    price: 8.99,
    category: "Desserts",
    type: "sweets",
    rating: 4.9,
    popular: false,
    image: CakeSlice
  },
  {
    id: "5",
    name: "Iced Coffee",
    description: "Cold brewed coffee with ice",
    price: 5.99,
    category: "Drinks",
    type: "drinks",
    rating: 4.3,
    popular: false,
    image: Coffee
  }
];
