function requestToQuey(request) {
    const query = {}

    if (request.query.slug) query.slug = request.query.slug;
    if (request.query.categoryId) query.categoryId = Number(request.query.categoryId);
    if (request.query.minPrice) query.price = { $gt: Number(request.query.minPrice) };
    if (request.query.maxPrice) query.price = { ...query.price, $lt: Number(request.query.maxPrice) };
    if (request.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };
      }
    return query
}

module.exports = {
    requestToQuey
}