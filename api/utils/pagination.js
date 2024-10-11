async function paginate(model, options = { limit: 10, page: 1 }) {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  let query = {}
  let populates = []

  if(options.query) {
    query = options.query
  }

  const modelQuery = model.find(query).lean();

  if(options.populateFields?.length > 0) {
    populates = options.populateFields.map(field => ({path: field}))
    modelQuery.populate(populates)
  }

  const data = await modelQuery.limit(limit).skip(limit * (page - 1));
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
