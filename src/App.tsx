import ErrorPage from "./common/ErrorPage";
import ProductEditDelete from "./products/ProductEditDelete";
import ProductList from "./products/ProductList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductNew from "./products/components/ProductNew";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/products",
      element: <ProductList />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/products/new",
      element: <ProductNew />,
      errorElement: <ErrorPage />,
    },
    {
      path: "products/:productId",
      element: <ProductEditDelete />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold font-dosis bg-blue-100 p-4 border-4 border-blue-400">Simple product CRUD app</h1>
      <p className="italic mb-4">Note: Updating category or images does not work correctly so I omitted them from the update</p>
      <p className="italic mb-4">Note 2: The API is public so there might be a lot people using it and there might exist a race condition</p>
      <p className="italic mb-4">Note 3: Scroll down to see new products</p>
      <p className="italic mb-4">Note 4: The API is not parsing the image urls correctly so they won't render</p>
      <div className="w-3/4 mx-auto font-dosis">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
