const productModel = require("../models/ProductModel");
const { requestToProductQuery } = require("../utils/requestUtils");
const { paginate } = require("../utils/pagination");

class ProductController {
  // [GET] /product
  async getAll(req, res) {
    try {
      const options = {
        limit: req.query.limit,
        page: req.query.page,
        query: requestToProductQuery(req),
        populateFields: ["categoryObject"],
      };

      let response = await paginate(productModel, options);
      response.data = response.data.map((item) => ({
        ...item,
        categoryName: item.categoryObject.name,
      }));
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }

  // [POST] /product/add
  async add(req, res) {
    const body = req.body;

    if (req.file) {
      body.thumbUrl = "images/" + req.file.filename;
    }

    try {
      let response = await productModel.create(req.body);
      res.json({
        data: response,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  }

  // [PUT] /product/update/:id
  async update(req, res) {
    const body = req.body;
    const productId = req.params.id;
    if (req.file) {
      body.thumbUrl = "images/" + req.file.filename;
    }

    try {
      let response = await productModel.updateOne({ _id: productId }, body);
      res.json({
        data: response,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  }

  // [DELETE] /product/delete/:id
  async delete(req, res) {
    const productId = req.params.id;

    try {
      let response = await productModel.deleteOne({ _id: productId });
      res.json({
        data: response,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  }
}

module.exports = new ProductController();
