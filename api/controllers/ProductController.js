const productModel = require("../models/ProductModel");
const { requestToQuey } = require("../utils/requestUtils");

class ProductController {
  // [GET] /product
  async getAll(req, res) {
    const query = requestToQuey(req);

    const products = await productModel.find(query);
    return res.status(200).json({
      data: products,
    });
  }

  // [POST] /product/add
  async add(req, res) {
    const body = req.body;

    if (req.file) {
      body.thumbUrl = "images/" + req.file.filename;
    }

    try {
      let response = await productModel.create(req.body);
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
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
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  }

  // [DELETE] /product/delete/:id
  async delete(req, res) {
    const productId = req.params.id;

    try {
      let response = await productModel.deleteOne({ _id: productId });
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  }
}

module.exports = new ProductController();
