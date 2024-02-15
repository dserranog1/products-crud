export const getProducts = async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/')
    return response.json()
}