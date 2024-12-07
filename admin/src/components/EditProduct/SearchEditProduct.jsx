import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useQuery } from "@tanstack/react-query";
import { getProductsByQuerySearch } from "../../lib/api";

export default function SearchEditProduct() {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebouncedValue(search);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products", debouncedValue],
    queryFn: () => getProductsByQuerySearch(debouncedValue),
    enabled: !!debouncedValue,
  });

  return (
    <div className="relative max-w-[800px] mx-auto">
      {/* Search Input */}
      <div className="flex items-center gap-2 border rounded-md p-2">
        <CiSearch size={20} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="کالای مورد نظر خود را وارد کنید"
          className="outline-none bg-transparent w-full"
          type="text"
        />
      </div>

      {/* Dropdown Window */}
      {search && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
          {isLoading && <p className="p-2 text-gray-500">Loading...</p>}
          {isError && <p className="p-2 text-red-500">Error fetching products</p>}
          {products?.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li
                  key={product._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && (
              <p className="p-2 text-gray-500">No products found</p>
            )
          )}
        </div>
      )}
    </div>
  );
}
