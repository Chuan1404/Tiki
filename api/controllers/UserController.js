const userModel = require("../models/UserModel");
const { paginate } = require("../utils/pagination");

class UserController {
  // [GET] /user
  async getAll(req, res) {
    const query = {};
    const options = {
      limit: req.query.limit,
      page: req.query.page,
    };
    const response = await paginate(userModel, query, options);

    res.status(200).json(response);
  }

  // [GET] /user/get-info
  async getInfo(req, res) {
    const id = req.userId;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      res.status(400).json({
        error: "User doesn't exist",
      });
    } else {
      res.status(200).json({
        data: user,
      });
    }
  }

  // [PUT] /user/update/:id
  async update(req, res) {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    try {
      let response = await userModel.updateOne(
        { _id: userId },
        { name, email, role }
      );
      res.json({
        data: response,
      });
    } catch (err) {
      res.json({
        error: err,
      });
    }
  }

  // [DELETE] /user/delete/:id
  async delete(req, res) {
    const userId = req.params.id;

    try {
      let response = await userModel.deleteOne({ _id: userId });
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

module.exports = new UserController();
