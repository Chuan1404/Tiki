function requestToProductQuery(request) {
  const { slug, categoryId, minPrice, maxPrice, name, limit, page } =
    request.query;
  const query = {};

  
  if (slug) query.slug = slug;
  if (categoryId) query.categoryId = Number(categoryId);
  if (minPrice) query.price = { $gt: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lt: Number(maxPrice) };
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  return query;
}

module.exports = {
  requestToProductQuery,
};
