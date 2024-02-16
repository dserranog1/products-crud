export interface Product {
    category: Category,
    id: number,
    images: string[],
    price: number,
    title: string
    description: string
}

export interface Category {
    id: number,
    name: string,
    image: string,
}

export enum Categories  {
    clothes = "clothes",
    electronics = "electronics",
    furniture = "furniture",
    shoes = "shoes",
    miscellaneous = "miscellaneous"
}