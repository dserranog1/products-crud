export interface Product {
    category: Category,
    id: number,
    images: string[],
    price: number,
    title: string

}

export interface Category {
    id: number,
    name: string,
    image: string,
}