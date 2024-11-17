function recursiveChildrens(cateogires) {
  let result = [];
  for (const category of cateogires) {
    result.push(category);
    if (category.children && category.children.length > 0) {
      result = result.concat(recursiveChildrens(category.children));
    }
  }
  return result;
}

export const getUniqueCategoriesForSelect = (cateogires) => {
  const options = recursiveChildrens(cateogires).map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return options;
};
