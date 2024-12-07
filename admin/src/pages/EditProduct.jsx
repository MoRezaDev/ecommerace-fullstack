import React from "react";
import SearchEditProduct from "../components/EditProduct/SearchEditProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function EditProduct() {
  return (
    <main className="w-full dark-mode transition duration-200 min-h-[calc(100dvh-80px)]">
      <QueryClientProvider client={queryClient}>
        <div className="w-full p-4">
          <SearchEditProduct />
        </div>
      </QueryClientProvider>
    </main>
  );
}

export default EditProduct;
