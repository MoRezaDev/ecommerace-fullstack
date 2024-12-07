export async function getProductsByQuerySearch(query) {
  const queryBody = {
    query,
  };
  const response = await fetch(
    "http://localhost:5025/product/get-products-by-search",
    {
      method: "POST",
      body: JSON.stringify(queryBody),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return false;
  }

  const products = await response.json();
  return products;
}
