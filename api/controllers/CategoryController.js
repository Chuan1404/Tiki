const categoryModel = require("../models/CategoryModel");

class CategoryController {
  // [GET] /category
  async getAll(req, res) {
    let categories = await categoryModel.find({});

    return res.status(200).json({
      data: categories,
    });
  }

  // [POST] /category/add
  async add(req, res) {
    try {
      let response = await categoryModel.create(req.body);
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  }

  // [PUT] /category/update/:id
  async update(req, res) {
    const body = req.body;
    const categoryId = req.params.id;
    try {
      let response = await categoryModel.updateOne({ _id: categoryId }, body);
      return res.json({
        data: response,
      });
    } catch (err) {
      return res.json({
        error: err,
      });
    }
  }

  // [DELETE] /category/delete/:id
  async delete(req, res) {
    const categoryId = req.params.id;

    try {
      let response = await categoryModel.deleteOne({ _id: categoryId });
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

module.exports = new CategoryController();
