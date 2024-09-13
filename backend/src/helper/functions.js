function paginatedData(data, page = 1, limit = 10) {
  // Calculate the start and end index for the pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Get the paginated data
  const paginatedData = data.slice(startIndex, endIndex);

  // Return the paginated data along with meta information
  return {
    page,
    limit,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    data: paginatedData,
  };
}

// Recusive deep search to get specific category with its childrens
function findCategoryBySlug(categories, mySlug) {
  for (const category of categories) {
    // Check if the current category slug matches the given mySlug
    if (category.slug.toLowerCase() === mySlug.toLowerCase()) {
      return category;
    }

    // If the category has children, recursively search in them
    if (category.children && category.children.length > 0) {
      const result = findCategoryBySlug(category.children, mySlug);
      if (result) {
        return result;
      }
    }
  }
  return null; // Return null if no matching category is found
}

module.exports = { paginatedData, findCategoryBySlug };
