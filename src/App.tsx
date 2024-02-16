import ErrorPage from "./common/ErrorPage";
import ProductEditDelete from "./products/ProductEditDelete";
import ProductList from "./products/ProductList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />,
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
      <h1 className="text-3xl font-bold underline bg-red-200">Hello world!</h1>
      <div className="w-3/4 mx-auto font-dosis">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
