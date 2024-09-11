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



module.exports = { paginatedData };
