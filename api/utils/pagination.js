async function paginate(model, query = {}, options = { limit: 10, page: 1 }) {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;

  const data = await model
    .find(query)
    .limit(limit)
    .skip(limit * (page - 1));
  const total = await model.countDocuments(query);
  return {
    total,
    limit,
    page,
    data,
  };
}

module.exports = {
  paginate,
};
