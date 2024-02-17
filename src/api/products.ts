const baseURL = "https://api.escuelajs.co/api/v1/products";

export const getProducts = async () => {
  const response = await fetch(baseURL);
  if (![200, 201].includes(response.status)) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const getProduct = async (productId: string) => {
  const response = await fetch(`${baseURL}/${productId}`);

  if (![200, 201].includes(response.status)) {
    throw new Error(await response.json());
  }
  return response.json();
};

export const deleteProduct = async (productId: string) => {
  const response = await fetch(`${baseURL}/${productId}`, {
    method: "DELETE",
  });
  if (![200, 201].includes(response.status)) {
    throw new Error(await response.json());
  }
  return response.json();
};

export interface ProductUpdatePayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
}

export const updateProduct = async (
  productId: number,
  payload: ProductUpdatePayload
) => {
  const response = await fetch(`${baseURL}/${productId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (![200, 201].includes(response.status)) {
    throw new Error(await response.json());
  }
  return response.json();
};
export interface ProductCreatePayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[]
}

export const createProduct = async (
  payload: ProductUpdatePayload
) => {
  const response = await fetch(`${baseURL}/`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (![200, 201].includes(response.status)) {
    throw new Error(await response.json());
  }
  return response.json();
};
