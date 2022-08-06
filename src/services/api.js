export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((awnser) => awnser.json())
    .then((data) => data)
    .catch((error) => error);
  return categories;
}
export async function getDetailsById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId) {
  const cat = await fetch(` https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=${categoryId}`)
    .then((awnser) => awnser.json())
    .then((data) => data)
    .catch((error) => error);
  return cat;
}
