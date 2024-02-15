import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./products/Products";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold underline bg-red-200">Hello world!</h1>
      <div className="w-3/4 mx-auto font-dosis">
        <Products />
      </div>
    </QueryClientProvider>
  );
}
