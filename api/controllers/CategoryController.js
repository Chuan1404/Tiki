const categoryModel = require("../models/CategoryModel");
const { paginate } = require("../utils/pagination");

class CategoryController {
  // [GET] /category
  async getAll(req, res) {
    try {
      const query = {}
      const options = {
        limit: req.query.limit,
        page: req.query.page,
      }

      const response = await paginate(categoryModel, query, options);
      
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }

  // [POST] /category/add
  async add(req, res) {
    try {
      let response = await categoryModel.create(req.body);
      res.json({
        data: response,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }

  // [PUT] /category/update/:id
  async update(req, res) {
    const body = req.body;
    const categoryId = req.params.id;
    try {
      let response = await categoryModel.updateOne({ _id: categoryId }, body);
      res.json({
        data: response,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }

  // [DELETE] /category/delete/:id
  async delete(req, res) {
    const categoryId = req.params.id;

    try {
      let response = await categoryModel.deleteOne({ _id: categoryId });
      res.json({
        data: response,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
}

module.exports = new CategoryController();
