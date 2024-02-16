import { Categories } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const categoryMap: { [key: string]: Categories } = {
  "1": Categories.clothes,
  "2": Categories.electronics,
  "3": Categories.furniture,
  "4": Categories.shoes,
  "5": Categories.miscellaneous,
};
const categoryInverseMap: { [key in Categories]: number } = {
  [Categories.clothes]: 1,
  [Categories.electronics]: 2,
  [Categories.furniture]: 3,
  [Categories.shoes]: 4,
  [Categories.miscellaneous]: 5,
};

export const categoryIdToEnum = (id: number): Categories => {
  const category = categoryMap[String(id)];
  // if category doesnt exist just return clothes for now
  return category ? category : Categories.clothes;
};

export const enumToId = (category: Categories): number => {
  const id = categoryInverseMap[category]
  return id ? id : 1
};