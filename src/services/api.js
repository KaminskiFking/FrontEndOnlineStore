export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((awnser) => awnser.json())
    .then((data) => data)
    .catch((error) => error);
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId) {
  const cat = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=${categoryId}`)
    .then((awnser) => awnser.json())
    .then((data) => data)
    .catch((error) => error);
  return cat;
}
