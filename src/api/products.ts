const baseURL = 'https://api.escuelajs.co/api/v1/products'

export const getProducts = async () => {
    const response = await fetch(baseURL)
    return response.json()
}

export const getProduct = async (productId: string) => {
    const response = await fetch(`${baseURL}/${productId}`)
    return response.json()
}

export const deleteProduct = async (productId: string) => {
    const response = await fetch(`${baseURL}/${productId}`, {
        method: 'DELETE'
    })
    return response.json()
}