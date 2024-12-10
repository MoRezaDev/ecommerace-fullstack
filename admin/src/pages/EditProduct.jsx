import React, { useState } from "react";
import SearchEditProduct from "../components/EditProduct/SearchEditProduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function EditProduct() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Set the selected product to state
  };

  const handleSubmit = () => {
    // Handle the save or update operation
    console.log("Submitting changes for:", selectedProduct);
  };

  console.log(selectedProduct);

  return (
    <main className="w-full dark-mode transition duration-200 min-h-[calc(100dvh-80px)]">
      <QueryClientProvider client={queryClient}>
        <div className="w-full p-4">
          <SearchEditProduct onProductSelect={handleProductSelect} />
        </div>

        {/* Edit Product Box */}
        {selectedProduct && (
          <div className="dark-mode  transition duration-200 max-w-[900px] mx-auto shadow-md p-2">
            {/** For name */}
            <div className="flex flex-col mb-2">
              <label>نام</label>
              <input
                className="p-1 border rounded-md"
                type="text"
                defaultValue={selectedProduct.name}
              />
            </div>

            {/** For Slug */}
            <div className="flex flex-col mb-2">
              <label>اسلاگ</label>
              <input
                disabled={true}
                className="p-1 border rounded-md"
                type="text"
                defaultValue={selectedProduct.slug}
              />
            </div>

            {/** For title */}
            <div className="flex flex-col mb-2">
              <label>عنوان</label>
              <input
                className="p-1 border rounded-md"
                type="text"
                defaultValue={selectedProduct.title}
              />
            </div>

            {/** For description */}
            <div className="flex flex-col mb-2">
              <label>توضیحات</label>
              <textarea
                className="p-1 border rounded-md"
                type="text"
                defaultValue={selectedProduct.description}
              />
            </div>

            {/** For Quantity */}
            <div className="flex flex-col mb-2">
              <label>تعداد</label>
              <input
                className="p-1 border rounded-md"
                type="text"
                defaultValue={selectedProduct.quantity}
              />
            </div>

            {/** For Specification */}
            <div className="flex flex-col mb-2">
              <div>
              <label>توضیحات</label>
              <button>اضافه</button>
              </div>
              {selectedProduct.specification.length > 0 &&
                selectedProduct.specification.map((spec, idx) => (
                  <div className="mb-1 flex gap-1" key={idx}>
                    <div className="dark-mode bg-gray-200 rounded-md">
                      <input
                        className="p-1"
                        type="text"
                        disabled
                        defaultValue={spec.name}
                      />
                      <input
                        className="p-1"
                        type="text"
                        disabled
                        defaultValue={spec.value}
                      />
                    </div>
                    <button className="bg-red-500 text-white rounded-md p-1 hover:text-gray-200 transition">
                      حذف
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </QueryClientProvider>
    </main>
  );
}

export default EditProduct;
